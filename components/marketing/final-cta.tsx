import * as React from "react";
import Link from "next/link";
import { Calendar, MapPin, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { globals } from "@/content/globals";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";

/**
 * HP-09 — Final CTA strip.
 *
 * Spec says: headline + three action buttons. No extra text. Earlier
 * build wrapped each action in its own nested glass card — repeating
 * the card treatment already used heavily above the fold.
 *
 * This rewrite ships the three actions as inline rows separated by
 * thin rules. One cohesive strip, three tap targets, zero card chrome.
 */

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative bg-gradient-brand text-white overflow-hidden"
    >
      <Container>
        <div className="py-20 md:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2
              id="final-cta-heading"
              className="text-display-lg font-display text-white"
            >
              Ready to make the switch?
            </h2>
          </div>

          <ul
            className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 border-t border-b border-white/20"
            aria-label="How to get started"
          >
            <ActionRow
              icon={Calendar}
              label="Book a Test Ride"
              sub="Doorstep or at our store"
              href="/book-test-ride"
            />
            <ActionRow
              icon={MapPin}
              label="Find a Store"
              sub="30+ Mobility Centers"
              href="/stores"
            />
            <ActionRow
              icon={MessageCircle}
              label="Talk to us"
              sub="WhatsApp, any day"
              href={buildWhatsAppLink(WHATSAPP_DEFAULTS.general, "final-cta")}
              external
            />
          </ul>

          <div className="mt-10 flex items-center justify-center">
            <a
              href={`tel:${globals.supportPhone}`}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)] rounded px-2 py-1"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Prefer to call? {globals.supportPhone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ActionRow({
  icon: Icon,
  label,
  sub,
  href,
  external,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  href: string;
  external?: boolean;
}) {
  const Inner = (
    <span className="group flex items-center justify-between gap-6 py-8 md:py-10 px-4 md:px-8 h-full transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.08] focus-visible:outline-none">
      <span className="flex items-center gap-4 md:gap-5 min-w-0">
        <Icon
          className="h-6 w-6 md:h-7 md:w-7 text-white/80 shrink-0"
          aria-hidden
        />
        <span className="min-w-0">
          <span className="block font-display text-lg md:text-xl font-bold text-white truncate">
            {label}
          </span>
          <span className="block text-sm text-white/75 truncate">{sub}</span>
        </span>
      </span>
      <ArrowRight
        className="h-5 w-5 text-white/70 shrink-0 transition-transform duration-[var(--duration-base)] group-hover:translate-x-1 group-hover:text-white"
        aria-hidden
      />
    </span>
  );

  return (
    <li className="m-0">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)]"
        >
          {Inner}
        </a>
      ) : (
        <Link
          href={href}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)]"
        >
          {Inner}
        </Link>
      )}
    </li>
  );
}
