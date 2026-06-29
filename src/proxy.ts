import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isPublicApiRoute = createRouteMatcher([
  '/api/stripe/webhook',
  '/api/test-error',
  '/api/health'
]);

// Plain middleware for when Clerk is not configured
async function plainMiddleware(req: NextRequest) {
  // Skip public API routes
  if (isPublicApiRoute(req)) {
    return NextResponse.next();
  }
  // Redirect /dashboard to sign-in when Clerk isn't configured
  if (isProtectedRoute(req)) {
    const signInUrl = new URL('/auth/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
}

// Conditionally use Clerk middleware only if configured
// This prevents "Missing publishableKey" crash when env vars aren't set
const isClerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.length > 10 &&
  process.env.CLERK_SECRET_KEY &&
  process.env.CLERK_SECRET_KEY.length > 10
);

const handler = isClerkConfigured
  ? clerkMiddleware(async (auth, req: NextRequest) => {
      if (isPublicApiRoute(req)) return;
      if (isProtectedRoute(req)) await auth.protect();
    })
  : plainMiddleware;

export default handler;

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
};
