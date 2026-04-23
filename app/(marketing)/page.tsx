import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { ServicePromise } from "@/components/marketing/service-promise";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { GreenerTomorrow } from "@/components/marketing/greener-tomorrow";
import { SavingsCalculatorHome } from "@/components/marketing/savings-calculator";
import { StorePresence } from "@/components/marketing/store-presence";
import { Testimonials } from "@/components/marketing/testimonials";
import { VsPetrol } from "@/components/marketing/vs-petrol";
import { FinanceStrip } from "@/components/marketing/finance-strip";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "ElectricPe — Electric Scooters, Chargers & 30+ Stores Across India",
  description:
    "Buy low-speed electric scooters from Xypro, Jett, EP & 4ALL. 30+ Mobility Centers, 24-hour service, 3-year warranty. Book a free test ride today.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* HP-01 Hero */}
      <Hero />

      {/* HP-02 Service Promise — why ElectricPe */}
      <ServicePromise />

      {/* HP-03 Product Showcase */}
      <ProductShowcase />

      {/* HP-03.5 Greener Tomorrow — sustainability impact band */}
      <GreenerTomorrow />

      {/* HP-04 Savings Calculator */}
      <SavingsCalculatorHome />

      {/* HP-05 Store Presence */}
      <StorePresence />

      {/* HP-06 Testimonials */}
      <Testimonials />

      {/* HP-07 vs Petrol */}
      <VsPetrol />

      {/* HP-08 EMI + Finance */}
      <FinanceStrip />

      {/* HP-09 Final CTA */}
      <FinalCta />
    </>
  );
}
