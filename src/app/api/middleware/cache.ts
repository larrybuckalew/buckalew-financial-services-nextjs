import { NextResponse } from 'next/server';
import { cache } from '@/lib/cache/redis';

interface CacheConfig {
  ttl?: number;
  tags?: string[];
  varyByQuery?: string[];
  varyByUser?: boolean;
}

export function withCache(config: CacheConfig = {}) {
  return async (req: Request) => {
    const url = new URL(req.url);
    let cacheKey = `api:${url.pathname}`;

    if (config.varyByQuery) {
      const params = new URLSearchParams();
      config.varyByQuery.forEach(param => {
        const value = url.searchParams.get(param);
        if (value) params.append(param, value);
      });
      if (params.toString()) {
        cacheKey += `:${params.toString()}`;
      }
    }

    if (config.varyByUser) {
      const userId = req.headers.get('x-user-id');
      if (userId) {
        cacheKey += `:user:${userId}`;
      }
    }

    const cachedResponse = await cache.get<any>(cacheKey);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse, {
        headers: { 'X-Cache': 'HIT' }
      });
    }

    // Continue with request
    return { cacheKey, config };
  };
}

export async function cacheResponse(cacheKey: string, data: any, config: CacheConfig) {
  await cache.set(cacheKey, data, {
    ttl: config.ttl,
    tags: config.tags
  });

  return NextResponse.json(data, {
    headers: { 'X-Cache': 'MISS' }
  });
}