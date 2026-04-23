/**
 * In-memory fallback rate limiter used when Upstash env vars are absent.
 * Wire to Upstash Ratelimit in production by swapping this module.
 *
 * This guards form endpoints from brute-force abuse while keeping
 * the dev experience friction-free (no external dependency).
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  reset: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    const reset = now + windowMs;
    buckets.set(key, { count: 1, resetAt: reset });
    return { success: true, remaining: limit - 1, reset };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, reset: existing.resetAt };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: limit - existing.count,
    reset: existing.resetAt,
  };
}

/**
 * Best-effort IP extraction. Works behind Vercel's edge proxy.
 * Fallback to "unknown" so we still bucket anonymous traffic.
 */
export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0];
    if (first) return first.trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
