export type Currency = "NGN" | "USD";

// Indicative rate for display only; update or wire to a rates API.
export const NGN_PER_USD = 1550;

export function formatPrice(ngn: number, currency: Currency) {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(ngn / NGN_PER_USD);
  }
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(ngn);
}
