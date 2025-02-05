import pino from 'pino';
import { logMetric } from '../monitoring';

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: { destination: './logs/app.log' }
    },
    {
      target: 'pino-pretty',
      options: { colorize: true }
    }
  ]
});

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['password', 'token', 'authorization'],
  transport,
  serializers: pino.stdSerializers,
  base: {
    env: process.env.NODE_ENV,
  }
});

export function logRequest(req: Request) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();

  logger.info({
    requestId,
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers),
  }, 'Incoming request');

  return {
    complete: (status: number) => {
      const duration = Date.now() - startTime;
      logger.info({
        requestId,
        status,
        duration,
      }, 'Request completed');

      logMetric('request_duration', duration, {
        method: req.method,
        path: new URL(req.url).pathname,
        status: status.toString()
      });
    }
  };
}