import { trace, context, SpanStatusCode } from '@opentelemetry/api';
import { metrics } from './metrics';
import { logger } from '../logging/logger';

const tracer = trace.getTracer('buckalew-financial');

export interface TracingOptions {
  name: string;
  attributes?: Record<string, string | number | boolean>;
}

export function withTracing<T>(options: TracingOptions, fn: () => Promise<T>): Promise<T> {
  return tracer.startActiveSpan(options.name, async (span) => {
    const startTime = Date.now();

    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        span.setAttribute(key, value);
      });
    }

    try {
      const result = await fn();
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    } finally {
      const duration = Date.now() - startTime;
      metrics.timing(options.name, duration, options.attributes);
      span.end();
    }
  });
}

export function createSpan(name: string, fn: () => void) {
  const span = tracer.startSpan(name);
  context.with(trace.setSpan(context.active(), span), fn);
  span.end();
}

export function logSpanError(error: Error, attributes?: Record<string, string>) {
  const span = trace.getSpan(context.active());
  if (span) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message
    });
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        span.setAttribute(key, value);
      });
    }
  }
  logger.error({ error, attributes }, error.message);
}