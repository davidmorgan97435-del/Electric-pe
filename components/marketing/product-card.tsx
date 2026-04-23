import Link from "next/link";
import Image from "next/image";
import { Zap, Gauge, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatInr } from "@/lib/utils/format";
import { getBrandTheme } from "@/content/brands";
import { cn } from "@/lib/utils/cn";
import type { Scooter } from "@/content/types";

export function ProductCard({ scooter }: { scooter: Scooter }) {
  const href = `/ev/${scooter.brand}/${scooter.variantSlug}`;
  const theme = getBrandTheme(scooter.brand);
  const cutout = theme?.cutout ?? scooter.heroGallery[0] ?? "/img/home_hero_section_2.webp";
  return (
    <Card interactive className="overflow-hidden flex flex-col group">
      <Link
        href={href}
        className={cn(
          "relative aspect-[4/3] overflow-hidden",
          theme?.tint ?? "bg-[var(--color-surface-sunken)]",
        )}
        aria-label={`${scooter.name} details`}
      >
        <Image
          src={cutout}
          alt={`${scooter.name} scooter`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-contain object-bottom px-3 pb-2 pt-9 transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
        />
        {theme && (
          <span
            aria-hidden
            className={cn(
              "absolute inset-x-0 top-0 pt-2.5 text-center font-display font-black text-lg md:text-xl tracking-[0.04em] uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] pointer-events-none",
              theme.onTint,
            )}
          >
            {theme.displayName}
          </span>
        )}
      </Link>

      <div className="flex-1 p-5 md:p-6 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-display font-bold text-[var(--color-text)]">
            {scooter.name}
          </h3>
          {scooter.priceOriginal && scooter.priceOriginal > scooter.priceOnRoad && (
            <span className="text-xs text-[var(--color-text-subtle)] line-through shrink-0 pt-1">
              {formatInr(scooter.priceOriginal)}
            </span>
          )}
        </div>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 line-clamp-2">
          {scooter.tagline}
        </p>

        <ul className="grid grid-cols-3 gap-2 text-xs mb-5" aria-label="Key specs">
          <li className="flex flex-col items-center gap-1 rounded-lg bg-[var(--color-surface-muted)] p-2.5">
            <Zap className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
            <span className="font-semibold text-[var(--color-text)]">
              {scooter.specs.rangeKm} km
            </span>
            <span className="text-[var(--color-text-subtle)] text-[10px] uppercase">Range</span>
          </li>
          <li className="flex flex-col items-center gap-1 rounded-lg bg-[var(--color-surface-muted)] p-2.5">
            <Gauge className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
            <span className="font-semibold text-[var(--color-text)]">
              {scooter.specs.topSpeedKmh} km/h
            </span>
            <span className="text-[var(--color-text-subtle)] text-[10px] uppercase">Top</span>
          </li>
          <li className="flex flex-col items-center gap-1 rounded-lg bg-[var(--color-surface-muted)] p-2.5">
            <Battery className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
            <span className="font-semibold text-[var(--color-text)]">
              {scooter.specs.chargeTimeHours}h
            </span>
            <span className="text-[var(--color-text-subtle)] text-[10px] uppercase">Charge</span>
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between mb-4">
          <div>
            <p className="text-2xl font-display font-bold text-[var(--color-text)]">
              {formatInr(scooter.priceOnRoad)}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              or {formatInr(scooter.emiFrom)}/mo EMI
            </p>
          </div>
          <Badge variant="success" size="md">No licence</Badge>
        </div>

        <div className="flex gap-2">
          <Button asChild size="sm" fullWidth>
            <Link href={`/book-test-ride?model=${scooter.brand}-${scooter.variantSlug}`}>
              Test Ride
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" fullWidth>
            <Link href={href}>Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
