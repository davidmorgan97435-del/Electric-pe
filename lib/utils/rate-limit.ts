/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Good enough for the free-tier Vercel hobby/pro single-region deploy.
 * Swap for Upstash Ratelimit if we go multi-region — the API here
 * intentionally mirrors `@upstash/ratelimit.limit()` so the swap is a one-line change.
 */

type Bucket = { timestamps: number[] };
const BUCKETS = new Map<string, Bucket>();

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): RateLimitResult {
  const now = Date.now();
  const bucket = BUCKETS.get(key) ?? { timestamps: [] };
  const cutoff = now - windowMs;

  bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);
  const success = bucket.timestamps.length < limit;
  if (success) bucket.timestamps.push(now);
  BUCKETS.set(key, bucket);

  const resetAt =
    bucket.timestamps.length > 0
      ? (bucket.timestamps[0] ?? now) + windowMs
      : now + windowMs;

  return {
    success,
    limit,
    remaining: Math.max(0, limit - bucket.timestamps.length),
    resetAt,
  };
}

/**
 * Clean expired buckets periodically so the Map doesn't grow unbounded
 * on long-running edge runtime instances.
 */
export function sweepRateLimitCache(maxBuckets = 5000): void {
  if (BUCKETS.size <= maxBuckets) return;
  const now = Date.now();
  for (const [key, bucket] of BUCKETS) {
    const last = bucket.timestamps[bucket.timestamps.length - 1] ?? 0;
    if (now - last > 60 * 60 * 1000) BUCKETS.delete(key);
  }
}
