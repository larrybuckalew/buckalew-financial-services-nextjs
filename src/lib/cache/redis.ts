// Stub Redis cache module
export const redisCache = {
  get: async (key: string) => null,
  set: async (key: string, value: any, ttl?: number) => true,
  del: async (key: string) => true,
  exists: async (key: string) => false,
  expire: async (key: string, seconds: number) => true
};

export default redisCache;