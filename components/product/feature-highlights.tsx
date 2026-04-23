import * as React from "react";
import { Zap, Battery, ShieldCheck, Clock } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import type { Scooter } from "@/content/types";

const ICONS = [Zap, Battery, ShieldCheck, Clock] as const;

export function FeatureHighlights({ scooter }: { scooter: Scooter }) {
  const bullets = scooter.featureBullets.slice(0, 4);
  if (bullets.length === 0) return null;

  return (
    <Section>
      <SectionHeader
        eyebrow="Built for Indian streets"
        title={`Why riders pick the ${scooter.name}`}
        description="The four things that matter day-to-day — priced, specced, and serviced honestly."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {bullets.map((b, i) => {
          const Icon = ICONS[i % ICONS.length] ?? Zap;
          return (
            <Card key={b} className="h-full">
              <div className="p-6 md:p-7">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-4">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="text-base leading-relaxed font-semibold text-[var(--color-text)]">
                  {b}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
