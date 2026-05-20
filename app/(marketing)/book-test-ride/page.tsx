import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { BookTestRideForm } from "@/components/forms/book-test-ride-form";

export const metadata: Metadata = {
  title: "Book a Free Test Ride",
  description:
    "Reserve a free test ride at your nearest ElectricPe Mobility Center or request a home drop-off. We'll confirm on WhatsApp within the hour.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/book-test-ride" },
};

type SearchParams = { model?: string; city?: string; store?: string };

export default async function BookTestRidePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-eyebrow mb-3">Book a test ride</p>
        <h1 className="text-display-lg">
          Free test ride, doorstep or at our store.
        </h1>
        <p className="mt-4 text-[var(--color-text-muted)]">
          Four short steps. We confirm on WhatsApp within the hour. No commitment,
          no deposit required.
        </p>
      </div>
      <BookTestRideForm
        initialModel={sp.model ?? ""}
        initialCity={sp.city ?? ""}
        initialStore={sp.store ?? ""}
      />
    </Section>
  );
}
