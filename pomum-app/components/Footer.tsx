import Link from "next/link";
import { Logo } from "./Logo";
import { SHOP } from "@/lib/config";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Logo light height={30} />
          <p className="footer-tag">Pure Yum.</p>
        </div>
        <div>
          <h4>Butikk</h4>
          <Link href="/produkter">Alle produkter</Link>
          <Link href="/produkter/safran">Safran</Link>
          <Link href="/produkter/granateplemelasse">Granateplemelasse</Link>
        </div>
        <div>
          <h4>Pomum</h4>
          <Link href="/om-oss">Om oss</Link>
          <Link href="/kontakt">Kontakt</Link>
          <a href={SHOP.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <div>
          <h4>Kundeservice</h4>
          <Link href="/frakt-og-retur">Frakt og retur</Link>
          <Link href="/salgsvilkar">Salgsvilkår</Link>
          <Link href="/personvern">Personvern</Link>
        </div>
      </div>
      <div className="wrap footer-legal">
        {SHOP.legalName} · Org.nr. {SHOP.orgNumber} · {SHOP.address} ·{" "}
        <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>
      </div>
    </footer>
  );
}
