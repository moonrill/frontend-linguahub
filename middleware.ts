import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './utils/auth';

const protectedRoute = ['/dashboard', '/profile'];
const publicRoute = ['/login', '/register', '/', '/specializations', '/events'];

export default async function middleware(request: NextRequest) {
  const isProtectedRoute = protectedRoute.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isPublicRoute = publicRoute.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const data = await decrypt(accessToken);

      if (data.payload.role === 'translator') {
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL('/login', request.url));

      response.cookies.set('accessToken', '', { expires: new Date(0) });
      return response;
    }
  }

  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  ) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (accessToken) {
      try {
        const data = await decrypt(accessToken);

        if (data.payload.role === 'translator') {
          return NextResponse.redirect(
            new URL('/dashboard/translator', request.url)
          );
        }

        if (data.payload.role === 'admin') {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if (data.payload.role === 'client') {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch (error) {}
    }
  }
}
