import Link from "next/link";
import { ArrowLeft, Home, Calendar, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { globals } from "@/content/globals";

export default function NotFound() {
  return (
    <main id="main" className="min-h-[80vh] flex items-center">
      <Container>
        <div className="max-w-xl mx-auto text-center py-20">
          <p className="text-eyebrow">404</p>
          <h1 className="mt-3 text-display-lg font-display text-[var(--color-text)]">
            This page took a wrong turn.
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            The link you followed might be broken, or the page may have moved.
            Here's how to get back on track.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            <Button asChild size="lg" leadingIcon={<Home className="h-4 w-4" aria-hidden />}>
              <Link href="/">Go to homepage</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              leadingIcon={<Calendar className="h-4 w-4" aria-hidden />}
            >
              <Link href="/book-test-ride">Book a test ride</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              leadingIcon={<MapPin className="h-4 w-4" aria-hidden />}
            >
              <Link href="/stores">Find a store</Link>
            </Button>
            <Button asChild size="lg" variant="outline" leadingIcon={<Phone className="h-4 w-4" aria-hidden />}>
              <a href={`tel:${globals.supportPhone}`}>Call us</a>
            </Button>
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-brand)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to safety
          </Link>
        </div>
      </Container>
    </main>
  );
}
