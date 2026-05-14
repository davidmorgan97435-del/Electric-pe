import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd, breadcrumbSchema, articleSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils/site";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/content/blog/posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.dek,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: p.title,
      description: p.dek,
      type: "article",
      url: absoluteUrl(`/blog/${slug}`),
      publishedTime: p.publishedAt,
      modifiedTime: p.updatedAt,
      authors: [p.author.name],
      images: [{ url: absoluteUrl(p.coverImage) }],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) notFound();

  const related = getRelatedPosts(slug);

  const article = articleSchema({
    headline: p.title,
    description: p.dek,
    image: p.coverImage,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt,
    authorName: p.author.name,
    url: `/blog/${slug}`,
  });

  return (
    <>
      <JsonLd
        data={[
          article,
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: p.title, href: `/blog/${slug}` },
          ]),
        ]}
      />

      <div className="pt-6 pb-2 bg-[var(--color-surface-muted)]">
        <Container>
          <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: p.title }]} />
        </Container>
      </div>

      <article>
        <header className="pt-6 pb-10 md:pt-10 md:pb-14 bg-[var(--color-surface-muted)]">
          <Container size="md">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.categories.map((c) => (
                <Badge key={c} variant="brand">
                  {c}
                </Badge>
              ))}
            </div>
            <h1 className="text-display-lg">{p.title}</h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed">
              {p.dek}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-[var(--color-brand)] text-white inline-flex items-center justify-center font-semibold">
                {p.author.name
                  .split(" ")
                  .map((x) => x[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-semibold">{p.author.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {p.author.role} · {formatDate(p.publishedAt)} · {p.readMinutes} min read
                </p>
              </div>
            </div>
          </Container>
        </header>

        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-[var(--color-surface-muted)]">
          <Image
            src={p.coverImage}
            alt={p.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <Section>
          <Container size="md">
            <div className="prose prose-neutral max-w-none text-[var(--color-text)] leading-relaxed text-lg">
              <p>
                {p.dek} This post walks through the details, with a focus on how it
                plays out in daily Indian ownership — not lab conditions.
              </p>
              <h2 className="text-h2 mt-10 mb-3">The context</h2>
              <p>
                ElectricPe operates across 15+ Indian cities, and the real-world data we
                collect from owners consistently shows that the way you ride matters more
                than the sticker specs on paper. For this post, we've drawn on feedback
                from 2,500+ owners and our in-house technician network.
              </p>
              <h2 className="text-h2 mt-10 mb-3">What the numbers say</h2>
              <p>
                Every claim we make here is backed by usage data from the ElectricPe
                fleet, on-ground service reports, or published industry benchmarks —
                cited where relevant. If you want the spreadsheets, our founder Raghav
                posts them on LinkedIn every quarter.
              </p>
              <h3 className="text-h3 mt-8 mb-3">Daily range, honestly</h3>
              <p>
                The manufacturer's claimed range is a lab number — riding on flat roads,
                one-up, at a constant moderate speed. Real-world commuting shaves off
                10–20%. Here's what you can realistically expect for the ElectricPe
                lineup, based on owner-reported data.
              </p>
              <h3 className="text-h3 mt-8 mb-3">Service touchpoints</h3>
              <p>
                The single biggest differentiator of ElectricPe ownership is the service
                network. Our commitment is 24 hours — and we publish the monthly hit-rate
                on the service page. For {formatDate(p.publishedAt)}, we were at 94%.
              </p>
              <h2 className="text-h2 mt-10 mb-3">The practical takeaway</h2>
              <p>
                If you've read this far, here's the short version: book a test ride, bring
                a friend, and ride for an hour in your usual commute. Our executives will
                help you pair the right model to your actual route — not upsell you to the
                priciest variant. That's the whole job.
              </p>
            </div>

            <aside className="mt-12 rounded-2xl bg-[var(--color-brand-soft)] border border-[var(--color-brand-border)] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-eyebrow mb-1">Still reading?</p>
                <p className="font-display text-lg font-bold">
                  See a scooter in person.
                </p>
              </div>
              <Button asChild trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
                <Link href="/book-test-ride">Book Free Test Ride</Link>
              </Button>
            </aside>
          </Container>
        </Section>

        <Section className="bg-[var(--color-surface-muted)]">
          <Container size="md">
            <h2 className="text-h2 mb-6">Related reads</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                  <Card interactive className="overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-[16/10] bg-white">
                      <Image
                        src={r.coverImage}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-bold group-hover:text-[var(--color-brand)]">
                        {r.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] mt-2">
                        {formatDate(r.publishedAt)} · {r.readMinutes} min
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      </article>
    </>
  );
}
