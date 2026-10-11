import type { Product } from "@/lib/products";
import { ProductArt } from "./ProductArt";

/** Viser produktbildet hvis det er lastet opp, ellers illustrasjonen. */
export function ProductImage({ product }: { product: Product }) {
  if (product.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.image}
        alt={product.name}
        className="product-art"
        style={{ objectFit: "cover", background: "var(--paper)" }}
      />
    );
  }
  return <ProductArt kind={product.illustration} />;
}
