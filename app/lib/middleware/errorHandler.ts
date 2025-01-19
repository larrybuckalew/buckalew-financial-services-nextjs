import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export async function errorHandler(error: Error, req: Request) {
  // Log error to Sentry
  Sentry.captureException(error, {
    extra: {
      url: req.url,
      method: req.method,
    },
  });

  // Handle known errors
  if (error.name === 'ValidationError') {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }

  if (error.name === 'AuthenticationError') {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  if (error.name === 'NotFoundError') {
    return NextResponse.json(
      { error: 'Resource not found' },
      { status: 404 }
    );
  }

  // Default error response
  console.error('Unhandled error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}