import { NextRequest, NextResponse } from 'next/server';
import { SECRET_URL, specialChars } from './constant';

export const config = {
  runtime: 'experimental-edge',
};

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const { ip, geo, nextUrl: url } = request;
  const country = geo?.country || 'Unknown';
  const city = geo?.city || 'Unknown';
  requestHeaders.set('x-country', country);
  requestHeaders.set('x-ip', ip || '127.0.0.1');

  if (url.pathname.startsWith('/regional')) {
    const x = specialChars.filter((char) => {
      if (ip?.includes(char.toString())) {
        return char;
      }
    });

    if (x.length > 0) {
      return NextResponse.redirect(SECRET_URL);
    }
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
