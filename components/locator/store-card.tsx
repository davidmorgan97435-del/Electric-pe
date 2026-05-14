import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Navigation2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { getCity } from "@/content/cities";
import type { Store } from "@/content/types";

// TODO: replace with real per-store photos once shoot is delivered.
// Deterministic rotation so adjacent store cards never share the same image.
const STORE_IMAGE_ROTATION = [
  "/img/xypro_brand_banner.webp",
  "/img/ep_brand_banner.webp",
  "/img/4all_brand_banner.webp",
  "/img/jett_brand_banner.webp",
  "/img/scenes/greener-tomorrow.webp",
] as const;
const PLACEHOLDER_PHOTO = "/img/home_hero_section_2.webp";

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickStoreImage(photo: string | undefined, slug: string): string {
  if (photo && photo !== PLACEHOLDER_PHOTO) return photo;
  return STORE_IMAGE_ROTATION[hashSlug(slug) % STORE_IMAGE_ROTATION.length]!;
}

const SERVICE_LABEL: Record<string, string> = {
  sales: "Sales",
  service: "Service",
  testRides: "Test Rides",
  charging: "Charging",
};

export function StoreCard({ store }: { store: Store }) {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
  const wa = buildWhatsAppLink(
    `Hi! I want to visit the ${store.name}.`,
    `store ${store.slug}`,
  );
  const photo = pickStoreImage(store.photos[0], store.slug);
  const cityName = getCity(store.cityId)?.name ?? store.cityId;
  const imageAlt = `ElectricPe Mobility Center — ${store.name.replace(/^ElectricPe\s+/, "")}, ${cityName}`;

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[16/9] bg-[var(--color-surface-muted)]">
        <Image
          src={photo}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-display font-bold text-[var(--color-text)]">
            {store.name}
          </h3>
          {store.isComingSoon && <Badge variant="warning">Opening soon</Badge>}
        </div>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          {store.address}, {store.pincode}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {store.services.map((s) => (
            <Badge key={s} variant="brand">
              {SERVICE_LABEL[s] ?? s}
            </Badge>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--color-text-subtle)]">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          Mon–Sat 10:00–20:00 · Sun 10:00–18:00
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="sm" leadingIcon={<Navigation2 className="h-3.5 w-3.5" aria-hidden />}>
            <a href={directions} target="_blank" rel="noopener noreferrer">
              Directions
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href={`/book-test-ride?store=${store.slug}`}>Test Ride</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" leadingIcon={<Phone className="h-3.5 w-3.5" aria-hidden />}>
            <a href={`tel:${store.phone}`}>Call</a>
          </Button>
          <Button asChild variant="ghost" size="sm" leadingIcon={<MessageCircle className="h-3.5 w-3.5" aria-hidden />}>
            <a href={wa} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
