import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = new URL(request.url)
  if (!url.searchParams.has('asset')) {
    url.searchParams.set('asset', 'sETH')
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: '/',
}
