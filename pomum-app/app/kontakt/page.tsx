import type { Metadata } from "next";
import { SHOP } from "@/lib/config";

export const metadata: Metadata = { title: "Kontakt" };

export default function ContactPage() {
  return (
    <div className="wrap page narrow">
      <p className="eyebrow">Kontakt</p>
      <h1>Si hei.</h1>
      <p className="lead">
        Spørsmål om en bestilling, et produkt eller et samarbeid? Send oss en e-post, så svarer vi innen to
        virkedager.
      </p>
      <p style={{ marginTop: 32 }}>
        <a href={`mailto:${SHOP.email}`} className="btn">{SHOP.email}</a>
      </p>
      <div className="facts" style={{ marginTop: 48 }}>
        <details open>
          <summary>Gjelder det en bestilling?</summary>
          <p>Oppgi navnet og e-postadressen du bestilte med, så finner vi den raskt.</p>
        </details>
        <details>
          <summary>Firmaopplysninger</summary>
          <p>
            {SHOP.legalName}<br />
            Org.nr. {SHOP.orgNumber}<br />
            {SHOP.address}
          </p>
        </details>
        <details>
          <summary>Følg oss</summary>
          <p><a href={SHOP.instagram} target="_blank" rel="noreferrer">Instagram</a></p>
        </details>
      </div>
    </div>
  );
}
