import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Warranty",
  description: "ElectricPe's 3-year warranty on motor, controller, and frame. Lithium battery 3 years. Full terms in plain language.",
  alternates: { canonical: "/warranty" },
};

const LAST_UPDATED = "2026-04-01";

export default function WarrantyPage() {
  return (
    <>
      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb items={[{ label: "Warranty" }]} />
        </Container>
      </div>

      <Section>
        <Container size="md">
          <p className="text-eyebrow mb-3">Legal</p>
          <h1 className="text-display-lg">Warranty</h1>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Last updated: {new Date(LAST_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="prose prose-neutral max-w-none mt-8 text-[var(--color-text)] leading-relaxed text-base space-y-6">
            <h2 className="text-h2 mt-8">What's covered</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Motor:</strong> 3 years, unlimited kilometres.</li>
              <li><strong>Controller:</strong> 3 years.</li>
              <li><strong>Frame:</strong> 3 years against rust-through.</li>
              <li><strong>Lithium-ion battery:</strong> 3 years or 30,000 km — whichever is earlier.</li>
              <li><strong>Lead-acid battery:</strong> 12 months, pro-rated replacement after 6 months.</li>
              <li><strong>Charger:</strong> 2 years.</li>
            </ul>

            <h2 className="text-h2 mt-8">What's not covered</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Wear-and-tear items — tyres, brake pads, clutch cables, lights.</li>
              <li>Damage from accidents, misuse, or overloading beyond specifications.</li>
              <li>Water ingress from submersion or pressure-washing.</li>
              <li>Unauthorised modifications, including battery swaps from unapproved sources.</li>
              <li>Cosmetic wear on paint, decals, or upholstery.</li>
            </ul>

            <h2 className="text-h2 mt-8">How to claim</h2>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>WhatsApp your nearest Mobility Center, or walk in.</li>
              <li>Our technician diagnoses the issue — usually free.</li>
              <li>If covered, we replace or repair the part at no cost.</li>
              <li>Turnaround is within 24 hours for in-stock parts; we update you on WhatsApp if longer.</li>
            </ol>

            <h2 className="text-h2 mt-8">Transferability</h2>
            <p>
              The warranty is non-transferable and applies only to the original
              registered owner. Exceptions are made for transfers within immediate
              family with prior written notice to ElectricPe.
            </p>

            <h2 className="text-h2 mt-8">Our SLA</h2>
            <p>
              We publish our 24-hour service SLA hit-rate every month on the{" "}
              <a href="/service" className="text-[var(--color-brand)] underline">service page</a>. If
              your warranty claim takes more than 7 days, we'll proactively credit you
              with a free service voucher worth ₹1,500.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
