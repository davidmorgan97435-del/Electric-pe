export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://electricpe.com",
  name: "ElectricPe",
  legalName: "Wattapp Technologies Pvt. Ltd.",
  tagline: "India's largest trusted EV retail network",
  description:
    "Affordable electric scooters from Xypro, Jett & 4ALL. 30+ Mobility Centers, 24-hour service, component-level warranty. No licence required. Book a free test ride today.",
  twitter: "@GoElectricPe",
  locale: "en_IN",
  themeColor: "#039855",
} as const;

/**
 * Build the full URL for a given relative path,
 * stripping a leading slash so we don't end up with //.
 */
export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
