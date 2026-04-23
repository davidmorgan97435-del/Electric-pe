import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle2, ArrowRight, Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/content/testimonials";
import { getCity } from "@/content/cities";
import { scooters } from "@/content/scooters";
import type { Testimonial } from "@/content/types";

/**
 * HP-06 — Testimonials.
 *
 * Previous build: 6 identical cards in a grid.
 * New layout: editorial "feature + satellites" — one large hero quote
 * taking the visual weight, four smaller quotes beside it with looser
 * framing (no card chrome, just typography, borders, and a photograph).
 *
 * The spec demands authentic social proof with real names, cities and
 * models. This layout makes the hero quote impossible to miss while
 * keeping the others at arm's length so the section breathes.
 */

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
              ? "h-4 w-4 fill-[var(--color-highlight)] text-[var(--color-highlight)]"
              : "h-4 w-4 text-[var(--color-neutral-300)]"
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
  const [feature, ...satellites] = testimonials.slice(0, 5);
  if (!feature) return null;

  const fm = meta(feature);

  return (
    <Section className="bg-[var(--color-surface-muted)]">
      <Reveal>
        <SectionHeader
          eyebrow="Real riders"
          title="Real riders. Real stories."
          description="Every quote below is from a verified ElectricPe owner — name, city, model included. No stock photos."
        />
      </Reveal>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
        {/* Featured quote */}
        <Reveal>
          <figure className="relative">
            <Quote
              aria-hidden
              className="absolute -top-2 -left-2 h-16 w-16 text-[var(--color-brand-soft)]"
              strokeWidth={1}
            />
            <blockquote className="relative pl-4 md:pl-8">
              <p className="font-display text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.3] text-[var(--color-text)] tracking-tight">
                &ldquo;{feature.quote}&rdquo;
              </p>
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-4 pl-4 md:pl-8">
              <div className="relative h-14 w-14 rounded-full overflow-hidden bg-[var(--color-surface-muted)] shrink-0 ring-2 ring-white">
                <Image
                  src={feature.photo}
                  alt={feature.customerName}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                  {feature.customerName}
                  {feature.verified && (
                    <CheckCircle2
                      className="h-4 w-4 text-[var(--color-brand)]"
                      aria-hidden
                    />
                  )}
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {fm.cityName} · {fm.modelName}
                </p>
              </div>
              <StarRow rating={feature.rating} />
            </figcaption>
          </figure>
        </Reveal>

        {/* Satellite quotes */}
        <ul className="divide-y divide-[var(--color-border)]">
          {satellites.map((t, i) => {
            const m = meta(t);
            return (
              <Reveal
                as="li"
                key={t.id}
                delay={100 + i * 80}
                className="py-5 first:pt-0 last:pb-0"
              >
                <blockquote className="text-[var(--color-text)] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-3 text-sm text-[var(--color-text-muted)] flex items-center gap-2">
                  <span className="font-semibold text-[var(--color-text)]">
                    {t.customerName}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{m.cityName}</span>
                  <span aria-hidden>·</span>
                  <span>{m.modelName}</span>
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <Reveal>
        <div className="mt-14 flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
          >
            <Link href="/reviews">Read all reviews</Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
