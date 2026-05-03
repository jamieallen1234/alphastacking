import { NextResponse } from 'next/server'
import { allowFeedbackRequest } from '@/lib/feedbackRateLimit'

export const runtime = 'nodejs'

const MAX_MESSAGE = 8000
const MAX_NAME = 200

function clientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

async function verifyTurnstile(token: string, remoteip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return false
  const body = new URLSearchParams({ secret, response: token, remoteip })
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) return false
  const data = (await res.json()) as { success?: boolean }
  return data.success === true
}

async function sendViaResend(params: {
  to: string
  from: string
  subject: string
  text: string
  replyTo?: string
}): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, error: 'missing_key' }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      subject: params.subject,
      text: params.text,
      ...(params.replyTo ? { reply_to: params.replyTo } : {}),
    }),
  })
  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    console.error('[feedback] Resend error', res.status, errText)
    return { ok: false, error: 'send_failed' }
  }
  return { ok: true }
}

function feedbackEmailConfigured(): boolean {
  const resendKey = process.env.RESEND_API_KEY
  const to = process.env.FEEDBACK_TO_EMAIL?.trim()
  const from = process.env.FEEDBACK_FROM_EMAIL?.trim()
  return Boolean(resendKey && to && from)
}

export async function POST(request: Request) {
  const ip = clientIp(request)
  if (!allowFeedbackRequest(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 })
  }

  const o = body as Record<string, unknown>

  // Honeypot: bots often fill hidden fields
  const hp = o.hp
  if (typeof hp === 'string' && hp.trim() !== '') {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  const token =
    typeof o.turnstileToken === 'string' && o.turnstileToken.trim() ? o.turnstileToken.trim() : ''
  if (turnstileSecret) {
    if (!token) {
      return NextResponse.json({ ok: false, error: 'captcha_required' }, { status: 400 })
    }
    const valid = await verifyTurnstile(token, ip)
    if (!valid) {
      return NextResponse.json({ ok: false, error: 'captcha_failed' }, { status: 400 })
    }
  }

  const message = typeof o.message === 'string' ? o.message.trim() : ''
  if (!message || message.length > MAX_MESSAGE) {
    return NextResponse.json({ ok: false, error: 'invalid_message' }, { status: 400 })
  }

  const name = typeof o.name === 'string' ? o.name.trim().slice(0, MAX_NAME) : ''
  const email = typeof o.email === 'string' ? o.email.trim().slice(0, 320) : ''
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  const ua = request.headers.get('user-agent') ?? ''
  const lines = [
    `Message:`,
    message,
    '',
    `Name: ${name || '(not provided)'}`,
    `Reply email: ${email || '(not provided)'}`,
    `IP: ${ip}`,
    `User-Agent: ${ua}`,
  ]
  const text = lines.join('\n')

  if (!feedbackEmailConfigured()) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[feedback] RESEND / FEEDBACK_* not set — logging only (no email sent):\n', text)
      return NextResponse.json({ ok: true })
    }
    console.error('[feedback] Missing RESEND_API_KEY, FEEDBACK_TO_EMAIL, or FEEDBACK_FROM_EMAIL')
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 })
  }

  const to = process.env.FEEDBACK_TO_EMAIL!.trim()
  const from = process.env.FEEDBACK_FROM_EMAIL!.trim()

  const send = await sendViaResend({
    to,
    from,
    subject: `[Alpha Stacking] Feedback${name ? ` — ${name}` : ''}`,
    text,
    replyTo: email || undefined,
  })

  if (!send.ok) {
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
