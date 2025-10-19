// Stub Redis cache module
export const redisCache = {
    get: async (key) => null,
    set: async (key, value, ttl) => true,
    del: async (key) => true,
    exists: async (key) => false,
    expire: async (key, seconds) => true
};
export default redisCache;
