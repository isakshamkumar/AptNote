import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware((auth, req) => {
  if (
    auth().userId &&
    ['/', '/sign-in', '/sign-up'].includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/rooms', req.url));
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
