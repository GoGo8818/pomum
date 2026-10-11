import { getProduct, formatKr } from "./products";
import { SHIPPING_ORE, FREE_SHIPPING_THRESHOLD_ORE, VAT_REGISTERED } from "./config";

export type CartItem = { slug: string; qty: number };

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  city: string;
};

export type OrderLine = {
  slug: string;
  name: string;
  size: string;
  qty: number;
  unitOre: number;
  totalOre: number;
};

export type Order = {
  lines: OrderLine[];
  subtotalOre: number;
  shippingOre: number;
  totalOre: number;
};

export function shippingFor(subtotalOre: number): number {
  if (subtotalOre <= 0) return 0;
  return subtotalOre >= FREE_SHIPPING_THRESHOLD_ORE ? 0 : SHIPPING_ORE;
}

/** Bygger ordren på serveren fra katalogen, aldri fra priser sendt av nettleseren. */
export function buildOrder(items: unknown): Order {
  if (!Array.isArray(items) || items.length === 0) throw new Error("Handlekurven er tom.");
  const lines: OrderLine[] = [];
  for (const raw of items) {
    const slug = typeof raw?.slug === "string" ? raw.slug : "";
    const qty = Number(raw?.qty);
    const product = getProduct(slug);
    if (!product) throw new Error("Ukjent produkt i handlekurven.");
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) throw new Error("Ugyldig antall.");
    lines.push({
      slug,
      name: product.name,
      size: product.size,
      qty,
      unitOre: product.priceOre,
      totalOre: product.priceOre * qty,
    });
  }
  const subtotalOre = lines.reduce((s, l) => s + l.totalOre, 0);
  const shippingOre = shippingFor(subtotalOre);
  return { lines, subtotalOre, shippingOre, totalOre: subtotalOre + shippingOre };
}

const clean = (v: unknown, max = 120) =>
  typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "";

export function parseCustomer(raw: any): Customer {
  const c: Customer = {
    name: clean(raw?.name),
    email: clean(raw?.email),
    phone: clean(raw?.phone, 20).replace(/\s+/g, ""),
    address: clean(raw?.address),
    postcode: clean(raw?.postcode, 4),
    city: clean(raw?.city, 60),
  };
  if (!c.name) throw new Error("Fyll inn navn.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c.email)) throw new Error("Ugyldig e-postadresse.");
  if (!/^(\+47)?\d{8}$/.test(c.phone)) throw new Error("Oppgi et norsk mobilnummer (8 siffer).");
  if (!c.address) throw new Error("Fyll inn adresse.");
  if (!/^\d{4}$/.test(c.postcode)) throw new Error("Postnummer må være fire siffer.");
  if (!c.city) throw new Error("Fyll inn poststed.");
  return c;
}

export function orderSummaryText(order: Order): string {
  return order.lines.map((l) => `${l.qty} × ${l.name} ${l.size}`).join(", ");
}

export function orderEmailHtml(opts: {
  heading: string;
  intro: string;
  order: Order;
  customer: Customer;
  method: string;
  reference: string;
}): string {
  const { heading, intro, order, customer, method, reference } = opts;
  const rows = order.lines
    .map(
      (l) =>
        `<tr><td style="padding:6px 0">${l.qty} × ${esc(l.name)} ${esc(l.size)}</td><td style="padding:6px 0;text-align:right">${formatKr(l.totalOre)}</td></tr>`
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif;color:#2B1D16;max-width:520px">
  <h2 style="margin:0 0 8px">${esc(heading)}</h2>
  <p>${esc(intro)}</p>
  <table style="width:100%;border-collapse:collapse;border-top:1px solid #ddd;border-bottom:1px solid #ddd">${rows}
  <tr><td style="padding:6px 0">Frakt</td><td style="padding:6px 0;text-align:right">${order.shippingOre ? formatKr(order.shippingOre) : "Gratis"}</td></tr>
  <tr><td style="padding:6px 0"><strong>Totalt${VAT_REGISTERED ? " (inkl. mva)" : ""}</strong></td><td style="padding:6px 0;text-align:right"><strong>${formatKr(order.totalOre)}</strong></td></tr></table>
  <p><strong>Leveres til:</strong><br>${esc(customer.name)}<br>${esc(customer.address)}<br>${esc(customer.postcode)} ${esc(customer.city)}<br>${esc(customer.email)} · ${esc(customer.phone)}</p>
  <p style="color:#777;font-size:13px">Betaling: ${esc(method)} · Referanse: ${esc(reference)}</p>
</div>`;
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
