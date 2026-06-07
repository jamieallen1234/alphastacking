import type { NextConfig } from "next";

/**
 * Site-wide security headers.
 *
 * CSP note: most pages are statically prerendered, so per-request nonces are not
 * viable (a static HTML file can't carry a unique nonce per visitor). The app also
 * ships intentional inline scripts (the theme/no-FOUC bootstrap in `layout.tsx`) and
 * inline JSON-LD blocks, which require `'unsafe-inline'` for `script-src`. We keep the
 * structural directives strict instead — `object-src 'none'`, `base-uri 'self'`,
 * `form-action 'self'`, and `frame-ancestors 'none'` (clickjacking) all still apply
 * and are not weakened by `'unsafe-inline'`.
 *
 * `va.vercel-scripts.com` is allowed for Vercel Analytics; the insights beacon is
 * same-origin (`/_vercel/insights/*`) and covered by `connect-src 'self'`.
 */
// React's dev server needs `eval()` for fast refresh / debugging callstacks. It never
// uses eval in production, so `'unsafe-eval'` is scoped to development only — the
// production CSP stays strict.
const isDev = process.env.NODE_ENV !== "production"
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  "https://va.vercel-scripts.com",
].join(" ")

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://va.vercel-scripts.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ]
  },
  async redirects() {
    return [
      { source: "/ca-etfs", destination: "/ca/etfs", permanent: true },
      { source: "/strategies", destination: "/portfolios", permanent: true },
      { source: "/ca/strategies", destination: "/ca/portfolios", permanent: true },
      { source: "/comparison", destination: "/portfolios", permanent: true },
      { source: "/ca/comparison", destination: "/ca/portfolios", permanent: true },
    ]
  },
};

export default nextConfig;
