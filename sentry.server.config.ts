import * as Sentry from "@sentry/nextjs";

// Sentry server-side configuration (Node.js runtime)
// Captures errors from API routes and server components
// @sentry/nextjs auto-registers Prisma, HTTP, and fetch integrations in v8

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.1,
  profilesSampleRate: 0.1,
  environment: process.env.NODE_ENV || "development",
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "local",
  tracePropagationTargets: [
    "localhost",
    /^\//,
    /^https:\/\/secqa\.vercel\.app/,
    /^https:\/\/api\.stripe\.com/,
    /^https:\/\/api\.anthropic\.com/,
  ],
  ignoreErrors: [
    "stripe-signature verification failed",
    "ANTHROPIC_API_KEY is not set",
  ],
  beforeSend(event) {
    // Filter PII from request bodies
    if (event.request) {
      delete event.request.data;
    }
    if (process.env.NODE_ENV === "development" && !process.env.SENTRY_ENABLE_DEV) {
      return null;
    }
    return event;
  },
});

// Capture unhandled rejections and uncaught exceptions
process.on("unhandledRejection", (err) => {
  Sentry.captureException(err);
});

process.on("uncaughtException", (err) => {
  Sentry.captureException(err);
});
