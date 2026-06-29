import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// Routes that should bypass Clerk entirely (public webhooks, health checks)
const isPublicApiRoute = createRouteMatcher([
  '/api/stripe/webhook',
  '/api/test-error',
  '/api/health'
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Skip auth for public API routes (Stripe webhooks need raw body access)
  if (isPublicApiRoute(req)) return;

  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
