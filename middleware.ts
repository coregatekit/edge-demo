import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SECRET_URL, specialChars } from './app/constant';

export const runtime = 'experimental-edge';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const { ip, geo, nextUrl: url } = request;
  const country = geo?.country || 'Unknown';
  const city = geo?.city || 'Unknown';
  requestHeaders.set('x-country', country);

  if (url.pathname.startsWith('/qr')) {
    const x = specialChars.filter((char) => {
      if (ip?.includes(char.toString())) {
        return char;
      }
    });

    if (x.length > 0) {
      return NextResponse.redirect(SECRET_URL);
    }

    return NextResponse.rewrite(new URL('/unlucky', request.url));
  }

  if (country === 'TH' && city === 'Bangkok') {
    requestHeaders.set('x-special-msg', 'show');
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}