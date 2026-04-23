import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge middleware.
 *
 * Writes `ep_city` cookie from Vercel geo headers so server components
 * can render city-aware defaults (nearest stores, local fuel price)
 * without blocking on a client round-trip.
 *
 * Uses a small allowlist — if Vercel's geo says something we don't
 * serve, we fall back to bengaluru.
 */
const SERVED_CITY_SLUGS = new Set([
  "bengaluru",
  "delhi",
  "gurugram",
  "jaipur",
  "hyderabad",
  "chennai",
  "mumbai",
  "pune",
  "ahmedabad",
  "chandigarh",
]);

const CITY_MAP: Record<string, string> = {
  bangalore: "bengaluru",
  bengaluru: "bengaluru",
  "new delhi": "delhi",
  delhi: "delhi",
  gurgaon: "gurugram",
  gurugram: "gurugram",
  jaipur: "jaipur",
  hyderabad: "hyderabad",
  chennai: "chennai",
  mumbai: "mumbai",
  pune: "pune",
  ahmedabad: "ahmedabad",
  chandigarh: "chandigarh",
};

function resolveCity(raw: string | undefined): string | null {
  if (!raw) return null;
  const slug = CITY_MAP[raw.toLowerCase()];
  if (slug && SERVED_CITY_SLUGS.has(slug)) return slug;
  return null;
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get("ep_city")) {
    // Vercel attaches geo at request.geo at runtime. In non-Vercel environments
    // the request.geo prop won't exist — fall back to headers and finally to
    // our default served city so SSR never errors.
    const geoCity =
      // @ts-expect-error — request.geo is injected by Vercel; typed loosely here
      request.geo?.city ??
      request.headers.get("x-vercel-ip-city") ??
      undefined;

    const resolved = resolveCity(
      typeof geoCity === "string" ? decodeURIComponent(geoCity) : undefined,
    );

    response.cookies.set("ep_city", resolved ?? "bengaluru", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on every HTML route except:
     * - /api/*      — API routes
     * - /_next/*    — build assets
     * - /favicon.*  — favicon
     * - /img/*      — static images
     * - /icons/*    — static icons
     * - /lottie/*   — static animations
     */
    "/((?!api|_next/static|_next/image|favicon|img|icons|lottie|robots\\.txt|sitemap\\.xml).*)",
  ],
};
