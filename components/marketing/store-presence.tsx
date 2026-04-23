"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Clock, Navigation, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { PillNav } from "@/components/ui/pill-nav";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Reveal } from "@/components/ui/reveal";
import { cities } from "@/content/cities";
import { stores, getStoresByCity } from "@/content/stores";
import { globals } from "@/content/globals";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";

/**
 * HP-05 — Mobility Centers.
 *
 * Rebuilt end-to-end on the website-factory component kit:
 *   • GridPattern background — subtle SVG grid with radial mask.
 *   • VerticalCutReveal — word-by-word slide-up on the headline.
 *   • PillNav — animated pill that slides behind the active city.
 *   • CardSpotlight — radial spotlight follows cursor on each store card.
 *   • InteractiveHoverButton — brand dot expands to fill the CTA on hover.
 *
 * Layout: two-column grid (desktop) with store cards on the left taking
 * two thirds and a large summary panel on the right. Stats at the bottom
 * pull directly from the stores data (live store count + next targets).
 */

export function StorePresence() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const activeCity = cities[activeIdx] ?? cities[0]!;
  const cityStores = React.useMemo(
    () => getStoresByCity(activeCity.slug),
    [activeCity.slug],
  );

  const pillItems = React.useMemo(
    () =>
      cities.map((c) => ({
        label: c.name,
        count: getStoresByCity(c.slug).length,
      })),
    [],
  );

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-surface)] py-20 md:py-24 lg:py-28">
      {/* Grid pattern behind everything */}
      <GridPattern
        size={44}
        strokeColor="rgba(3, 152, 85, 0.12)"
        className="opacity-80"
      />

      <Container className="relative">
        {/* Header */}
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)] mb-4">
              Mobility Centers
            </p>
          </Reveal>

          <h2
            className="font-display font-bold text-[var(--color-text)] tracking-[-0.025em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}
          >
            <VerticalCutReveal>Visit us. We are here.</VerticalCutReveal>
          </h2>

          <Reveal delay={80}>
            <p className="mt-5 max-w-xl text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
              {globals.stats.storesOpen} ElectricPe stores across India — walk
              in, test ride, ask anything. No appointment needed.
            </p>
          </Reveal>
        </div>

        {/* City pill navigation */}
        <Reveal delay={140}>
          <div className="mt-10 md:mt-12 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <PillNav
              items={pillItems}
              activeIndex={activeIdx}
              onChange={setActiveIdx}
              layoutId="store-city-pill"
            />
          </div>
        </Reveal>

        {/* Two-column layout: stores list + city summary */}
        <div className="mt-10 md:mt-12 grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-10 items-start">
          {/* Left: store cards */}
          <ul className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {cityStores.length === 0 ? (
              <li className="col-span-full rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center text-[var(--color-text-muted)]">
                We haven&apos;t opened here yet — but it&apos;s coming soon.
              </li>
            ) : (
              cityStores.map((store, i) => {
                const photo = store.photos[0] ?? "/img/home_hero_section_2.webp";
                const directions = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
                return (
                  <Reveal as="li" key={store.slug} delay={i * 60}>
                    <CardSpotlight className="h-full p-5 md:p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative h-16 w-16 md:h-20 md:w-20 shrink-0 rounded-xl overflow-hidden bg-[var(--color-surface-muted)]">
                          <Image
                            src={photo}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-base md:text-lg text-[var(--color-text)] leading-tight mb-1.5">
                            {store.name}
                          </h3>
                          <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-3">
                            {store.address}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[var(--color-text-subtle)]">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" aria-hidden /> 10am – 8pm
                            </span>
                            <a
                              href={`tel:${store.phone}`}
                              className="inline-flex items-center gap-1 hover:text-[var(--color-brand)] transition-colors"
                            >
                              <Phone className="h-3.5 w-3.5" aria-hidden /> Call
                            </a>
                            <a
                              href={directions}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 hover:text-[var(--color-brand)] transition-colors"
                            >
                              <Navigation className="h-3.5 w-3.5" aria-hidden /> Directions
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardSpotlight>
                  </Reveal>
                );
              })
            )}
          </ul>

          {/* Right: city summary panel */}
          <Reveal delay={200}>
            <aside
              className="relative rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-brand-soft)] via-[var(--color-surface)] to-[var(--color-surface)] p-8 md:p-10 overflow-hidden"
              aria-label={`About ${activeCity.name}`}
            >
              <div
                aria-hidden
                className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-25 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(18,183,106,0.45), transparent)",
                  filter: "blur(14px)",
                }}
              />

              <div className="relative">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[var(--color-brand)] text-white mb-5">
                  <MapPin className="h-6 w-6" aria-hidden />
                </span>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)] mb-2">
                  Active city
                </p>
                <p className="text-3xl md:text-4xl font-display font-bold text-[var(--color-text)] tracking-tight">
                  {activeCity.name}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {cityStores.length} Mobility Center
                  {cityStores.length === 1 ? "" : "s"} · {activeCity.state}
                </p>

                <p className="mt-6 text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-4">
                  {activeCity.introCopy}
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <Link
                    href={`/stores/${activeCity.slug}`}
                    className="inline-block"
                  >
                    <InteractiveHoverButton className="w-full justify-center">
                      Find stores in {activeCity.name}
                    </InteractiveHoverButton>
                  </Link>
                  <a
                    href={buildWhatsAppLink(
                      WHATSAPP_DEFAULTS.general,
                      `stores/${activeCity.slug}`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] underline underline-offset-4 decoration-2 decoration-[var(--color-brand-soft)] hover:decoration-[var(--color-brand)] text-center transition-colors"
                  >
                    Prefer WhatsApp? Message us →
                  </a>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>

        {/* Footer row — live stats */}
        <Reveal delay={260}>
          <div className="mt-12 md:mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-8 border-t border-[var(--color-border)] text-sm">
            <p className="text-[var(--color-text-muted)]">
              <span className="font-semibold text-[var(--color-text)]">
                {stores.length} stores live
              </span>{" "}
              · Growing to 50+ by the end of this year.
            </p>
            <Link
              href="/stores"
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors"
            >
              See every Mobility Center
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
