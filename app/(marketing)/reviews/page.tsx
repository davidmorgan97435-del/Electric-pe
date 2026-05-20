import type { Metadata } from "next";
import Link from "next/link";
import { Star, CheckCircle2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/content/testimonials";
import { getCity } from "@/content/cities";
import { scooters } from "@/content/scooters";

export const metadata: Metadata = {
  title: "Customer Reviews | 2,500+ Verified Owners",
  description:
    "Read real reviews from ElectricPe scooter owners across India. Every testimonial is verified: real name, real city, real model.",
  alternates: { canonical: "/reviews" },
};

const FEAR_LABEL: Record<string, string> = {
  battery: "Battery anxiety",
  service: "Service reliability",
  speed: "Top speed",
  repair: "Repair availability",
  "brand-credibility": "Brand trust",
  emi: "EMI experience",
};

export default function ReviewsPage() {
  const avgRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <>
      <section className="pt-16 md:pt-24 pb-12 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">Reviews</p>
            <h1 className="text-display-xl">Real riders. Real stories.</h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Every quote below is verified: real name, real city, real model. We
              don't use stock photos and we don't invent customers.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="text-number-stat text-[var(--color-brand)]">{avgRating}★</p>
                <p className="text-sm text-[var(--color-text-muted)]">Avg rating</p>
              </div>
              <div>
                <p className="text-number-stat text-[var(--color-brand)]">2,500+</p>
                <p className="text-sm text-[var(--color-text-muted)]">Owners</p>
              </div>
              <div>
                <p className="text-number-stat text-[var(--color-brand)]">80K+</p>
                <p className="text-sm text-[var(--color-text-muted)]">Community</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 md:gap-6">
          {testimonials.map((t) => {
            const city = getCity(t.cityId);
            const scooter = scooters.find(
              (s) =>
                t.scooterVariantSlug === `${s.brand}-${s.variantSlug}` ||
                s.brand === t.brand,
            );
            return (
              <Card
                key={t.id}
                className="p-6 mb-5 md:mb-6 break-inside-avoid"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < Math.floor(t.rating)
                          ? "h-4 w-4 fill-[var(--color-highlight)] text-[var(--color-highlight)]"
                          : "h-4 w-4 text-[var(--color-neutral-300)]"
                      }
                      aria-hidden
                    />
                  ))}
                  {t.verified && (
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-[var(--color-brand)]">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                      Verified
                    </span>
                  )}
                </div>
                <blockquote className="text-[var(--color-text)] leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[var(--color-text)]">
                      {t.customerName}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {city?.name}
                      {scooter ? ` · ${scooter.name}` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--color-brand)] font-medium">
                    {FEAR_LABEL[t.fearAddressed] ?? t.fearAddressed}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-[var(--color-surface-muted)]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display-lg">Share your story.</h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Own an ElectricPe? We'd love to feature you here, and on social.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/contact-us?topic=review">Tell us your story</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
