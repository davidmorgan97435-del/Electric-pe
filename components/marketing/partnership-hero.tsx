import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { globals } from "@/content/globals";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";

export function PartnershipHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-[var(--color-surface-muted)]">
      <Container>
        <div className="max-w-3xl">
          <p className="text-eyebrow mb-3">{eyebrow}</p>
          <h1 className="text-display-xl">{title}</h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
            {description}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Link href="/contact-us?topic=partnership">Talk to partnerships</Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a
                href={buildWhatsAppLink(WHATSAPP_DEFAULTS.partnership, "partnerships")}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us
              </a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
            <Stat value={globals.stats.storesOpen} label="Mobility Centers" />
            <Stat value={globals.stats.stationsCount} label="Stations in app" />
            <Stat value={globals.stats.networksCount} label="Partner networks" />
            <Stat value={globals.stats.citiesServed} label="Cities" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-number-stat text-[var(--color-text)]">{value}</p>
      <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
    </div>
  );
}
