import * as Sentry from "@sentry/nextjs";

// Sentry edge runtime configuration
// Captures errors from middleware and edge functions
// @sentry/nextjs auto-registers Vercel edge integration in v8

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV || "development",
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "local",
  tracePropagationTargets: [
    "localhost",
    /^\//,
    /^https:\/\/secqa\.vercel\.app/,
  ],
  ignoreErrors: [
    "EDGE_FUNCTION_INVOCATION_TIMEOUT",
  ],
  beforeSend(event) {
    // Edge runtime: filter sensitive headers
    if (event.request?.headers) {
      const filtered = { ...event.request.headers };
      delete filtered["authorization"];
      delete filtered["cookie"];
      event.request.headers = filtered;
    }
    if (process.env.NODE_ENV === "development" && !process.env.SENTRY_ENABLE_DEV) {
      return null;
    }
    return event;
  },
});
