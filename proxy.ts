import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Cek apakah user sedang mengakses rute admin
  if (path.startsWith('/admin')) {
    const session = await getSession();
    
    if (!session) {
      // Jika belum login, redirect ke halaman login
      return NextResponse.redirect(new URL('/!/login', req.nextUrl));
    }
  }

  // Cek apakah user mencoba mengakses login page saat sudah login
  if (path.startsWith('/!/login')) {
    const session = await getSession();
    if (session) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/!/login'],
};
