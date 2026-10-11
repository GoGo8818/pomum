import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatKr } from "@/lib/products";
import { ProductImage } from "./ProductImage";
import { AddToCart } from "./AddToCart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <Link href={`/produkter/${product.slug}`} className="card-link">
        <ProductImage product={product} />
      </Link>
      <div className="card-body">
        <div className="card-meta">
          <h3 style={{ margin: 0 }}>
            <Link href={`/produkter/${product.slug}`} className="card-link">{product.name}</Link>
          </h3>
          <span className="muted small">{product.size}</span>
        </div>
        <p className="muted small" style={{ margin: 0 }}>{product.tagline}</p>
        <div className="card-foot">
          <span className="price">{formatKr(product.priceOre)}</span>
          <AddToCart slug={product.slug} compact />
        </div>
      </div>
    </article>
  );
}
