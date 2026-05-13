"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, MapPin, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { globals } from "@/content/globals";
import { scooters } from "@/content/scooters";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";

type NavItem = { label: string; href: string };

const PRIMARY_NAV: NavItem[] = [
  { label: "Scooters", href: "/ev" },
  { label: "Stores", href: "/stores" },
  { label: "Service", href: "/service" },
  { label: "App", href: "/app" },
  { label: "Blog", href: "/blog" },
];

const BRANDS = [
  {
    slug: "xypro",
    name: "Xypro",
    tagline: "Long-range lithium commuter",
  },
  { slug: "jett", name: "Jett", tagline: "Family-first, comfort-first" },
  { slug: "ep", name: "EP", tagline: "Most affordable daily rider" },
  { slug: "4all", name: "4ALL", tagline: "No-licence, no-hassle EV" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [brandMenuOpen, setBrandMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-[var(--z-sticky)]",
        "transition-all duration-[var(--duration-base)]",
        scrolled
          ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-[var(--shadow-sm)]"
          : "bg-white",
      )}
    >
      <div className="container-page">
        <div className="flex h-16 md:h-[72px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="ElectricPe home"
          >
            <Image
              src="/img/eplogo-horiz.webp"
              alt="ElectricPe"
              width={333}
              height={69}
              priority
              className="h-8 md:h-9 w-auto"
            />
          </Link>

          {/* Primary nav (desktop) */}
          <nav
            className="hidden lg:flex items-center gap-0.5 xl:gap-1"
            aria-label="Primary"
          >
            <div
              className="relative"
              onMouseEnter={() => setBrandMenuOpen(true)}
              onMouseLeave={() => setBrandMenuOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap text-[var(--color-text)] hover:text-[var(--color-brand)] hover:bg-[var(--color-surface-muted)] transition-colors"
                aria-expanded={brandMenuOpen}
                aria-haspopup="true"
                onClick={() => setBrandMenuOpen((o) => !o)}
              >
                Scooters
                <ChevronDown className="h-4 w-4" aria-hidden />
              </button>
              {brandMenuOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-[640px]"
                  role="menu"
                >
                  <div className="rounded-2xl bg-white border border-[var(--color-border)] shadow-[var(--shadow-xl)] p-6 grid grid-cols-2 gap-3">
                    {BRANDS.map((b) => {
                      const flagship = scooters.find(
                        (s) => s.brand === b.slug && s.variantSlug === "lithium-ion",
                      );
                      return (
                        <Link
                          key={b.slug}
                          href={`/ev/${b.slug}`}
                          className="group flex flex-col gap-1 rounded-lg p-4 hover:bg-[var(--color-surface-muted)] transition-colors"
                          role="menuitem"
                        >
                          <span className="font-display text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-brand)]">
                            {b.name}
                          </span>
                          <span className="text-sm text-[var(--color-text-muted)]">
                            {b.tagline}
                          </span>
                          {flagship && (
                            <span className="text-xs font-medium text-[var(--color-brand)] mt-1">
                              From ₹{flagship.emiFrom}/month
                            </span>
                          )}
                        </Link>
                      );
                    })}
                    <Link
                      href="/ev"
                      className="col-span-2 flex items-center justify-between rounded-lg p-4 bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] font-semibold hover:bg-[var(--color-brand-soft-hover)] transition-colors"
                    >
                      View all scooters
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {PRIMARY_NAV.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2.5 xl:px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap text-[var(--color-text)] hover:text-[var(--color-brand)] hover:bg-[var(--color-surface-muted)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${globals.supportPhone}`}
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-brand)] px-2"
              aria-label={`Call ElectricPe at ${globals.supportPhone}`}
            >
              <Phone className="h-4 w-4" aria-hidden />
              <span className="hidden xl:inline">{globals.supportPhone}</span>
            </a>

            <Button
              asChild
              size="md"
              className="hidden md:inline-flex"
            >
              <Link href="/book-test-ride">Book Free Test Ride</Link>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -mr-2 rounded-md hover:bg-[var(--color-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
              <Image
                src="/img/eplogo-horiz.webp"
                alt="ElectricPe"
                width={333}
                height={69}
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md hover:bg-[var(--color-surface-muted)]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-1" aria-label="Primary mobile">
              <Link
                href="/stores"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]"
              >
                <MapPin className="h-4 w-4" aria-hidden />
                Find your nearest store
              </Link>

              <div className="h-px bg-[var(--color-border)] my-2" />

              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 rounded-lg font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-[var(--color-border)] flex flex-col gap-2">
              <Button
                asChild
                fullWidth
                size="lg"
                onClick={() => setMobileOpen(false)}
              >
                <Link href="/book-test-ride">Book Free Test Ride</Link>
              </Button>
              <Button
                asChild
                variant="whatsapp"
                fullWidth
                size="lg"
              >
                <a
                  href={buildWhatsAppLink(WHATSAPP_DEFAULTS.general, "Mobile menu")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
              <a
                href={`tel:${globals.supportPhone}`}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[var(--color-text)] py-2"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {globals.supportPhone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
