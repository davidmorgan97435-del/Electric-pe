import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { globals } from "@/content/globals";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern your use of the ElectricPe website and services.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "2026-04-01";

export default function TermsPage() {
  return (
    <>
      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb items={[{ label: "Terms of Use" }]} />
        </Container>
      </div>

      <Section>
        <Container size="md">
          <p className="text-eyebrow mb-3">Legal</p>
          <h1 className="text-display-lg">Terms of Use</h1>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Last updated: {new Date(LAST_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="prose prose-neutral max-w-none mt-8 text-[var(--color-text)] leading-relaxed text-base space-y-6">
            <p>
              These Terms of Use govern your use of the ElectricPe website, mobile
              app, and retail services operated by {globals.legalEntity.name} in
              India. By using any of these services, you agree to these terms.
            </p>

            <h2 className="text-h2 mt-8">Eligibility</h2>
            <p>
              You must be 18 years or older to make a purchase, book a test ride,
              or apply for financing. Low-speed ElectricPe scooters (25 km/h) do not
              require a driving licence; higher-speed variants, if any, require a
              valid two-wheeler licence.
            </p>

            <h2 className="text-h2 mt-8">Your account</h2>
            <p>
              You may create an account on the ElectricPe app. You are responsible for
              maintaining the confidentiality of your login credentials and for all
              activity under your account. Notify us immediately at{" "}
              <a href="mailto:support@electricpe.com" className="text-[var(--color-brand)] underline">
                support@electricpe.com
              </a>{" "}
              of any unauthorised use.
            </p>

            <h2 className="text-h2 mt-8">Orders and payments</h2>
            <p>
              Prices shown on this website are inclusive of applicable taxes and on-road
              charges unless stated otherwise. We reserve the right to correct pricing
              errors and decline orders at our discretion. Payments are processed via
              Razorpay; we do not store your card details.
            </p>

            <h2 className="text-h2 mt-8">Cancellation</h2>
            <p>
              You may cancel a pre-booking within 48 hours of payment for a full refund.
              Orders that have been delivered may be returned only in accordance with
              our <a href="/returns" className="text-[var(--color-brand)] underline">Returns Policy</a>.
            </p>

            <h2 className="text-h2 mt-8">Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, ElectricPe shall not be liable for
              indirect, incidental, or consequential damages arising from your use of our
              services. Our total liability for any claim will not exceed the amount you
              paid us in the 12 months preceding the event giving rise to the claim.
            </p>

            <h2 className="text-h2 mt-8">Intellectual property</h2>
            <p>
              All content on this website — text, images, logos, design system — is the
              property of {globals.legalEntity.name} or its licensors. You may download
              press assets from our <a href="/press" className="text-[var(--color-brand)] underline">Press page</a> for
              editorial use; all other use requires written permission.
            </p>

            <h2 className="text-h2 mt-8">Governing law</h2>
            <p>
              These Terms are governed by the laws of India. Courts in Bengaluru,
              Karnataka have exclusive jurisdiction for any dispute.
            </p>

            <h2 className="text-h2 mt-8">Changes</h2>
            <p>
              We may update these Terms from time to time. Material changes will be
              communicated prominently on the website.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
