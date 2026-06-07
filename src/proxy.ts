import { NextRequest, NextResponse } from 'next/server'

const REGION_COOKIE = 'region'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Already on CA edition — nothing to do
  if (pathname.startsWith('/ca')) return NextResponse.next()

  // Already seen a redirect this session — respect their current location
  if (request.cookies.get(REGION_COOKIE)) return NextResponse.next()

  const country = request.headers.get('x-vercel-ip-country')
  if (country !== 'CA') return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/ca${pathname === '/' ? '' : pathname}`

  const response = NextResponse.redirect(url)
  // Session cookie — clears when browser closes, so returning Canadians always land on CA
  response.cookies.set(REGION_COOKIE, 'ca', { path: '/', sameSite: 'lax' })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|opengraph-image|favicon.ico|.*\\..*).*)'],
}
