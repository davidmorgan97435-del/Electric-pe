import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "ElectricPe's returns and refunds policy for scooters, chargers, and pre-bookings.",
  alternates: { canonical: "/returns" },
};

const LAST_UPDATED = "2026-04-01";

export default function ReturnsPage() {
  return (
    <>
      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb items={[{ label: "Returns & Refunds" }]} />
        </Container>
      </div>

      <Section>
        <Container size="md">
          <p className="text-eyebrow mb-3">Legal</p>
          <h1 className="text-display-lg">Returns & Refunds</h1>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Last updated: {new Date(LAST_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="prose prose-neutral max-w-none mt-8 text-[var(--color-text)] leading-relaxed text-base space-y-6">
            <h2 className="text-h2 mt-8">Pre-bookings</h2>
            <p>
              Pre-booking deposits (typically ₹500) are fully refundable within 48 hours
              of payment. After 48 hours, refunds are processed within 7 working days if
              you cancel before delivery.
            </p>

            <h2 className="text-h2 mt-8">Test-ride deposits</h2>
            <p>
              Doorstep test-ride deposits (₹299) are automatically refunded within 24
              hours of the scheduled ride, regardless of purchase decision.
            </p>

            <h2 className="text-h2 mt-8">Scooter returns</h2>
            <p>
              Because a scooter is a registered motor vehicle, we do not offer "change
              of mind" returns once delivery is complete. If your scooter has a
              manufacturing defect, we will replace affected parts under warranty at no
              cost — see <a href="/warranty" className="text-[var(--color-brand)] underline">warranty policy</a>.
              In the rare case of a catastrophic defect within 7 days of delivery, we
              will replace the entire vehicle at our sole discretion.
            </p>

            <h2 className="text-h2 mt-8">Charger returns</h2>
            <p>
              Home chargers may be returned within 7 days of delivery if unopened and
              unused. Return shipping is covered by ElectricPe if the reason is a defect
              on our side; otherwise borne by the customer. Refund processed within 7
              working days of receipt.
            </p>

            <h2 className="text-h2 mt-8">How to request a return</h2>
            <p>
              WhatsApp us at the number on your order confirmation, or email{" "}
              <a href="mailto:support@electricpe.com" className="text-[var(--color-brand)] underline">
                support@electricpe.com
              </a>{" "}
              with your order reference. We acknowledge within one business day and
              share next steps.
            </p>

            <h2 className="text-h2 mt-8">Refund method</h2>
            <p>
              All refunds are processed to the original payment method. UPI refunds
              typically clear in 1–3 business days; card and net-banking refunds may
              take 5–7 business days depending on your bank.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
