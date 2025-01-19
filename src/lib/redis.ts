import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export async function cacheCalculation(
  type: string,
  inputs: any,
  result: number
) {
  const key = `calc:${type}:${JSON.stringify(inputs)}`;
  await redis.set(key, result, { ex: 60 * 60 * 24 }); // 24h expiry
}

export async function getCachedCalculation(
  type: string,
  inputs: any
): Promise<number | null> {
  const key = `calc:${type}:${JSON.stringify(inputs)}`;
  const result = await redis.get<number>(key);
  return result;
}