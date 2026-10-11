// Produktene redigeres i content/products.json – enklest via redigeringspanelet på /admin.
// Prisene sendes ALDRI fra nettleseren til betalingen. Serveren henter dem herfra,
// så ingen kan endre prisen i handlekurven.
import data from "@/content/products.json";

type RawProduct = (typeof data.products)[number];

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  size: string;
  priceOre: number;
  short: string;
  description: string[];
  ingredients: string;
  allergens: string;
  origin: string;
  storage: string;
  usage: string[];
  image: string;
  illustration: "saffron" | "molasses";
};

function toProduct(p: RawProduct): Product {
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline || "",
    size: p.size || "",
    priceOre: Math.round(Number(p.price) * 100),
    short: p.short || "",
    description: (p.description || "").split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
    ingredients: p.ingredients || "",
    allergens: p.allergens || "",
    origin: p.origin || "",
    storage: p.storage || "",
    usage: (p.usage || []).filter(Boolean),
    image: p.image || "",
    illustration: p.illustration === "molasses" ? "molasses" : "saffron",
  };
}

export const products: Product[] = data.products
  .filter((p) => p.active !== false && p.slug && Number(p.price) > 0)
  .map(toProduct);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatKr(ore: number): string {
  const kr = ore / 100;
  return `${kr.toLocaleString("nb-NO", {
    minimumFractionDigits: kr % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })} kr`;
}
