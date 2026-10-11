// Butikkinnstillinger. Redigeres i content/site.json – enklest via redigeringspanelet på /admin.
import site from "@/content/site.json";

export const SITE = site;

export const SHOP = site.company;

export const VAT_REGISTERED: boolean = !!site.shop.vatRegistered;

/** Av = kassen viser en melding i stedet for betalingsknapper (f.eks. før Stripe/Vipps er klare). */
export const PAYMENTS_OPEN: boolean = !!site.shop.paymentsOpen;

export const SHIPPING_ORE = Math.round(Number(site.shop.shippingKr) * 100);
export const FREE_SHIPPING_THRESHOLD_ORE = Math.round(Number(site.shop.freeShippingFromKr) * 100);

export const EXPECTED_SHIPPING: string = site.shop.expectedShipping || "snart";

/** Bytter ut {sending} i tekster med forventet sendedato. */
export function fill(text: string): string {
  return (text || "").replaceAll("{sending}", EXPECTED_SHIPPING);
}

export function siteUrl(fallback?: string): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || fallback || "http://localhost:3000").replace(/\/$/, "");
}
