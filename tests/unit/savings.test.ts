import { describe, it, expect } from "vitest";
import { computeSavings } from "@/lib/calculators/savings";

describe("computeSavings", () => {
  it("returns zero savings when km per day is zero", () => {
    const r = computeSavings({
      kmPerDay: 0,
      currentMileage: 45,
      fuelPrice: 103,
      fuelType: "petrol",
      scooterWhPerKm: 18,
      electricityRate: 7.5,
      evOnRoadPrice: 64999,
    });
    expect(r.monthlySavingsInr).toBe(0);
    expect(r.annualSavingsInr).toBe(0);
  });

  it("computes positive savings for a typical commuter", () => {
    const r = computeSavings({
      kmPerDay: 25,
      currentMileage: 45,
      fuelPrice: 103,
      fuelType: "petrol",
      scooterWhPerKm: 18,
      electricityRate: 7.5,
      evOnRoadPrice: 64999,
    });
    expect(r.monthlySavingsInr).toBeGreaterThan(1000);
    expect(r.annualSavingsInr).toBe(r.monthlySavingsInr * 12);
    expect(r.fiveYearSavingsInr).toBe(r.annualSavingsInr * 5);
    expect(r.paybackMonths).toBeGreaterThan(0);
    expect(r.co2SavedKgPerYear).toBeGreaterThan(0);
  });

  it("handles CNG fuel correctly", () => {
    const petrol = computeSavings({
      kmPerDay: 30,
      currentMileage: 45,
      fuelPrice: 103,
      fuelType: "petrol",
      scooterWhPerKm: 18,
      electricityRate: 7.5,
      evOnRoadPrice: 64999,
    });
    const cng = computeSavings({
      kmPerDay: 30,
      currentMileage: 30,
      fuelPrice: 75,
      fuelType: "cng",
      scooterWhPerKm: 18,
      electricityRate: 7.5,
      evOnRoadPrice: 64999,
    });
    // Both positive; CO₂ factors differ, so CO₂ saved should differ
    expect(petrol.monthlySavingsInr).toBeGreaterThan(0);
    expect(cng.monthlySavingsInr).toBeGreaterThan(0);
    expect(petrol.co2SavedKgPerYear).not.toBe(cng.co2SavedKgPerYear);
  });

  it("never returns negative savings", () => {
    // Degenerate case: very cheap fuel + very expensive electricity
    const r = computeSavings({
      kmPerDay: 25,
      currentMileage: 100,
      fuelPrice: 1,
      fuelType: "petrol",
      scooterWhPerKm: 18,
      electricityRate: 50,
      evOnRoadPrice: 64999,
    });
    expect(r.monthlySavingsInr).toBeGreaterThanOrEqual(0);
  });
});
