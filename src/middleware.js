import { NextResponse } from 'next/server';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'secret-token';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (pathname.startsWith('/admin')) {
    if (token !== ADMIN_TOKEN) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  if (pathname.startsWith('/api/pautas') && request.method !== 'GET') {
    if (token !== ADMIN_TOKEN) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/pautas/:path*'],
};
