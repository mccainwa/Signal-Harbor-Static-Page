// Three distinct vendors' selected managed plans, not a market census.
// Private provenance is in the complete-offer October 3 review outside public/.
// The public website deliberately omits vendor names and links.
const selectedMonthlyPrices = [4000, 5250, 7500] as const;
const mean = selectedMonthlyPrices.reduce((total, price) => total + price, 0) / selectedMonthlyPrices.length;
export const MARKET_BENCHMARK = {
  sampleSize: selectedMonthlyPrices.length,
  mean,
  roundedMean: Math.round(mean / 100) * 100,
  low: Math.min(...selectedMonthlyPrices),
  high: Math.max(...selectedMonthlyPrices),
  reviewed: 'October 3, 2026',
};
