import { describe, it, expect } from "vitest";
import { computeEmi } from "@/lib/calculators/emi";

describe("computeEmi", () => {
  it("returns zero-interest split when rate is 0", () => {
    const r = computeEmi({
      principal: 60000,
      annualInterestPct: 0,
      tenureMonths: 12,
    });
    expect(r.monthlyEmi).toBe(5000);
    expect(r.totalInterest).toBe(0);
    expect(r.totalPayable).toBe(60000);
  });

  it("computes realistic EMI for a 36-month loan at 11.5%", () => {
    const r = computeEmi({
      principal: 60000,
      annualInterestPct: 11.5,
      tenureMonths: 36,
    });
    // Expected ~1978–1984 range by standard amortization
    expect(r.monthlyEmi).toBeGreaterThan(1950);
    expect(r.monthlyEmi).toBeLessThan(2010);
    expect(r.totalPayable).toBeGreaterThan(60000);
    expect(r.totalInterest).toBeGreaterThan(0);
    expect(r.totalInterest).toBe(r.totalPayable - 60000);
  });

  it("handles edge case of tenure = 1 month", () => {
    const r = computeEmi({
      principal: 10000,
      annualInterestPct: 12,
      tenureMonths: 1,
    });
    expect(r.monthlyEmi).toBeGreaterThanOrEqual(10000);
    expect(r.totalPayable).toBe(r.monthlyEmi);
  });

  it("rejects zero/negative principal gracefully", () => {
    const r = computeEmi({
      principal: 0,
      annualInterestPct: 12,
      tenureMonths: 12,
    });
    expect(r.monthlyEmi).toBe(0);
    expect(r.totalInterest).toBe(0);
  });
});
