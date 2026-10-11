"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { getProduct, formatKr } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";
import { Totals } from "@/components/OrderSummary";
import { PAYMENTS_OPEN } from "@/lib/config";

export default function CartPage() {
  const { items, ready, setQty, remove } = useCart();
  const valid = items.filter((i) => getProduct(i.slug));

  if (!ready) return <div className="wrap page narrow" />;

  if (valid.length === 0) {
    return (
      <div className="wrap page narrow center">
        <h1>Handlekurven er tom</h1>
        <p className="muted">Ta en titt på produktene våre.</p>
        <Link href="/produkter" className="btn">Se produktene</Link>
      </div>
    );
  }

  return (
    <div className="wrap page narrow">
      <h1>Handlekurv</h1>
      {valid.map((item) => {
        const p = getProduct(item.slug)!;
        return (
          <div className="cart-row" key={item.slug}>
            <ProductImage product={p} />
            <div>
              <Link href={`/produkter/${p.slug}`} style={{ textDecoration: "none", fontWeight: 500 }}>{p.name}</Link>
              <div className="muted small">{p.size} · {formatKr(p.priceOre)}</div>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 8 }}>
                <div className="qty">
                  <button aria-label="Færre" onClick={() => setQty(item.slug, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button aria-label="Flere" onClick={() => setQty(item.slug, item.qty + 1)}>+</button>
                </div>
                <button className="link-btn" onClick={() => remove(item.slug)}>Fjern</button>
              </div>
            </div>
            <div className="price">{formatKr(p.priceOre * item.qty)}</div>
          </div>
        );
      })}
      <Totals items={valid} />
      <Link href="/kasse" className="btn btn-block" style={{ marginTop: 24 }}>Gå til kassen</Link>
      <p className="center small muted" style={{ marginTop: 12 }}>{PAYMENTS_OPEN ? "Betal med Vipps eller kort" : "Bestilling åpner snart – du kan reservere allerede nå"}</p>
    </div>
  );
}
