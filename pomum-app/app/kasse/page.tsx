"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { getProduct, formatKr } from "@/lib/products";
import { Totals } from "@/components/OrderSummary";
import { EXPECTED_SHIPPING } from "@/lib/config";

const empty = { name: "", email: "", phone: "", address: "", postcode: "", city: "" };

export default function CheckoutPage() {
  const { items, ready } = useCart();
  const valid = items.filter((i) => getProduct(i.slug));
  const [customer, setCustomer] = useState(empty);
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState<"" | "vipps" | "kort">("");
  const [error, setError] = useState("");
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    setCancelled(new URLSearchParams(window.location.search).has("avbrutt"));
    try {
      const saved = sessionStorage.getItem("pomum_customer");
      if (saved) setCustomer({ ...empty, ...JSON.parse(saved) });
    } catch {}
  }, []);

  const update = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...customer, [key]: e.target.value };
    setCustomer(next);
    try { sessionStorage.setItem("pomum_customer", JSON.stringify(next)); } catch {}
  };

  async function pay(method: "vipps" | "kort") {
    setError("");
    if (!accepted) {
      setError("Bekreft at du har lest salgsvilkårene og at dette er en forhåndsbestilling.");
      return;
    }
    setBusy(method);
    try {
      const res = await fetch(`/api/checkout/${method === "vipps" ? "vipps" : "stripe"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: valid, customer }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Noe gikk galt. Prøv igjen.");
      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Noe gikk galt.");
      setBusy("");
    }
  }

  if (!ready) return <div className="wrap page" />;

  if (valid.length === 0) {
    return (
      <div className="wrap page narrow center">
        <h1>Handlekurven er tom</h1>
        <Link href="/produkter" className="btn">Se produktene</Link>
      </div>
    );
  }

  return (
    <div className="wrap page">
      <h1>Kasse</h1>
      {cancelled && <p className="notice">Betalingen ble avbrutt. Handlekurven din er lagret.</p>}
      <div className="checkout-grid">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <h3>Levering</h3>
          <label>Fullt navn<input type="text" autoComplete="name" value={customer.name} onChange={update("name")} required /></label>
          <label>E-post<input type="email" autoComplete="email" value={customer.email} onChange={update("email")} required /></label>
          <label>Mobilnummer<input type="tel" autoComplete="tel-national" inputMode="numeric" value={customer.phone} onChange={update("phone")} required /></label>
          <label>Adresse<input type="text" autoComplete="street-address" value={customer.address} onChange={update("address")} required /></label>
          <div className="form-row">
            <label>Postnr.<input type="text" autoComplete="postal-code" inputMode="numeric" maxLength={4} value={customer.postcode} onChange={update("postcode")} required /></label>
            <label>Poststed<input type="text" autoComplete="address-level2" value={customer.city} onChange={update("city")} required /></label>
          </div>

          <div className="notice" style={{ marginTop: 8 }}>
            <strong>Forhåndsbestilling.</strong> Vi sender {EXPECTED_SHIPPING}. Med Vipps reserveres beløpet nå og trekkes
            når pakken sendes. Med kort belastes du nå. Du kan kansellere med full refusjon frem til vi sender.
          </div>

          <label className="check">
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            <span>
              Jeg har lest <Link href="/salgsvilkar" target="_blank">salgsvilkårene</Link> og forstår at dette er en
              forhåndsbestilling.
            </span>
          </label>

          {error && <div className="error" role="alert">{error}</div>}

          <div className="pay-buttons">
            <button type="button" className="btn btn-vipps btn-block" disabled={!!busy} onClick={() => pay("vipps")}>
              {busy === "vipps" ? "Åpner Vipps…" : "Betal med Vipps"}
            </button>
            <button type="button" className="btn btn-block" disabled={!!busy} onClick={() => pay("kort")}>
              {busy === "kort" ? "Åpner betaling…" : "Betal med kort, Apple Pay eller Google Pay"}
            </button>
          </div>
        </form>

        <aside className="summary-box">
          <h3>Din bestilling</h3>
          {valid.map((i) => {
            const p = getProduct(i.slug)!;
            return (
              <div key={i.slug} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "6px 0" }}>
                <span>{i.qty} × {p.name} <span className="muted small">{p.size}</span></span>
                <span>{formatKr(p.priceOre * i.qty)}</span>
              </div>
            );
          })}
          <Totals items={valid} />
          <Link href="/handlekurv" className="small" style={{ display: "inline-block", marginTop: 12 }}>Endre handlekurv</Link>
        </aside>
      </div>
    </div>
  );
}
