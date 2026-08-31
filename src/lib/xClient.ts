import { createHmac, randomBytes } from 'crypto'

/** Minimal OAuth 1.0a user-context signing for POST /2/tweets — no SDK dependency, matching this repo's raw-fetch pattern for third-party APIs. */

type XCredentials = {
  apiKey: string
  apiKeySecret: string
  accessToken: string
  accessTokenSecret: string
}

export function getXCredentials(): XCredentials | null {
  const apiKey = process.env.X_API_KEY
  const apiKeySecret = process.env.X_API_KEY_SECRET
  const accessToken = process.env.X_ACCESS_TOKEN
  const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET
  if (!apiKey || !apiKeySecret || !accessToken || !accessTokenSecret) return null
  return { apiKey, apiKeySecret, accessToken, accessTokenSecret }
}

function percentEncode(value: string): string {
  return encodeURIComponent(value).replace(/[!*'()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
}

function buildOAuthHeader(url: string, method: string, creds: XCredentials): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: creds.apiKey,
    oauth_nonce: randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: creds.accessToken,
    oauth_version: '1.0',
  }

  const baseParams = { ...oauthParams }
  const paramString = Object.keys(baseParams)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(baseParams[key])}`)
    .join('&')

  const baseString = [method.toUpperCase(), percentEncode(url), percentEncode(paramString)].join('&')
  const signingKey = `${percentEncode(creds.apiKeySecret)}&${percentEncode(creds.accessTokenSecret)}`
  const signature = createHmac('sha1', signingKey).update(baseString).digest('base64')

  const headerParams: Record<string, string> = { ...oauthParams, oauth_signature: signature }
  const header = Object.keys(headerParams)
    .sort()
    .map((key) => `${percentEncode(key)}="${percentEncode(headerParams[key])}"`)
    .join(', ')

  return `OAuth ${header}`
}

export async function postTweet(text: string): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const creds = getXCredentials()
  if (!creds) return { ok: false, error: 'missing_credentials' }

  const url = 'https://api.twitter.com/2/tweets'
  const authHeader = buildOAuthHeader(url, 'POST', creds)

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    console.error('[xClient] postTweet failed', res.status, errText)
    return { ok: false, error: `http_${res.status}` }
  }

  const data = (await res.json()) as { data?: { id?: string } }
  const id = data.data?.id
  if (!id) return { ok: false, error: 'no_id_in_response' }
  return { ok: true, id }
}
