import * as Sentry from "@sentry/nextjs";

export default function handler(req, res) {
  try {
    // Intentional error for testing Sentry
    throw new Error("Sentry Debug Error - Test Error Tracking");
  } catch (error) {
    // Capture the error with Sentry
    Sentry.captureException(error, {
      tags: {
        section: 'debug',
        test: 'sentry-error-tracking'
      },
      extra: {
        timestamp: new Date().toISOString(),
        requestMethod: req.method,
        requestPath: req.url
      }
    });

    // Respond with error details
    res.status(500).json({
      message: 'Internal Server Error',
      errorId: res.sentry
    });
  }
}