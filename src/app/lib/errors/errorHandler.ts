import { NextResponse } from 'next/server';
import { AppError } from './AppError';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { logMetric } from '../monitoring';

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    logMetric('app_error', 1, { code: error.code });
    return NextResponse.json(error.toJSON(), { status: error.statusCode });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    logMetric('database_error', 1, { code: error.code });
    return handlePrismaError(error);
  }

  if (error instanceof ZodError) {
    logMetric('validation_error', 1);
    return NextResponse.json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.errors,
      }
    }, { status: 400 });
  }

  logMetric('unhandled_error', 1);
  console.error('Unhandled error:', error);
  
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json({
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        stack: error instanceof Error ? error.stack : undefined
      }
    }, { status: 500 });
  }

  return NextResponse.json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    }
  }, { status: 500 });
}

function handlePrismaError(error: Prisma.PrismaClientKnownRequestError) {
  switch (error.code) {
    case 'P2002':
      return NextResponse.json({
        error: {
          code: 'UNIQUE_CONSTRAINT',
          message: 'A record with this value already exists',
          field: error.meta?.target as string[]
        }
      }, { status: 409 });

    case 'P2025':
      return NextResponse.json({
        error: {
          code: 'NOT_FOUND',
          message: 'Record not found'
        }
      }, { status: 404 });

    case 'P2003':
      return NextResponse.json({
        error: {
          code: 'FOREIGN_KEY_CONSTRAINT',
          message: 'Referenced record does not exist'
        }
      }, { status: 400 });

    default:
      return NextResponse.json({
        error: {
          code: 'DATABASE_ERROR',
          message: 'Database operation failed'
        }
      }, { status: 500 });
  }
}