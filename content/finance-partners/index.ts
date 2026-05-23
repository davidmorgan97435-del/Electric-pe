import type { FinancePartner } from "../types";

const PAN_INDIA_CITY_IDS = [
  "agra",
  "aligarh",
  "alwar",
  "belagavi",
  "bengaluru",
  "davanagere",
  "delhi",
  "dharwad",
  "ghaziabad",
  "gurugram",
  "hassan",
  "hubballi",
  "jaipur",
  "mandya",
  "mathura",
  "meerut",
  "mysuru",
  "rohtak",
  "sonipat",
  "tumakuru",
];

/**
 * Active finance partners.
 *
 * The wider partner list (HDFC, IDFC First, Shriram, Kotak, LazyPay) is on
 * hold pending commercial finalisation. Until those agreements close, only
 * Bajaj Finserv is surfaced on the EMI partners strip and the EMI calculator
 * dropdown so we never advertise a partnership we can't honour.
 */
export const financePartners: FinancePartner[] = [
  {
    id: "bajaj-finserv",
    name: "Bajaj Finserv",
    logo: "/img/partners/bajaj.svg",
    type: "nbfc",
    usp: "Fastest approval, 15 minutes at any store",
    minInterestAnnualPct: 11.5,
    maxTenureMonths: 36,
    eligibility: ["Salaried with 12+ months of work history", "Minimum monthly income ₹15,000"],
    docs: ["Aadhaar", "PAN", "3 months bank statement"],
    availableInCityIds: PAN_INDIA_CITY_IDS,
  },
];
