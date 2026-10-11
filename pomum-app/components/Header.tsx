"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "./CartProvider";
import { SITE, fill } from "@/lib/config";

export function Header() {
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="banner">
        {fill(SITE.shop.banner)}
      </div>
      <header className="header">
        <div className="wrap header-inner">
          <Link href="/" className="logo-link" onClick={() => setOpen(false)}>
            <Logo height={30} />
          </Link>
          <nav className={`nav ${open ? "nav-open" : ""}`} onClick={() => setOpen(false)}>
            <Link href="/produkter">Produkter</Link>
            <Link href="/om-oss">Om oss</Link>
            <Link href="/kontakt">Kontakt</Link>
          </nav>
          <div className="header-actions">
            <Link href="/handlekurv" className="cart-link" aria-label={`Handlekurv, ${count} varer`}>
              Kurv
              {ready && count > 0 && <span className="cart-count">{count}</span>}
            </Link>
            <button className="menu-btn" aria-label="Meny" aria-expanded={open} onClick={() => setOpen(!open)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
