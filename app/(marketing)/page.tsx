import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { ServicePromise } from "@/components/marketing/service-promise";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { SavingsCalculatorHome } from "@/components/marketing/savings-calculator";
import { VsPetrol } from "@/components/marketing/vs-petrol";
import { StorePresence } from "@/components/marketing/store-presence";
import { Testimonials } from "@/components/marketing/testimonials";
import { FinalCta } from "@/components/marketing/final-cta";
import { JsonLd, localBusinessSchema } from "@/lib/seo/jsonld";
import { HomepageNap } from "@/components/marketing/homepage-nap";

/**
 * Homepage - final composition after client feedback round 2.
 *
 * Removed: GreenerTomorrow sustainability band (#8), FinanceStrip EMI strip
 * (#11). Reordered: VsPetrol now sits immediately under SavingsCalculator
 * (#9) so the rupee-figure → comparison sequence reads as one money story.
 */

export const metadata: Metadata = {
  title: {
    absolute:
      "ElectricPe | Affordable Electric Scooters & Mobility Centers India",
  },
  description:
    "Reliable, easy-to-ride EV scooters with trusted service and stores near you. No licence required, low running cost. Book a free test ride today.",
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/" },
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />

      {/* HP-01 Hero */}
      <Hero />

      {/* HP-02 Service Promise */}
      <ServicePromise />

      {/* HP-03 Product Showcase - 2 featured brands (Xypro, Jett) */}
      <ProductShowcase />

      {/* HP-04 Savings Calculator */}
      <SavingsCalculatorHome />

      {/* HP-05 vs Petrol - sits right under the savings calc per feedback #9 */}
      <VsPetrol />

      {/* HP-06 Store Presence */}
      <StorePresence />

      {/* HP-07 Testimonials */}
      <Testimonials />

      {/* HP-08 Final CTA */}
      <FinalCta />

      {/* NAP block - keeps Name/Address/Phone in the homepage HTML so
          crawlers can pick up local-business signals without parsing the
          footer. Also surfaces the Bengaluru HQ for visitors. */}
      <HomepageNap />
    </>
  );
}
