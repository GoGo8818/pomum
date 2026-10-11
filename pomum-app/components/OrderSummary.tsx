"use client";

import { getProduct, formatKr } from "@/lib/products";
import { shippingFor } from "@/lib/order";
import { FREE_SHIPPING_THRESHOLD_ORE, VAT_REGISTERED } from "@/lib/config";
import type { CartItem } from "@/lib/order";

export function totalsFor(items: CartItem[]) {
  const subtotal = items.reduce((s, i) => s + (getProduct(i.slug)?.priceOre ?? 0) * i.qty, 0);
  const shipping = shippingFor(subtotal);
  return { subtotal, shipping, total: subtotal + shipping };
}

export function Totals({ items }: { items: CartItem[] }) {
  const { subtotal, shipping, total } = totalsFor(items);
  const left = FREE_SHIPPING_THRESHOLD_ORE - subtotal;
  return (
    <div className="totals">
      {left > 0 ? (
        <div style={{ display: "block" }}>
          <span className="small">Handle for {formatKr(left)} til, så får du gratis frakt.</span>
          <div className="progress"><span style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_ORE) * 100)}%` }} /></div>
        </div>
      ) : (
        <div className="small" style={{ color: "#4d6a1f" }}>Du har gratis frakt ✓</div>
      )}
      <div><span>Varer</span><span>{formatKr(subtotal)}</span></div>
      <div><span>Frakt</span><span>{shipping === 0 ? "Gratis" : formatKr(shipping)}</span></div>
      <div className="grand"><span>Totalt</span><span>{formatKr(total)}</span></div>
      {VAT_REGISTERED && <div className="muted small">Inkl. mva.</div>}
    </div>
  );
}
