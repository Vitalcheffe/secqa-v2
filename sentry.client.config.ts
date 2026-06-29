import * as Sentry from "@sentry/nextjs";

// Sentry client-side configuration
// Captures errors and performance traces in the browser

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0,
  profilesSampleRate: 0.1,
  environment: process.env.NODE_ENV || "development",
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "local",
  // Auto-register default integrations for browser (browserTracingIntegration, replayIntegration)
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracePropagationTargets: [
    "localhost",
    /^\//,
    /^https:\/\/secqa\.vercel\.app/,
  ],
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "Network request failed",
  ],
  beforeSend(event) {
    if (process.env.NODE_ENV === "development" && !process.env.SENTRY_ENABLE_DEV) {
      return null;
    }
    return event;
  },
});
