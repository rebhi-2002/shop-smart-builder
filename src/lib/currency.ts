/**
 * Single source of truth for store currency.
 * Matches the connected Shopify store's payment currency (ILS).
 */
export const STORE_CURRENCY = "ILS";
export const STORE_LOCALE = "en-IL";
export const CURRENCY_SYMBOL = "₪";

/** Free shipping threshold, expressed in store currency. */
export const FREE_SHIPPING_THRESHOLD = 50;

const formatter = new Intl.NumberFormat(STORE_LOCALE, {
  style: "currency",
  currency: STORE_CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format a numeric or string amount in the store currency, e.g. ₪199.99 */
export function formatPrice(amount: number | string | null | undefined): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount ?? 0;
  if (!Number.isFinite(value as number)) return formatter.format(0);
  return formatter.format(value as number);
}

/** Format using an explicit currency code (e.g. from a Shopify cart line). */
export function formatMoney(amount: number | string, currencyCode?: string | null): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  const safe = Number.isFinite(value) ? value : 0;
  try {
    return new Intl.NumberFormat(STORE_LOCALE, {
      style: "currency",
      currency: currencyCode || STORE_CURRENCY,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(safe);
  } catch {
    return formatPrice(safe);
  }
}
