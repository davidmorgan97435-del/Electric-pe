import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, Briefcase } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { jobPostings, getJobPosting } from "@/content/careers";
import { JsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { globals } from "@/content/globals";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return jobPostings.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const j = getJobPosting(slug);
  if (!j) return {};
  return {
    title: `${j.title} | Careers`,
    description: j.descriptionMdx.slice(0, 160),
    alternates: { canonical: `/careers/${slug}` },
  };
}

const DEPT_LABEL: Record<string, string> = {
  retail: "Retail",
  service: "Service",
  tech: "Tech",
  marketing: "Marketing",
  operations: "Operations",
  hr: "People",
};

const TYPE_LABEL: Record<string, string> = {
  FT: "Full-time",
  PT: "Part-time",
  Intern: "Internship",
  Contract: "Contract",
};

export default async function JobDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const j = getJobPosting(slug);
  if (!j) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description: j.descriptionMdx,
    datePosted: j.publishedAt,
    validThrough: j.closingAt,
    employmentType: j.type === "FT" ? "FULL_TIME" : "PART_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "ElectricPe",
      sameAs: "https://electricpe.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: j.city,
        addressCountry: "IN",
      },
    },
    url: absoluteUrl(`/careers/${slug}`),
  };

  return (
    <>
      <JsonLd data={schema} />

      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb
            items={[
              { label: "Careers", href: "/careers" },
              { label: j.title },
            ]}
          />
        </Container>
      </div>

      <section className="py-12 md:py-16 bg-[var(--color-surface-muted)]">
        <Container size="md">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="brand">{DEPT_LABEL[j.department] ?? j.department}</Badge>
            <Badge
              variant="neutral"
              className="inline-flex items-center gap-1"
            >
              <MapPin className="h-3 w-3" aria-hidden />
              {j.city}
            </Badge>
            <Badge
              variant="neutral"
              className="inline-flex items-center gap-1"
            >
              <Briefcase className="h-3 w-3" aria-hidden />
              {TYPE_LABEL[j.type] ?? j.type}
            </Badge>
          </div>
          <h1 className="text-display-lg">{j.title}</h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
            {j.descriptionMdx}
          </p>
        </Container>
      </section>

      <Section>
        <Container size="md">
          <div className="space-y-10">
            <section>
              <h2 className="text-h2 mb-4">Responsibilities</h2>
              <ul className="space-y-2">
                {j.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-[var(--color-text)]">
                    <CheckCircle2
                      className="h-5 w-5 text-[var(--color-brand)] shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-h2 mb-4">What we're looking for</h2>
              <ul className="space-y-2">
                {j.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-[var(--color-text)]">
                    <CheckCircle2
                      className="h-5 w-5 text-[var(--color-brand)] shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            {j.niceToHave && j.niceToHave.length > 0 && (
              <section>
                <h2 className="text-h2 mb-4">Nice to have</h2>
                <ul className="space-y-2">
                  {j.niceToHave.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2 text-[var(--color-text-muted)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-text-subtle)]" />
                      {r}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Card className="p-8 bg-[var(--color-brand-soft)] border-[var(--color-brand-border)]">
              <h2 className="text-h2 mb-2">Apply now</h2>
              <p className="text-[var(--color-text-muted)] mb-6">
                Send your resume + a short note about why this role fits to{" "}
                <a
                  href={`mailto:careers@electricpe.com?subject=${encodeURIComponent(`Application for ${j.title}`)}`}
                  className="text-[var(--color-brand)] underline"
                >
                  careers@electricpe.com
                </a>
                . We reply to every applicant within a week.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <a
                    href={`mailto:careers@electricpe.com?subject=${encodeURIComponent(`Application for ${j.title}`)}`}
                  >
                    Email your application
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`tel:${globals.supportPhone}`}>
                    Call {globals.supportPhone}
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
