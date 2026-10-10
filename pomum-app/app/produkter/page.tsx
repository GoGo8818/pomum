import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { EXPECTED_SHIPPING } from "@/lib/config";

export const metadata: Metadata = { title: "Produkter" };

export default function ProductsPage() {
  return (
    <div className="wrap page">
      <p className="eyebrow">Forhåndsbestilling · sendes {EXPECTED_SHIPPING}</p>
      <h1>Produkter</h1>
      <p className="lead" style={{ marginBottom: 40 }}>
        Vi lanserer med to produkter. Flere kommer når vi har funnet dem vi er stolte av.
      </p>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
