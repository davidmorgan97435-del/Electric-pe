/**
 * Fuel-savings + payback calculator.
 *
 * Pure, deterministic, unit-testable. Inputs and outputs are both in
 * rupees / kilometers so UI can render without further transform.
 *
 * CO₂ factor: 2.31 kg per litre of petrol (IPCC-consistent).
 * Electricity carbon intensity is ignored for monthly output
 * because Indian grid carbon is improving annually - we quote
 * tailpipe emissions avoided, which is the rider-facing number.
 */

export type FuelType = "petrol" | "cng" | "diesel";

export type SavingsInput = {
  /** km the rider covers per day */
  kmPerDay: number;
  /** kilometers the current ICE vehicle does per litre (petrol) or kg (CNG) */
  currentMileage: number;
  /** price per litre of current fuel (₹/L) or per kg (₹/kg for CNG) */
  fuelPrice: number;
  /** fuel type of current vehicle */
  fuelType: FuelType;
  /** Wh the scooter consumes per km (100 km on 1.8 kWh battery ≈ 18 Wh/km) */
  scooterWhPerKm: number;
  /** electricity tariff (₹/kWh) */
  electricityRate: number;
  /** purchase price of the new EV (₹) - used for payback calculation */
  evOnRoadPrice: number;
  /** optional current vehicle resale / exchange value to subtract */
  currentVehicleResale?: number;
  /** operating days per month - default 30 */
  daysPerMonth?: number;
};

export type SavingsOutput = {
  /** ₹ spent per month on current fuel */
  currentFuelMonthlyInr: number;
  /** ₹ spent per month on electricity */
  evElectricityMonthlyInr: number;
  /** ₹ saved per month */
  monthlySavingsInr: number;
  /** ₹ saved per year */
  annualSavingsInr: number;
  /** ₹ saved over 5 years */
  fiveYearSavingsInr: number;
  /** months to recover the EV price (net of ICE resale) */
  paybackMonths: number;
  /** kg of CO₂ avoided per year */
  co2SavedKgPerYear: number;
};

const CO2_KG_PER_LITRE_PETROL = 2.31;
const CO2_KG_PER_KG_CNG = 2.75;
const CO2_KG_PER_LITRE_DIESEL = 2.68;

export function computeSavings(input: SavingsInput): SavingsOutput {
  const daysPerMonth = input.daysPerMonth ?? 30;

  const kmPerMonth = Math.max(0, input.kmPerDay) * daysPerMonth;
  const kmPerYear = kmPerMonth * 12;

  // ICE cost per month
  const mileage = Math.max(1, input.currentMileage);
  const fuelUnitsPerMonth = kmPerMonth / mileage;
  const currentFuelMonthlyInr = fuelUnitsPerMonth * Math.max(0, input.fuelPrice);

  // EV cost per month
  const kwhPerMonth = (kmPerMonth * input.scooterWhPerKm) / 1000;
  const evElectricityMonthlyInr = kwhPerMonth * Math.max(0, input.electricityRate);

  const monthlySavingsInr = Math.max(
    0,
    currentFuelMonthlyInr - evElectricityMonthlyInr,
  );
  const annualSavingsInr = monthlySavingsInr * 12;
  const fiveYearSavingsInr = annualSavingsInr * 5;

  // Payback
  const netEvCost = Math.max(
    0,
    input.evOnRoadPrice - (input.currentVehicleResale ?? 0),
  );
  const paybackMonths =
    monthlySavingsInr > 0
      ? Math.ceil(netEvCost / monthlySavingsInr)
      : Number.POSITIVE_INFINITY;

  // CO₂
  const fuelUnitsPerYear = fuelUnitsPerMonth * 12;
  let co2PerUnit = CO2_KG_PER_LITRE_PETROL;
  if (input.fuelType === "cng") co2PerUnit = CO2_KG_PER_KG_CNG;
  if (input.fuelType === "diesel") co2PerUnit = CO2_KG_PER_LITRE_DIESEL;
  const co2SavedKgPerYear = fuelUnitsPerYear * co2PerUnit;

  return {
    currentFuelMonthlyInr: Math.round(currentFuelMonthlyInr),
    evElectricityMonthlyInr: Math.round(evElectricityMonthlyInr),
    monthlySavingsInr: Math.round(monthlySavingsInr),
    annualSavingsInr: Math.round(annualSavingsInr),
    fiveYearSavingsInr: Math.round(fiveYearSavingsInr),
    paybackMonths: Number.isFinite(paybackMonths) ? paybackMonths : 0,
    co2SavedKgPerYear: Math.round(co2SavedKgPerYear),
  };
}
