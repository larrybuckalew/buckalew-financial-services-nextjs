import { Prisma } from '@prisma/client';

export function withQueryOptimization() {
  return Prisma.defineExtension((client) => {
    return client.$extends({
      query: {
        $allModels: {
          async findMany({ model, operation, args, query }) {
            // Add index hints
            if (args.orderBy) {
              args.indexHints = getIndexHints(model, args.orderBy);
            }
            
            // Add query caching for repeated queries
            const cacheKey = getCacheKey(model, args);
            const cachedResult = await getFromCache(cacheKey);
            
            if (cachedResult) return cachedResult;
            
            const result = await query(args);
            await setCache(cacheKey, result);
            
            return result;
          },
        },
      },
    });
  });
}

export const queryMiddleware = {
  async handleQuery(params: any, next: any) {
    const start = performance.now();
    
    try {
      const result = await next(params);
      return result;
    } finally {
      const duration = performance.now() - start;
      if (duration > 100) {
        console.warn(`Slow query detected: ${duration}ms`, params);
      }
    }
  }
};