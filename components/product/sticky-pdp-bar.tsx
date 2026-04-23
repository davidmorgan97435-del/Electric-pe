"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Scooter } from "@/content/types";

export function StickyPdpBar({ scooter }: { scooter: Scooter }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const hero = document.getElementById("pdp-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!!entry && !entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-16 md:bottom-0 z-[var(--z-sticky)]",
        "bg-white border-t border-[var(--color-border)] shadow-[0_-4px_12px_rgba(16,24,40,0.08)]",
        "transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]",
        visible ? "translate-y-0" : "translate-y-full pointer-events-none",
      )}
    >
      <div className="container-page flex items-center gap-3 md:gap-5 py-3">
        <div className="relative h-12 w-14 md:h-14 md:w-20 rounded-lg overflow-hidden bg-[var(--color-surface-muted)] shrink-0 hidden sm:block">
          <Image
            src={scooter.heroGallery[0] ?? "/img/home_hero_section_2.webp"}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base font-semibold text-[var(--color-text)] truncate">
            {scooter.name}
          </p>
          <p className="text-xs md:text-sm text-[var(--color-text-muted)]">
            {formatInr(scooter.priceOnRoad)} · EMI {formatInr(scooter.emiFrom)}/mo
          </p>
        </div>
        <Button asChild size="md" className="shrink-0">
          <Link
            href={`/book-test-ride?model=${scooter.brand}-${scooter.variantSlug}`}
          >
            <span className="hidden sm:inline">Book Test Ride</span>
            <span className="sm:hidden">Test Ride</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
