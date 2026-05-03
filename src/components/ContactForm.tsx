'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import styles from './ContactForm.module.css'

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

type TurnstileApi = {
  render: (container: HTMLElement, params: Record<string, unknown>) => string
  remove: (widgetId: string) => void
}

function getTurnstile(): TurnstileApi | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as unknown as { turnstile?: TurnstileApi }).turnstile
}

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [hp, setHp] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorDetail, setErrorDetail] = useState<string | null>(null)
  const [turnstileMountKey, setTurnstileMountKey] = useState(0)
  const widgetRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const needsTurnstile = Boolean(turnstileSiteKey)

  useEffect(() => {
    if (!needsTurnstile || !scriptLoaded || !widgetRef.current) return
    const api = getTurnstile()
    if (!api) return
    widgetIdRef.current = api.render(widgetRef.current, {
      sitekey: turnstileSiteKey,
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    })
    return () => {
      const id = widgetIdRef.current
      const t = getTurnstile()
      if (id && t) {
        try {
          t.remove(id)
        } catch {
          /* ignore */
        }
      }
      widgetIdRef.current = null
    }
  }, [needsTurnstile, scriptLoaded, turnstileMountKey])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    if (needsTurnstile && !turnstileToken.trim()) {
      setErrorDetail('Complete the verification challenge and try again.')
      setStatus('error')
      return
    }
    setStatus('sending')
    setErrorDetail(null)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          hp,
          ...(needsTurnstile ? { turnstileToken } : {}),
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (res.status === 429) {
        setErrorDetail('Too many submissions. Please try again later.')
        setStatus('error')
        return
      }
      if (res.status === 503) {
        setErrorDetail('This form is temporarily unavailable. Please try again later.')
        setStatus('error')
        return
      }
      if (!res.ok || !data.ok) {
        if (data.error === 'captcha_failed' || data.error === 'captcha_required') {
          setErrorDetail('Verification failed. Refresh the page and try again.')
        } else if (data.error === 'invalid_message') {
          setErrorDetail('Add a message (shorter than the limit) and try again.')
        } else if (data.error === 'invalid_email') {
          setErrorDetail('Check the email address and try again.')
        } else {
          setErrorDetail('Something went wrong. Please try again in a moment.')
        }
        setStatus('error')
        return
      }
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
      setHp('')
      setTurnstileToken('')
      const t = getTurnstile()
      const id = widgetIdRef.current
      if (needsTurnstile && t && id) {
        try {
          t.remove(id)
          widgetIdRef.current = null
        } catch {
          /* ignore */
        }
      }
    } catch {
      setErrorDetail('Network error. Check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <>
      {needsTurnstile ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
          onLoad={() => setScriptLoaded(true)}
        />
      ) : null}
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        {status === 'sent' ? (
          <>
            <p className={styles.msgOk} role="status">
              Thanks — your message was sent. If you shared an email, we can reply there.
            </p>
            <button
              type="button"
              className={styles.sendAnother}
              onClick={() => {
                setStatus('idle')
                setTurnstileMountKey((k) => k + 1)
              }}
            >
              Send another message
            </button>
          </>
        ) : (
          <>
            <div className={styles.hpField} aria-hidden="true">
              <label htmlFor="contact-hp">Leave blank</label>
              <input
                id="contact-hp"
                name="hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
            </div>

            <div>
              <label className={styles.fieldLabel} htmlFor="contact-name">
                Name <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span>
              </label>
              <input
                id="contact-name"
                className={styles.input}
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={200}
              />
            </div>

            <div>
              <label className={styles.fieldLabel} htmlFor="contact-email">
                Email <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional, for a reply)</span>
              </label>
              <input
                id="contact-email"
                className={styles.input}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className={styles.fieldLabel} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className={styles.textarea}
                name="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={8000}
              />
              <p className={styles.hint}>Site feedback, feature requests, or corrections welcome.</p>
            </div>

            {needsTurnstile ? (
              <div key={turnstileMountKey} className={styles.turnstileWrap} ref={widgetRef} />
            ) : null}

            {status === 'error' && errorDetail ? (
              <p className={styles.msgErr} role="alert">
                {errorDetail}
              </p>
            ) : null}

            <button type="submit" className={styles.submit} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
          </>
        )}
      </form>
    </>
  )
}
