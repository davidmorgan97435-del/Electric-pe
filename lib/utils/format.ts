/**
 * Indian-locale money formatter.
 * formatInr(129999) -> "₹1,29,999"
 */
const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatInr(value: number): string {
  return inrFormatter.format(Math.max(0, Math.round(value)));
}

const numberFormatter = new Intl.NumberFormat("en-IN");

export function formatNumber(value: number): string {
  return numberFormatter.format(Math.round(value));
}

export function formatInrShort(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return formatInr(value);
}
