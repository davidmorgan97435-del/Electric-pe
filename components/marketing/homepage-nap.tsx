import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { globals } from "@/content/globals";

/**
 * Homepage NAP (Name / Address / Phone) block.
 *
 * Hoth's SEO audit flagged that the homepage HTML did not surface a
 * machine-readable business address, which is the canonical Local-SEO
 * "NAP" signal. The footer carries the address but Google's local-SEO
 * heuristics tend to weight the homepage body higher. This component
 * places a small, accessible, visible NAP block above the footer so the
 * crawler sees Name + Address + Phone + Hours together in raw HTML on
 * the homepage. The values are pulled from the shared globals + the HQ
 * address constant used elsewhere so we only update one source of truth.
 */
export function HomepageNap() {
  return (
    <section
      aria-labelledby="nap-heading"
      className="bg-[var(--color-surface-muted)] border-t border-[var(--color-border)]"
    >
      <Container>
        <div className="py-10 md:py-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <address className="not-italic">
            <p className="text-eyebrow mb-2">Visit our headquarters</p>
            <h2
              id="nap-heading"
              className="font-display font-bold text-xl md:text-2xl text-[var(--color-text)]"
            >
              ElectricPe — Wattapp Technologies Pvt. Ltd.
            </h2>
            <p className="mt-3 inline-flex items-start gap-2 text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
              <MapPin
                className="h-4 w-4 mt-1 text-[var(--color-brand)] shrink-0"
                aria-hidden
              />
              <span>
                1st Floor, Hanto Orion, 14th Main Street, HSR Layout,
                Bengaluru, Karnataka 560102, India
              </span>
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-text-muted)]">
              <a
                href={`tel:${globals.supportPhone}`}
                className="inline-flex items-center gap-1.5 hover:text-[var(--color-brand)]"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {globals.supportPhone}
              </a>
              <a
                href={`mailto:${globals.supportEmail}`}
                className="inline-flex items-center gap-1.5 hover:text-[var(--color-brand)]"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {globals.supportEmail}
              </a>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                Mon–Sun, 10am–8pm IST
              </span>
            </div>
          </address>
          <div className="flex md:items-center md:justify-end">
            <Link
              href="/stores"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
            >
              <MapPin className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
              See all Mobility Centers
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
