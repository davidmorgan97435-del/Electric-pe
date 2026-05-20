"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Zap, Gauge, Battery } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { scootersByBrand, getBrandFlagship } from "@/content/scooters";
import { BRAND_THEMES } from "@/content/brands";
import { cn } from "@/lib/utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * HP - Product showcase.
 *
 * Three featured brands on the homepage, one card each. The card routes to
 * the brand landing page where the customer picks their variant.
 */

const FEATURED_BRANDS = ["xypro", "jett", "4all"] as const;

function formatPrice(inr: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr);
}

export function ProductShowcase() {
  const reduced = useReducedMotion();
  const gridRef = React.useRef<HTMLOListElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <Section className="bg-[var(--color-surface-muted)]">
      <Reveal>
        <SectionHeader
          eyebrow="Featured rides"
          title="The scooters, every Indian needs."
          description="Pick the silhouette that fits your day. Every model is ARAI-approved, licence-free, and serviced by our 30+ Mobility Centres."
        />
      </Reveal>

      <motion.ol
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.15 },
          },
        }}
        initial={reduced ? false : "hidden"}
        animate={
          !reduced && gridInView ? "visible" : reduced ? undefined : "hidden"
        }
      >
        {FEATURED_BRANDS.map((slug) => {
          const brand = BRAND_THEMES[slug];
          const variants = scootersByBrand[slug] ?? [];
          const flagship = getBrandFlagship(slug);
          if (!flagship) return null;
          const startingPrice = variants.reduce(
            (min, v) => Math.min(min, v.priceOnRoad),
            Number.POSITIVE_INFINITY,
          );
          const maxRange = Math.max(...variants.map((v) => v.specs.rangeKm));

          return (
            <motion.li
              key={slug}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: EASE },
                },
              }}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -6,
                      transition: { type: "spring", stiffness: 400, damping: 28 },
                    }
              }
            >
              <Link
                href={`/ev/${slug}`}
                aria-label={`Explore ${brand.displayName}, starting from ${formatPrice(startingPrice)}`}
                className="group block h-full rounded-3xl overflow-hidden bg-white border border-[var(--color-border)] transition-[border-color,box-shadow] duration-[var(--duration-base)] hover:border-[var(--color-brand)] hover:shadow-[0_30px_80px_-30px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
              >
                {/* Large image area */}
                <figure
                  className={cn(
                    "relative aspect-[16/11] overflow-hidden",
                    brand.tint,
                  )}
                >
                  <figcaption
                    className={cn(
                      "absolute inset-x-0 top-0 pt-5 md:pt-6 text-center z-10 pointer-events-none",
                      brand.onTint,
                    )}
                  >
                    <span className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-[0.04em] uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]">
                      {brand.displayName}
                    </span>
                  </figcaption>
                  <Image
                    src={brand.cutout}
                    alt={`${brand.displayName} electric scooter`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-bottom px-6 pb-3 pt-16 md:px-8 md:pb-4 md:pt-20 transition-transform duration-[600ms] ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                  />
                </figure>

                {/* Body */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-[var(--color-text)] leading-tight">
                        {brand.displayName}
                      </h3>
                      <p className="mt-1 text-sm md:text-base text-[var(--color-text-muted)]">
                        {brand.tagline}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="h-6 w-6 text-[var(--color-text-subtle)] shrink-0 mt-1 transition-colors duration-[var(--duration-base)] group-hover:text-[var(--color-brand)]"
                      aria-hidden
                    />
                  </div>

                  {/* Key spec chips */}
                  <ul className="grid grid-cols-3 gap-2 md:gap-3 my-5">
                    <li className="flex flex-col items-center gap-1 rounded-lg bg-[var(--color-surface-muted)] p-3">
                      <Zap className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
                      <span className="font-semibold text-sm text-[var(--color-text)] tabular-nums">
                        {maxRange} km
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-subtle)]">
                        Range
                      </span>
                    </li>
                    <li className="flex flex-col items-center gap-1 rounded-lg bg-[var(--color-surface-muted)] p-3">
                      <Gauge className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
                      <span className="font-semibold text-sm text-[var(--color-text)] tabular-nums">
                        {flagship.specs.topSpeedKmh} km/h
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-subtle)]">
                        Top speed
                      </span>
                    </li>
                    <li className="flex flex-col items-center gap-1 rounded-lg bg-[var(--color-surface-muted)] p-3">
                      <Battery className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
                      <span className="font-semibold text-sm text-[var(--color-text)] tabular-nums">
                        {flagship.specs.chargeTimeHours}h
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-subtle)]">
                        Charge
                      </span>
                    </li>
                  </ul>

                  <div className="flex items-end justify-between gap-3 pt-5 border-t border-[var(--color-border)]">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)] mb-1">
                        Starting from
                      </p>
                      <p className="text-xl md:text-2xl font-display font-bold text-[var(--color-text)] tabular-nums">
                        {formatPrice(startingPrice)}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)] group-hover:gap-2 transition-all">
                      Explore {brand.displayName}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ol>

      <Reveal delay={120}>
        <div className="mt-12 md:mt-14 flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
          >
            <Link href="/ev">Explore all models</Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
