/**
 * Lightweight, consent-aware analytics layer.
 *
 * - Respects the cookie-consent choice stored by <CookieConsent />.
 * - Pushes events to `window.dataLayer` (GA4 / GTM compatible) and calls
 *   `window.gtag` / `window.plausible` when a provider script is present.
 * - Falls back to a no-op (dev console log) when no provider is loaded,
 *   so the app never breaks and events are still inspectable.
 */

const CONSENT_KEY = 'stylemart-cookie-consent';

type EventParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: EventParams }) => void;
  }
}

export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
};

export const track = (event: string, params: EventParams = {}) => {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
  if (typeof window.plausible === 'function') {
    window.plausible(event, { props: params });
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, params);
  }
};

export const trackPageView = (path: string, title?: string) =>
  track('page_view', { page_path: path, page_title: title ?? document.title });

/* ---- E-commerce helpers (GA4 naming) ---- */

export const trackViewItem = (p: { id: string; name: string; price: number; category?: string }) =>
  track('view_item', {
    currency: 'USD',
    value: p.price,
    items: [{ item_id: p.id, item_name: p.name, item_category: p.category, price: p.price }],
  });

export const trackAddToCart = (p: { id: string; name: string; price: number; quantity?: number }) =>
  track('add_to_cart', {
    currency: 'USD',
    value: p.price * (p.quantity ?? 1),
    items: [{ item_id: p.id, item_name: p.name, price: p.price, quantity: p.quantity ?? 1 }],
  });

export const trackBeginCheckout = (value: number, itemCount: number) =>
  track('begin_checkout', { currency: 'USD', value, item_count: itemCount });

export const trackPurchase = (orderId: string, value: number, itemCount: number) =>
  track('purchase', { transaction_id: orderId, currency: 'USD', value, item_count: itemCount });
