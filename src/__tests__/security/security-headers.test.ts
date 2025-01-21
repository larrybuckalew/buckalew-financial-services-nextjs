import { createMocks } from 'node-mocks-http';
import { withSecurityHeaders } from '@/middleware/security/security-headers';

describe('Security Headers Middleware', () => {
  it('should set all required security headers', async () => {
    const mockHandler = jest.fn(async (req, res) => {
      res.status(200).json({ message: 'Success' });
    });

    const { req, res } = createMocks({
      method: 'GET',
    });

    const handler = withSecurityHeaders(mockHandler);
    await handler(req, res);

    // Check all security headers
    expect(res.getHeader('X-DNS-Prefetch-Control')).toBe('off');
    expect(res.getHeader('X-Frame-Options')).toBe('DENY');
    expect(res.getHeader('X-Content-Type-Options')).toBe('nosniff');
    expect(res.getHeader('X-XSS-Protection')).toBe('1; mode=block');
    expect(res.getHeader('Strict-Transport-Security')).toBe(
      'max-age=31536000; includeSubDomains'
    );
    expect(res.getHeader('Content-Security-Policy')).toBeDefined();
    expect(res.getHeader('Permissions-Policy')).toBeDefined();
    expect(res.getHeader('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(res.getHeader('Cross-Origin-Embedder-Policy')).toBe('require-corp');
    expect(res.getHeader('Cross-Origin-Opener-Policy')).toBe('same-origin');
    expect(res.getHeader('Cross-Origin-Resource-Policy')).toBe('same-origin');
  });

  it('should handle errors gracefully', async () => {
    const mockHandler = jest.fn(async () => {
      throw new Error('Test error');
    });

    const { req, res } = createMocks({
      method: 'GET',
    });

    const handler = withSecurityHeaders(mockHandler);
    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Internal server error',
    });
  });

  it('should not interfere with successful responses', async () => {
    const mockHandler = jest.fn(async (req, res) => {
      res.status(200).json({ data: 'test' });
    });

    const { req, res } = createMocks({
      method: 'GET',
    });

    const handler = withSecurityHeaders(mockHandler);
    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ data: 'test' });
  });

  it('should properly combine multiple middleware', async () => {
    const middleware1 = jest.fn(async (req, res, next) => {
      res.setHeader('Test-Header-1', 'value1');
      await next();
    });

    const middleware2 = jest.fn(async (req, res, next) => {
      res.setHeader('Test-Header-2', 'value2');
      await next();
    });

    const { req, res } = createMocks({
      method: 'GET',
    });

    const handler = withSecurityHeaders((req, res) => {
      return Promise.resolve();
    });

    await handler(req, res);

    expect(res.getHeader('Test-Header-1')).toBe('value1');
    expect(res.getHeader('Test-Header-2')).toBe('value2');
    expect(res.getHeader('X-Frame-Options')).toBe('DENY');
  });
});
