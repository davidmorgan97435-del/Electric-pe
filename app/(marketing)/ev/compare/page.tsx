import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatInr } from "@/lib/utils/format";
import { scooters } from "@/content/scooters";
import type { Scooter } from "@/content/types";

export const metadata: Metadata = {
  title: "Compare Electric Scooters",
  robots: { index: false, follow: true },
};

type SearchParams = { a?: string; b?: string; c?: string };

function resolveSlug(slug: string | undefined): Scooter | undefined {
  if (!slug) return undefined;
  return scooters.find((s) => `${s.brand}-${s.variantSlug}` === slug);
}

type Row = { label: string; pick: (s: Scooter) => string | number; better: "high" | "low" };

const ROWS: Row[] = [
  { label: "On-road price", pick: (s) => s.priceOnRoad, better: "low" },
  { label: "EMI from", pick: (s) => s.emiFrom, better: "low" },
  { label: "Range per charge", pick: (s) => s.specs.rangeKm, better: "high" },
  { label: "Top speed (km/h)", pick: (s) => s.specs.topSpeedKmh, better: "high" },
  { label: "Charge time (hours)", pick: (s) => s.specs.chargeTimeHours, better: "low" },
  { label: "Battery", pick: (s) => s.specs.batteryType, better: "high" },
  { label: "Kerb weight (kg)", pick: (s) => s.specs.weightKg, better: "low" },
  { label: "Payload (kg)", pick: (s) => s.specs.payloadKg, better: "high" },
  { label: "Warranty", pick: (s) => s.specs.warranty, better: "high" },
];

function computeBest(
  row: Row,
  selected: Scooter[],
): number[] {
  const values = selected.map((s) => row.pick(s));
  const numericIndices = values
    .map((v, i) => ({ v, i }))
    .filter((x) => typeof x.v === "number") as { v: number; i: number }[];
  if (numericIndices.length < 2) return [];
  const sorted = [...numericIndices].sort((a, b) =>
    row.better === "high" ? b.v - a.v : a.v - b.v,
  );
  const [top] = sorted;
  if (!top) return [];
  const winners = numericIndices
    .filter((x) => x.v === top.v)
    .map((x) => x.i);
  return winners.length === numericIndices.length ? [] : winners;
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { a, b, c } = await searchParams;
  const selected = [resolveSlug(a), resolveSlug(b), resolveSlug(c)].filter(
    (x): x is Scooter => Boolean(x),
  );

  if (selected.length === 0) {
    return (
      <Section>
        <SectionHeader
          eyebrow="Compare"
          title="Pick scooters to compare"
          description="Choose two or three models from our lineup to see them side-by-side."
        />
        <div className="flex justify-center">
          <Button asChild size="lg" trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            <Link href="/ev">Browse all scooters</Link>
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader
        eyebrow="Side by side"
        title={`Comparing ${selected.length} ElectricPe ${selected.length === 1 ? "model" : "models"}`}
        align="left"
      />

      <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 bg-[var(--color-surface-sunken)] text-left p-4 font-semibold text-sm text-[var(--color-text-muted)] min-w-[180px]"
              >
                Specification
              </th>
              {selected.map((s) => (
                <th
                  key={`${s.brand}-${s.variantSlug}`}
                  scope="col"
                  className="p-4 text-left min-w-[220px]"
                >
                  <Card className="overflow-hidden">
                    <div className="relative aspect-[4/3] bg-[var(--color-surface-muted)]">
                      <Image
                        src={s.heroGallery[0] ?? "/img/home_hero_section_2.webp"}
                        alt={s.name}
                        fill
                        sizes="220px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-display font-bold text-[var(--color-text)]">{s.name}</p>
                      <p className="text-sm text-[var(--color-text-muted)] mb-3">
                        {formatInr(s.priceOnRoad)}
                      </p>
                      <Button asChild fullWidth size="sm">
                        <Link
                          href={`/book-test-ride?model=${s.brand}-${s.variantSlug}`}
                        >
                          Book Test Ride
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => {
              const winners = computeBest(row, selected);
              return (
                <tr key={row.label} className="border-t border-[var(--color-border)]">
                  <th
                    scope="row"
                    className="sticky left-0 bg-white text-left p-4 font-medium text-sm text-[var(--color-text-muted)]"
                  >
                    {row.label}
                  </th>
                  {selected.map((s, i) => {
                    const raw = row.pick(s);
                    const isWinner = winners.includes(i);
                    const display =
                      typeof raw === "number" && row.label.toLowerCase().includes("price")
                        ? formatInr(raw)
                        : typeof raw === "number" && row.label.toLowerCase().includes("emi")
                          ? `${formatInr(raw)}/mo`
                          : String(raw);
                    return (
                      <td
                        key={`${s.brand}-${s.variantSlug}-${row.label}`}
                        className={
                          isWinner
                            ? "p-4 text-sm font-semibold text-[var(--color-brand-pressed)]"
                            : "p-4 text-sm text-[var(--color-text)]"
                        }
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {isWinner && (
                            <span
                              aria-hidden
                              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
                            />
                          )}
                          {display}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-[var(--color-text-muted)]">
        The green dot marks the strongest spec on that row. Spec is a snapshot — the
        right choice depends on how you ride.
      </p>
    </Section>
  );
}
