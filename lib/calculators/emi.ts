/**
 * Equated Monthly Installment calculator.
 * Formula: EMI = P * r * (1 + r)^n / ((1 + r)^n − 1)
 *   P = principal, r = monthly rate (annual%/12/100), n = months
 */

export type EmiInput = {
  principal: number;
  annualInterestPct: number;
  tenureMonths: number;
};

export type EmiOutput = {
  monthlyEmi: number;
  totalPayable: number;
  totalInterest: number;
};

export function computeEmi(input: EmiInput): EmiOutput {
  const principal = Math.max(0, input.principal);
  const n = Math.max(1, Math.round(input.tenureMonths));
  const r = Math.max(0, input.annualInterestPct) / 12 / 100;

  if (r === 0) {
    const monthlyEmi = principal / n;
    return {
      monthlyEmi: Math.round(monthlyEmi),
      totalPayable: Math.round(principal),
      totalInterest: 0,
    };
  }

  const pow = Math.pow(1 + r, n);
  const monthlyEmi = (principal * r * pow) / (pow - 1);
  const totalPayable = monthlyEmi * n;

  return {
    monthlyEmi: Math.round(monthlyEmi),
    totalPayable: Math.round(totalPayable),
    totalInterest: Math.round(totalPayable - principal),
  };
}
