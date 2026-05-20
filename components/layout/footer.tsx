import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Facebook, Linkedin, Twitter, MapPin } from "lucide-react";
import { globals } from "@/content/globals";
import { Container } from "@/components/ui/container";
import { stores } from "@/content/stores";

const FOOTER_LINKS = {
  Shop: [
    { label: "All Scooters", href: "/ev" },
    { label: "Xypro", href: "/ev/xypro" },
    { label: "Jett", href: "/ev/jett" },
    { label: "4ALL", href: "/ev/4all" },
    { label: "Chargers", href: "/charger" },
    { label: "EMI Calculator", href: "/emi" },
    { label: "Savings Calculator", href: "/savings" },
  ],
  Ownership: [
    { label: "Service Promise", href: "/service" },
    { label: "Warranty", href: "/warranty" },
    { label: "Returns", href: "/returns" },
    { label: "Book Test Ride", href: "/book-test-ride" },
    { label: "Raise Service Request", href: "/service#request" },
  ],
  Network: [
    { label: "Store Locator", href: "/stores" },
    { label: "Charging Stations", href: "/ev-charging-stations" },
    { label: "Download App", href: "/app" },
  ],
  Company: [
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact-us" },
    { label: "Partnerships", href: "/partnerships" },
  ],
};

const SOCIAL = [
  { name: "Instagram", href: globals.social.instagram, Icon: Instagram },
  { name: "YouTube", href: globals.social.youtube, Icon: Youtube },
  { name: "Facebook", href: globals.social.facebook, Icon: Facebook },
  { name: "LinkedIn", href: globals.social.linkedin, Icon: Linkedin },
  { name: "Twitter", href: globals.social.twitter, Icon: Twitter },
];

export function Footer() {
  const serviceCities = Array.from(new Set(stores.map((s) => s.cityId)));

  return (
    <footer className="bg-[var(--color-surface-sunken)] border-t border-[var(--color-border)] pt-16 pb-10">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4" aria-label="ElectricPe home">
              <Image
                src="/img/eplogo-horiz.webp"
                alt="ElectricPe"
                width={333}
                height={69}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
              India's largest trusted EV retail network: 30+ Mobility Centers,
              24-hour service, and component-level warranty on every scooter.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-brand)] hover:border-[var(--color-brand)] transition-colors"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {(Object.keys(FOOTER_LINKS) as Array<keyof typeof FOOTER_LINKS>).map(
            (col) => (
              <div key={col}>
                <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4 uppercase tracking-wider">
                  {col}
                </h3>
                <ul className="space-y-2.5">
                  {FOOTER_LINKS[col].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>

        {/* Service centres on every page - per PDF requirement */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <div className="flex items-start gap-3 flex-wrap">
            <MapPin className="h-5 w-5 text-[var(--color-brand)] shrink-0 mt-0.5" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2">
                Service Centres
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {serviceCities.map((city, i) => (
                  <React.Fragment key={city}>
                    <Link
                      href={`/stores/${city}`}
                      className="hover:text-[var(--color-brand)] capitalize"
                    >
                      {city.replace(/-/g, " ")}
                    </Link>
                    {i < serviceCities.length - 1 && (
                      <span aria-hidden> · </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Legal strip */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            <p className="font-medium text-[var(--color-text)]">
              © {new Date().getFullYear()} {globals.legalEntity.name}
            </p>
            <p>CIN: {globals.legalEntity.cin} · GSTIN: {globals.legalEntity.gstin}</p>
            <p>{globals.hqAddress}</p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--color-text-muted)]">
            <li>
              <Link href="/privacy" className="hover:text-[var(--color-brand)]">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[var(--color-brand)]">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-[var(--color-brand)]">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/warranty" className="hover:text-[var(--color-brand)]">
                Warranty
              </Link>
            </li>
            <li>Made in India 🇮🇳</li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
