// Stub rate limit module
export function rateLimit(options) {
    return {
        check: async (identifier) => ({ success: true, limit: 100, remaining: 99, reset: Date.now() + 60000 })
    };
}
