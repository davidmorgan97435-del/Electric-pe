import { describe, it, expect } from "vitest";
import {
  bookTestRideSchema,
  contactSchema,
  newsletterSchema,
} from "@/lib/validation/booking";

describe("bookTestRideSchema", () => {
  const valid = {
    name: "Priya Sharma",
    phone: "9876543210",
    email: "priya@example.com",
    city: "bengaluru",
    model: "xypro-lithium-ion",
    preferredDate: "2026-05-03",
    preferredSlot: "morning",
    currentlyRides: "petrol",
    consent: true,
  };

  it("accepts a valid payload", () => {
    const r = bookTestRideSchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it("strips +91 prefix", () => {
    const r = bookTestRideSchema.safeParse({ ...valid, phone: "+919876543210" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.phone).toBe("9876543210");
  });

  it("rejects a short name", () => {
    const r = bookTestRideSchema.safeParse({ ...valid, name: "A" });
    expect(r.success).toBe(false);
  });

  it("rejects an invalid Indian phone", () => {
    const r = bookTestRideSchema.safeParse({ ...valid, phone: "1234567890" });
    expect(r.success).toBe(false);
  });

  it("requires consent", () => {
    const r = bookTestRideSchema.safeParse({ ...valid, consent: false });
    expect(r.success).toBe(false);
  });
});

describe("contactSchema", () => {
  it("accepts a valid payload with message", () => {
    const r = contactSchema.safeParse({
      name: "Kiran",
      phone: "9876543210",
      email: "kiran@example.com",
      topic: "sales",
      message: "I want to know about the Xypro and EMI",
      consent: true,
    });
    expect(r.success).toBe(true);
  });

  it("rejects too-short messages", () => {
    const r = contactSchema.safeParse({
      name: "Kiran",
      phone: "9876543210",
      email: "kiran@example.com",
      topic: "sales",
      message: "hi",
      consent: true,
    });
    expect(r.success).toBe(false);
  });
});

describe("newsletterSchema", () => {
  it("accepts a valid email", () => {
    const r = newsletterSchema.safeParse({ email: "hello@example.com" });
    expect(r.success).toBe(true);
  });
  it("rejects garbage email", () => {
    const r = newsletterSchema.safeParse({ email: "nope" });
    expect(r.success).toBe(false);
  });
});
