import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { globals } from "@/content/globals";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";

export const metadata: Metadata = {
  title: { absolute: "Contact ElectricPe | Phone, WhatsApp, Email, Visit" },
  description:
    "Reach ElectricPe by phone, WhatsApp, email, or walk into any of our 30+ Mobility Centers. HQ in Bengaluru. We answer, really.",
  alternates: { canonical: "/contact-us" },
};

const QUICK = [
  {
    icon: Phone,
    title: "Call us",
    text: globals.supportPhone,
    href: `tel:${globals.supportPhone}`,
    external: false,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "We answer in minutes",
    href: buildWhatsAppLink(WHATSAPP_DEFAULTS.general, "/contact-us"),
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    text: globals.supportEmail,
    href: `mailto:${globals.supportEmail}`,
    external: false,
  },
  {
    icon: MapPin,
    title: "Visit a store",
    text: "30+ Mobility Centers",
    href: "/stores",
    external: false,
  },
];

const DEPARTMENTS: { team: string; email: string; description: string }[] = [
  {
    team: "Sales",
    email: "sales@electricpe.com",
    description: "New purchases, EMI, bulk orders",
  },
  {
    team: "Service",
    email: "service@electricpe.com",
    description: "Issues, warranty, parts, service requests",
  },
  {
    team: "Partnerships",
    email: "partnerships@electricpe.com",
    description: "OEMs, CPOs, dealer franchise, B2B",
  },
  {
    team: "Press",
    email: "press@electricpe.com",
    description: "Media requests, interviews, brand assets",
  },
  {
    team: "Careers",
    email: "careers@electricpe.com",
    description: "Open roles and applications",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-16 md:pt-24 pb-8 bg-[var(--color-surface-muted)]">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">Contact</p>
            <h1 className="text-display-xl">Talk to a real human.</h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)]">
              Pick the channel that suits you. Every route lands at someone trained on
              our product, not a generic call centre.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK.map(({ icon: Icon, title, text, href, external }) => {
              const linkProps = external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};
              const Inner = (
                <Card interactive className="p-5 h-full">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)] mb-3">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="font-display font-bold text-[var(--color-text)]">
                    {title}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">{text}</p>
                </Card>
              );
              if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
                return (
                  <a key={title} href={href} {...linkProps}>
                    {Inner}
                  </a>
                );
              }
              return (
                <Link key={title} href={href}>
                  {Inner}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Send us a message"
              title="We answer every message, fast."
              align="left"
            />
            <ContactForm />
          </div>
          <div>
            <SectionHeader
              eyebrow="Headquarters"
              title="Based in Bengaluru"
              align="left"
            />
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 mb-6">
              <div className="flex items-start gap-3">
                <MapPin
                  className="h-5 w-5 text-[var(--color-brand)] shrink-0 mt-1"
                  aria-hidden
                />
                <address className="not-italic text-[var(--color-text-muted)] leading-relaxed">
                  {globals.legalEntity.name}
                  <br />
                  {globals.hqAddress}
                </address>
              </div>
              <p className="mt-4 text-xs text-[var(--color-text-subtle)]">
                CIN: {globals.legalEntity.cin} · GSTIN:{" "}
                {globals.legalEntity.gstin}
              </p>
            </div>

            <SectionHeader
              eyebrow="Departments"
              title="Direct emails"
              align="left"
            />
            <div className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden">
              <table className="w-full">
                <tbody>
                  {DEPARTMENTS.map((d) => (
                    <tr
                      key={d.team}
                      className="border-b border-[var(--color-border)] last:border-b-0"
                    >
                      <td className="p-4 align-top">
                        <p className="font-semibold text-[var(--color-text)]">
                          {d.team}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {d.description}
                        </p>
                      </td>
                      <td className="p-4 align-top text-right">
                        <a
                          href={`mailto:${d.email}`}
                          className="text-sm text-[var(--color-brand)] hover:underline"
                        >
                          {d.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
