"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export function AddToCart({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(slug, qty);
    setAdded(true);
  };

  if (compact) {
    return (
      <button className="btn btn-small" onClick={onAdd}>
        {added ? "Lagt i kurven ✓" : "Forhåndsbestill"}
      </button>
    );
  }

  return (
    <div className="add-to-cart">
      <div className="qty">
        <button aria-label="Færre" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
        <span aria-live="polite">{qty}</span>
        <button aria-label="Flere" onClick={() => setQty(Math.min(20, qty + 1))}>+</button>
      </div>
      <button className="btn" onClick={onAdd}>Forhåndsbestill</button>
      {added && (
        <p className="added-note">
          Lagt i kurven. <Link href="/handlekurv">Gå til handlekurven →</Link>
        </p>
      )}
    </div>
  );
}
