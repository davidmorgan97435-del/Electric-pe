import Link from "next/link";
import Image from "next/image";
import { Zap, Plug } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/utils/format";
import type { Charger } from "@/content/types";

export function ChargerCard({ charger }: { charger: Charger }) {
  return (
    <Card interactive className="overflow-hidden flex flex-col">
      <Link
        href={`/charger/${charger.slug}`}
        className="relative aspect-[4/3] bg-[var(--color-surface-muted)]"
      >
        <Image
          src={charger.image}
          alt={`${charger.name} EV charger`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-6"
        />
        <Badge variant="brand" className="absolute top-4 left-4 capitalize">
          {charger.brand}
        </Badge>
      </Link>
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-2">
          {charger.name}
        </h3>
        <ul className="grid grid-cols-3 gap-1.5 text-xs mb-4">
          <li className="rounded-md bg-[var(--color-surface-muted)] p-2 text-center">
            <Zap
              className="h-3.5 w-3.5 text-[var(--color-brand)] mx-auto mb-0.5"
              aria-hidden
            />
            <p className="font-semibold">{charger.powerKw} kW</p>
          </li>
          <li className="rounded-md bg-[var(--color-surface-muted)] p-2 text-center">
            <Plug
              className="h-3.5 w-3.5 text-[var(--color-brand)] mx-auto mb-0.5"
              aria-hidden
            />
            <p className="font-semibold">{charger.currentType}</p>
          </li>
          <li className="rounded-md bg-[var(--color-surface-muted)] p-2 text-center">
            <p className="text-[10px] text-[var(--color-text-muted)]">OCPP</p>
            <p className="font-semibold">{charger.ocppCompatible ? "Yes" : "No"}</p>
          </li>
        </ul>
        <p className="text-xs text-[var(--color-text-muted)] mb-4">
          {charger.connectorType} · {charger.smart ? "Smart" : "Standard"}
          {charger.installationIncluded ? " · Installation included" : ""}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            {charger.requestQuoteOnly ? (
              <p className="font-display font-bold text-[var(--color-text)]">
                Request quote
              </p>
            ) : charger.priceInr ? (
              <p className="font-display font-bold text-[var(--color-text)]">
                {formatInr(charger.priceInr)}
              </p>
            ) : null}
          </div>
          <Button asChild size="sm">
            <Link href={`/charger/${charger.slug}`}>Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
