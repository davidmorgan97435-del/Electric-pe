import { z } from "zod";

/**
 * Indian mobile number - 10 digits, optionally prefixed with +91 or 91.
 * We normalise to the 10-digit form on successful parse.
 */
const indianPhoneSchema = z
  .string()
  .trim()
  .regex(/^(?:\+?91)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
  .transform((v) => v.replace(/^(\+?91)/, ""));

const nameSchema = z
  .string()
  .trim()
  .min(2, "Please enter your full name")
  .max(80, "Name is too long");

const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address")
  .max(120);

const consentSchema = z
  .boolean()
  .refine((v) => v === true, "Please accept the terms to continue");

const citySlugSchema = z.string().min(2).max(40);
const storeSlugSchema = z.string().min(2).max(80);
const modelSlugSchema = z.string().min(2).max(80);

/** POST /api/book-test-ride */
export const bookTestRideSchema = z.object({
  name: nameSchema,
  phone: indianPhoneSchema,
  email: emailSchema.optional().or(z.literal("")),
  city: citySlugSchema,
  model: modelSlugSchema.optional(),
  storeSlug: storeSlugSchema.optional(),
  preferredDate: z.string().min(1, "Pick a date"),
  preferredSlot: z.enum(["morning", "afternoon", "evening"]),
  currentlyRides: z.enum(["petrol", "ev", "none"]),
  consent: consentSchema,
  source: z.string().max(80).optional(),
  utm: z
    .object({
      source: z.string().max(40).optional(),
      medium: z.string().max(40).optional(),
      campaign: z.string().max(80).optional(),
    })
    .optional(),
  captchaToken: z.string().optional(),
});
export type BookTestRideInput = z.infer<typeof bookTestRideSchema>;

/** POST /api/contact */
export const contactSchema = z.object({
  name: nameSchema,
  phone: indianPhoneSchema,
  email: emailSchema,
  topic: z.enum(["sales", "service", "partnership", "press", "other"]),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
  consent: consentSchema,
  captchaToken: z.string().optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

/** POST /api/newsletter */
export const newsletterSchema = z.object({
  email: emailSchema,
  source: z.string().max(40).optional(),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** POST /api/service-request */
export const serviceRequestSchema = z.object({
  name: nameSchema,
  phone: indianPhoneSchema,
  email: emailSchema.optional().or(z.literal("")),
  modelSlug: modelSlugSchema,
  vinOrReg: z.string().trim().max(40).optional().or(z.literal("")),
  issueType: z.enum([
    "battery",
    "motor",
    "brakes",
    "tyres",
    "electrical",
    "software",
    "cosmetic",
    "other",
  ]),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  city: citySlugSchema,
  consent: consentSchema,
  captchaToken: z.string().optional(),
});
export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;

/** POST /api/savings-report */
export const savingsReportSchema = z.object({
  email: emailSchema,
  kmPerDay: z.number().int().min(1).max(500),
  fuelType: z.enum(["petrol", "cng", "diesel"]),
  currentMileage: z.number().positive().max(100),
  fuelPrice: z.number().positive().max(500),
  scooterVariantSlug: z.string().max(80),
  electricityRate: z.number().positive().max(50),
  monthlySavingsInr: z.number().nonnegative(),
  annualSavingsInr: z.number().nonnegative(),
  captchaToken: z.string().optional(),
});
export type SavingsReportInput = z.infer<typeof savingsReportSchema>;

/** POST /api/partnership-lead */
export const partnershipLeadSchema = z.object({
  type: z.enum(["ev-oem", "charger-oem", "cpo", "cms", "store-franchise", "general"]),
  companyName: z.string().trim().min(2).max(120),
  contactName: nameSchema,
  role: z.string().trim().max(80).optional(),
  phone: indianPhoneSchema,
  email: emailSchema,
  message: z.string().trim().max(2000).optional(),
  extra: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  consent: consentSchema,
  captchaToken: z.string().optional(),
});
export type PartnershipLeadInput = z.infer<typeof partnershipLeadSchema>;

/** POST /api/careers-apply */
export const careersApplySchema = z.object({
  jobSlug: z.string().min(2).max(80),
  name: nameSchema,
  email: emailSchema,
  phone: indianPhoneSchema,
  resumeUrl: z.string().url("Please share a link to your resume (Drive, LinkedIn, etc.)"),
  coverNote: z.string().trim().max(2000).optional(),
  consent: consentSchema,
  captchaToken: z.string().optional(),
});
export type CareersApplyInput = z.infer<typeof careersApplySchema>;
