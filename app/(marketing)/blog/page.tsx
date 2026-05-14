import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { blogPosts } from "@/content/blog/posts";

const BLOG_DESCRIPTION =
  "Explore ElectricPe blog — EV buying guides, low-speed scooter reviews, charging tips, EMI explainers and ownership stories for Indian riders.";

export const metadata: Metadata = {
  title: { absolute: "EV Scoops — EV Guides & Ownership Stories | ElectricPe" },
  description: BLOG_DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "EV Scoops — EV Guides & Ownership Stories",
    description: BLOG_DESCRIPTION,
    url: absoluteUrl("/blog"),
    type: "website",
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ])}
      />

      <section className="pt-16 md:pt-24 pb-10 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb items={[{ label: "Blog", href: "/blog" }]} className="mb-6" />
          <div className="max-w-3xl">
            <p className="text-eyebrow mb-3">EV SCOOPS</p>
            <h1 className="text-display-xl">
              Guides, ownership stories, and city diaries.
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Written by the ElectricPe team — riders, technicians, founders. No
              SEO-bait. Just useful.
            </p>
          </div>
        </Container>
      </section>

      {featured && (
        <Section className="pb-8">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <Card
              interactive
              className="overflow-hidden grid md:grid-cols-[1.4fr_1fr]"
            >
              <div className="relative aspect-[16/10] md:aspect-auto bg-[var(--color-surface-muted)]">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {featured.categories.map((c) => (
                    <Badge key={c} variant="brand">
                      {c}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-display-lg text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[var(--color-text-muted)]">
                  {featured.dek}
                </p>
                <p className="mt-5 text-sm text-[var(--color-text-subtle)]">
                  {featured.author.name} · {formatDate(featured.publishedAt)} ·{" "}
                  {featured.readMinutes} min read
                </p>
              </div>
            </Card>
          </Link>
        </Section>
      )}

      <Section className="pt-4">
        <SectionHeader
          eyebrow="All posts"
          title="Recently published"
          align="left"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
              <Card interactive className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-[16/10] bg-[var(--color-surface-muted)]">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.categories.map((c) => (
                      <Badge key={c} variant="neutral" size="sm">
                        {c}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--color-text)] leading-snug group-hover:text-[var(--color-brand)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)] line-clamp-2">
                    {p.dek}
                  </p>
                  <p className="mt-auto pt-4 text-xs text-[var(--color-text-subtle)]">
                    {formatDate(p.publishedAt)} · {p.readMinutes} min read
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
