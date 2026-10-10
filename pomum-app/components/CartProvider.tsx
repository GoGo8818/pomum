"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartItem } from "@/lib/order";

type CartCtx = {
  items: CartItem[];
  count: number;
  ready: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "pomum_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const setQty = (slug: string, qty: number) =>
    setItems((cur) =>
      qty <= 0
        ? cur.filter((i) => i.slug !== slug)
        : cur.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, 20) } : i))
    );

  const add = (slug: string, qty = 1) =>
    setItems((cur) => {
      const found = cur.find((i) => i.slug === slug);
      if (found) return cur.map((i) => (i.slug === slug ? { ...i, qty: Math.min(i.qty + qty, 20) } : i));
      return [...cur, { slug, qty }];
    });

  const value: CartCtx = {
    items,
    ready,
    count: items.reduce((s, i) => s + i.qty, 0),
    add,
    setQty,
    remove: (slug) => setItems((cur) => cur.filter((i) => i.slug !== slug)),
    clear: () => setItems([]),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart må brukes inne i CartProvider");
  return ctx;
}
