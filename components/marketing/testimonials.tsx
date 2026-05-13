"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle2, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { testimonials } from "@/content/testimonials";
import { getCity } from "@/content/cities";
import { scooters } from "@/content/scooters";
import type { Testimonial, FearTag } from "@/content/types";

/**
 * HP-06 — Testimonials.
 *
 * Ryze-style vertical portrait gallery:
 *   • 5 tall portrait cards in a row (1 on mobile, 2 on tablet, 5 on desktop).
 *   • Each card: brand image background, rider quote overlaid with a bottom
 *     gradient for legibility, and a dark UPPERCASE "category strip" at the
 *     absolute bottom naming the fear the rider resolved.
 *   • Focus-cards interaction: hovering one card keeps it sharp while the
 *     others blur and dim slightly — draws attention to the active quote.
 *
 * Keeps the client brief intact: "real names, real cities, real fears
 * addressed." Every category matches the PDF's list of buyer fears.
 */

const FEAR_LABELS: Record<FearTag, string> = {
  battery: "Battery anxiety",
  service: "Service reliability",
  speed: "Speed concerns",
  repair: "Repair availability",
  "brand-credibility": "Brand trust",
  emi: "EMI experience",
};

// Map each rider to a visual — use the brand banner so each card gets its
// own distinct colourway (pink-sky Xypro, crimson Jett, light-bg 4ALL, etc.)
// rather than reusing the same placeholder photo.
const BRAND_IMAGE: Record<string, string> = {
  xypro: "/img/xypro_brand_banner.webp",
  jett: "/img/jett_brand_banner.webp",
  ep: "/img/ep_brand_banner.webp",
  "4all": "/img/4all_brand_banner.webp",
};

function StarRow({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < full
              ? "h-3.5 w-3.5 fill-[var(--color-highlight)] text-[var(--color-highlight)]"
              : "h-3.5 w-3.5 text-white/40"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}

function meta(t: Testimonial) {
  const city = getCity(t.cityId);
  const scooter = scooters.find((s) => s.brand === t.brand);
  return {
    cityName: city?.name ?? "",
    modelName: scooter?.name ?? t.brand,
  };
}

export function Testimonials() {
  const [focusIdx, setFocusIdx] = React.useState<number | null>(null);
  const featured = testimonials.slice(0, 5);

  return (
    <Section className="bg-[var(--color-surface-muted)]">
      <Reveal>
        <SectionHeader
          eyebrow="Real riders"
          title="See what real riders say about your biggest worries."
          description="Each card below addresses a different fear — battery, service, speed, repair, brand trust, EMI. Real names. Real cities. Real decisions."
        />
      </Reveal>

      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5"
        onMouseLeave={() => setFocusIdx(null)}
      >
        {featured.map((t, i) => {
          const m = meta(t);
          const image = BRAND_IMAGE[t.brand] ?? t.photo;
          const fearLabel = FEAR_LABELS[t.fearAddressed];
          const isFocused = focusIdx === i;
          const isDimmed = focusIdx !== null && focusIdx !== i;

          return (
            <Reveal as="li" key={t.id} delay={i * 80}>
              <article
                onMouseEnter={() => setFocusIdx(i)}
                onFocus={() => setFocusIdx(i)}
                onBlur={() => setFocusIdx(null)}
                tabIndex={0}
                className={cn(
                  "group relative overflow-hidden rounded-2xl aspect-[3/5] lg:aspect-[3/5.6]",
                  "bg-[var(--color-neutral-900)] cursor-pointer outline-none",
                  "transition-[transform,filter,opacity,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-standard)]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
                  isDimmed && "blur-[1.5px] opacity-70 scale-[0.98]",
                  isFocused && "scale-[1.035] -translate-y-1 shadow-[var(--shadow-xl)]",
                  "motion-reduce:transform-none motion-reduce:blur-0 motion-reduce:opacity-100",
                )}
                aria-label={`${t.customerName} on ${fearLabel}`}
              >
                {/* Background image */}
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className={cn(
                    "object-cover object-center transition-transform duration-[var(--duration-slow)]",
                    isFocused && "scale-[1.04]",
                  )}
                />

                {/* Top veil for stars + verified pill */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent"
                />

                {/* Bottom veil for quote */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/80 to-transparent"
                />

                {/* Top-left: stars */}
                <div className="absolute top-3.5 left-4 z-10 flex items-center gap-2">
                  <StarRow rating={t.rating} />
                  {t.verified && (
                    <span
                      title="Verified owner"
                      className="inline-flex items-center gap-1 text-[10px] font-medium text-white/85"
                    >
                      <CheckCircle2 className="h-3 w-3 text-[var(--color-primary-400)]" aria-hidden />
                      Verified
                    </span>
                  )}
                </div>

                {/* Quote + name block — sits above the category strip */}
                <div className="absolute inset-x-0 bottom-12 md:bottom-14 px-4 md:px-5 z-10 text-white">
                  <blockquote className="text-[13px] md:text-sm leading-snug line-clamp-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-[11px] md:text-xs text-white/80 leading-tight">
                    <span className="font-semibold text-white">
                      {t.customerName}
                    </span>
                    {m.cityName ? ` · ${m.cityName}` : ""}
                    <br />
                    <span className="text-white/65">{m.modelName}</span>
                  </p>
                </div>

                {/* Bottom category strip — the Ryze hallmark */}
                <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-sm py-2.5 md:py-3 px-3 text-center z-20 border-t border-white/8">
                  <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 leading-none">
                    {fearLabel}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={200}>
        <div className="mt-12 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button
            asChild
            variant="outline"
            size="lg"
            trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
          >
            <Link href="/reviews">Read all reviews</Link>
          </Button>
          <p className="text-sm text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-text)]">4.6★</span>{" "}
            · {testimonials.length}+ verified rider stories
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
