import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Gauge, Clock, Store, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/utils/format";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { getBrandTheme } from "@/content/brands";
import { cn } from "@/lib/utils/cn";
import type { Scooter } from "@/content/types";

export function PdpHero({ scooter }: { scooter: Scooter }) {
  const theme = getBrandTheme(scooter.brand);
  const heroImg = theme?.cutout ?? scooter.heroGallery[0] ?? "/img/home_hero_section_2.webp";
  const wa = buildWhatsAppLink(
    `Hi! I'd like a callback about the ${scooter.name} (on-road ${formatInr(scooter.priceOnRoad)}).`,
    `PDP ${scooter.brand}/${scooter.variantSlug}`,
  );
  const cityCount = scooter.availabilityCities.length;

  return (
    <section
      id="pdp-hero"
      className="pt-8 md:pt-12 pb-12 md:pb-16 bg-[var(--color-surface-muted)]"
      aria-label={`${scooter.name} overview`}
    >
      <div className="container-page">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
          {/* Image */}
          <div
            className={cn(
              "relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-[var(--shadow-lg)] border border-[var(--color-border)]",
              theme?.tint ?? "bg-[var(--color-surface)]",
            )}
          >
            {theme && (
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 top-0 pt-4 md:pt-5 text-center font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-[0.04em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)] pointer-events-none z-10",
                  theme.onTint,
                )}
              >
                {theme.displayName}
              </span>
            )}
            <Image
              src={heroImg}
              alt={`${scooter.name}: ${scooter.tagline}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-bottom px-4 pb-3 pt-14 md:px-6 md:pb-4 md:pt-16"
            />
          </div>

          {/* Details */}
          <div>
            <Badge variant="brand" className="capitalize mb-4">
              {scooter.brand}
            </Badge>
            <h1 className="text-display-lg text-[var(--color-text)]">
              {scooter.name}
            </h1>
            <p className="mt-3 text-lg text-[var(--color-text-muted)] leading-relaxed">
              {scooter.tagline}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-end gap-3 flex-wrap">
              <p className="text-number-stat text-[var(--color-text)]">
                {formatInr(scooter.priceOnRoad)}
              </p>
              {scooter.priceOriginal && scooter.priceOriginal > scooter.priceOnRoad && (
                <p className="text-base text-[var(--color-text-subtle)] line-through pb-1.5">
                  {formatInr(scooter.priceOriginal)}
                </p>
              )}
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              On-road price, inclusive of taxes · EMI from{" "}
              <span className="font-semibold text-[var(--color-text)]">
                {formatInr(scooter.emiFrom)}/month
              </span>
            </p>

            {/* Key spec strip */}
            <ul
              className="mt-6 grid grid-cols-3 gap-3"
              aria-label="Key specifications"
            >
              <SpecPill
                icon={<Zap className="h-4 w-4" aria-hidden />}
                label="Range"
                value={`${scooter.specs.rangeKm} km`}
              />
              <SpecPill
                icon={<Gauge className="h-4 w-4" aria-hidden />}
                label="Top speed"
                value={`${scooter.specs.topSpeedKmh} km/h`}
              />
              <SpecPill
                icon={<Clock className="h-4 w-4" aria-hidden />}
                label="Charge"
                value={
                  scooter.specs.chargeTimeHours > 0
                    ? `${scooter.specs.chargeTimeHours}h`
                    : "Swap"
                }
              />
            </ul>

            {/* CTAs */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link
                  href={`/book-test-ride?model=${scooter.brand}-${scooter.variantSlug}`}
                >
                  Book free test ride
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="whatsapp"
                leadingIcon={<MessageCircle className="h-4 w-4" aria-hidden />}
              >
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  Request callback
                </a>
              </Button>
            </div>

            {/* Availability */}
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <Store className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
              Available at{" "}
              <span className="font-semibold text-[var(--color-text)]">
                {cityCount}
              </span>{" "}
              {cityCount === 1 ? "city" : "cities"}. Find your nearest
              Mobility Center
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-3 md:p-4 text-center">
      <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-1.5">
        {icon}
      </span>
      <p className="font-display font-bold text-[var(--color-text)]">{value}</p>
      <p className="text-[11px] uppercase tracking-wider text-[var(--color-text-subtle)]">
        {label}
      </p>
    </li>
  );
}
