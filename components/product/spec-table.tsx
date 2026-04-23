import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Scooter } from "@/content/types";

type Group = { title: string; rows: [string, string | number][] };

export function SpecTable({ scooter }: { scooter: Scooter }) {
  const s = scooter.specs;
  const groups: Group[] = [
    {
      title: "Performance",
      rows: [
        ["Range per charge", `${s.rangeKm} km`],
        ["Top speed", `${s.topSpeedKmh} km/h`],
        ["Motor wattage", `${s.motorWattage} W`],
      ],
    },
    {
      title: "Battery & Charging",
      rows: [
        ["Battery chemistry", s.batteryType === "lithium-ion" ? "Lithium-Ion" : "Lead-Acid"],
        ["Capacity", `${s.batteryCapacityKwh} kWh`],
        [
          "Charging time",
          s.chargeTimeHours > 0 ? `${s.chargeTimeHours} hours` : "Swap at partner station",
        ],
      ],
    },
    {
      title: "Dimensions",
      rows: [
        ["Kerb weight", `${s.weightKg} kg`],
        ["Payload capacity", `${s.payloadKg} kg`],
        ["Wheel size", s.wheelSize],
      ],
    },
    {
      title: "Features & Safety",
      rows: [
        ["Brakes", s.brakes],
        ["Suspension", s.suspension],
        ["Certification", s.certification],
      ],
    },
    {
      title: "Warranty",
      rows: [
        ["Manufacturer warranty", s.warranty],
        ["Licence required", "Not required (low-speed EV)"],
      ],
    },
  ];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden">
      <Accordion type="multiple" defaultValue={["group-0"]}>
        {groups.map((g, i) => (
          <AccordionItem key={g.title} value={`group-${i}`} className="px-5 md:px-6">
            <AccordionTrigger>{g.title}</AccordionTrigger>
            <AccordionContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {g.rows.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-dashed border-[var(--color-border)] pb-2 last:border-b-0"
                  >
                    <dt className="text-sm text-[var(--color-text-muted)]">{k}</dt>
                    <dd className="text-sm font-medium text-[var(--color-text)] text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
