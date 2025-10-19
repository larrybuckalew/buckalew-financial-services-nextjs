// Stub rate limit module
export function rateLimit(options: any) {
  return {
    check: async (identifier: string) => ({ success: true, limit: 100, remaining: 99, reset: Date.now() + 60000 })
  };
}