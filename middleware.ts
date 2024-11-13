import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './utils/auth';

const protectedRoute = ['/dashboard', '/profile', '/thanks'];
const publicRoute = ['/login', '/register', '/', '/specializations', '/events'];

export default async function middleware(request: NextRequest) {
  const isProtectedRoute = protectedRoute.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const { payload } = await decrypt(accessToken);

      if (
        request.nextUrl.pathname.startsWith('/profile') &&
        payload.role !== 'client'
      ) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Redirect to dashboard page if the user is translator
      if (
        request.nextUrl.pathname === '/dashboard' &&
        payload.role === 'translator'
      ) {
        return NextResponse.redirect(
          new URL('/dashboard/translator', request.url)
        );
      }

      // Redirect translator if try access admin dashboard
      if (
        !request.nextUrl.pathname.startsWith('/dashboard/translator') &&
        payload.role === 'translator'
      ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Redirect to dashboard page if the user is admin
      if (
        request.nextUrl.pathname.startsWith('/dashboard/translator') &&
        payload.role === 'admin'
      ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Redirect to home page if the user is client
      if (
        request.nextUrl.pathname.startsWith('/dashboard') &&
        payload.role === 'client'
      ) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // Redirect to the login page & clear the cookie if the token is invalid
      const response = NextResponse.redirect(new URL('/login', request.url));

      response.cookies.set('accessToken', '', { expires: new Date(0) });
      return response;
    }
  }

  // Redirect if the user is already logged in
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
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (request.nextUrl.pathname === '/dashboard/account') {
    return NextResponse.redirect(
      new URL('/dashboard/account/client', request.url)
    );
  }

  if (request.nextUrl.pathname === '/dashboard/expertise') {
    return NextResponse.redirect(
      new URL('/dashboard/expertise/language', request.url)
    );
  }

  if (request.nextUrl.pathname === '/dashboard/transaction') {
    return NextResponse.redirect(
      new URL('/dashboard/transaction/service-request', request.url)
    );
  }

  if (request.nextUrl.pathname === '/dashboard/promotion') {
    return NextResponse.redirect(
      new URL('/dashboard/promotion/event', request.url)
    );
  }

  if (request.nextUrl.pathname === '/dashboard/quality') {
    return NextResponse.redirect(
      new URL('/dashboard/quality/service', request.url)
    );
  }
}
