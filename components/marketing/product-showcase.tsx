import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { scootersByBrand } from "@/content/scooters";
import { BRAND_ORDER, BRAND_THEMES } from "@/content/brands";
import { cn } from "@/lib/utils/cn";

/**
 * HP — Product showcase.
 *
 * Four brand tiles, one per brand, each linking to its dedicated brand
 * page. Scooter cutouts sit on a brand-themed background with the wordmark
 * rendered as real typography — no crop, no letterbox, no duplicated
 * brand text. Starting price + model count are derived from the data so
 * the tiles stay in sync with the catalogue.
 */

function formatPrice(inr: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr);
}

export function ProductShowcase() {
  return (
    <Section className="bg-[var(--color-surface-muted)]">
      <Reveal>
        <SectionHeader
          eyebrow="Explore top EV brands"
          title="Four brands, one promise — ride home today."
          description="Pick the brand that fits your ride. Every model is ARAI-approved, licence-free, and fully supported by our 30+ Mobility Centres."
        />
      </Reveal>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {BRAND_ORDER.map((slug, i) => {
          const brand = BRAND_THEMES[slug];
          const variants = scootersByBrand[slug] ?? [];
          const startingPrice = variants.reduce(
            (min, v) => Math.min(min, v.priceOnRoad),
            Number.POSITIVE_INFINITY,
          );
          const modelCount = variants.length;

          return (
            <Reveal as="li" key={slug} delay={i * 60}>
              <Link
                href={`/ev/${slug}`}
                aria-label={`Explore ${brand.displayName} — ${modelCount} model${modelCount === 1 ? "" : "s"} from ${formatPrice(startingPrice)}`}
                className="group block h-full rounded-3xl overflow-hidden bg-white border border-[var(--color-border)] transition-[border-color,box-shadow] duration-[var(--duration-base)] hover:border-[var(--color-brand)] hover:shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
              >
                <figure
                  className={cn(
                    "relative aspect-[4/5] overflow-hidden",
                    brand.tint,
                  )}
                >
                  {/* Brand wordmark — real type, no image text */}
                  <figcaption
                    className={cn(
                      "absolute inset-x-0 top-0 pt-4 text-center z-10 pointer-events-none",
                      brand.onTint,
                    )}
                  >
                    <span className="font-display font-black text-2xl md:text-3xl tracking-[0.04em] uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]">
                      {brand.displayName}
                    </span>
                  </figcaption>

                  {/* Scooter cutout — contained, bottom-anchored */}
                  <Image
                    src={brand.cutout}
                    alt={`${brand.displayName} electric scooter`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain object-bottom px-3 pb-2 pt-11 md:px-4 md:pb-3 md:pt-12 transition-transform duration-[500ms] ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                  />
                </figure>

                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg md:text-xl font-display font-bold text-[var(--color-text)] leading-tight">
                      {brand.displayName}
                    </h3>
                    <ArrowUpRight
                      className="h-5 w-5 text-[var(--color-text-subtle)] shrink-0 mt-1 transition-colors duration-[var(--duration-base)] group-hover:text-[var(--color-brand)]"
                      aria-hidden
                    />
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-4">
                    {brand.tagline}
                  </p>
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)]">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)] mb-0.5">
                        Starting from
                      </p>
                      <p className="text-base md:text-lg font-display font-bold text-[var(--color-text)] tabular-nums">
                        {formatPrice(startingPrice)}
                      </p>
                    </div>
                    <span className="text-xs md:text-sm text-[var(--color-text-subtle)] tabular-nums">
                      {modelCount} model{modelCount === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ol>

      <Reveal delay={80}>
        <div className="mt-10 md:mt-12 flex justify-center">
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
