import { NextResponse } from "next/server";
import { savingsReportSchema } from "@/lib/validation/booking";
import { getClientIp, rateLimit } from "@/lib/analytics/rate-limit";
import { postLeadToZoho } from "@/lib/integrations/zoho-crm";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`savings:${ip}`, 3, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = savingsReportSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const input = parsed.data;

  await postLeadToZoho({
    source: "savings-report",
    name: input.email.split("@")[0] ?? "Savings lead",
    phone: "0000000000",
    email: input.email,
    interest: input.scooterVariantSlug,
    notes: `Saves ₹${input.monthlySavingsInr}/mo · ${input.kmPerDay} km/day · ${input.fuelType}`,
    meta: {
      annualSavings: input.annualSavingsInr,
      fuelType: input.fuelType,
      kmPerDay: input.kmPerDay,
    },
  });

  return NextResponse.json({ ok: true });
}
