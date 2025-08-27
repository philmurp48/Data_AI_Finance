import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
    const isLoginPage = request.nextUrl.pathname === '/login';

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If authenticated and on login page, redirect to home
    if (isAuthenticated && isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public (public files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
}; 