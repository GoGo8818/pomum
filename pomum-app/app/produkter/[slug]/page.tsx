import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, formatKr } from "@/lib/products";
import { ProductArt } from "@/components/ProductArt";
import { AddToCart } from "@/components/AddToCart";
import { EXPECTED_SHIPPING } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: `${product.name} ${product.size}`, description: product.short };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <div className="wrap pdp">
      <div className="pdp-art">
        <ProductArt kind={product.illustration} />
      </div>
      <div>
        <p className="breadcrumb">
          <Link href="/produkter">Produkter</Link> / {product.name}
        </p>
        <span className="pill">Forhåndsbestilling</span>
        <h1 style={{ marginTop: 16 }}>{product.name}</h1>
        <p className="muted" style={{ margin: 0 }}>{product.tagline} · {product.size}</p>
        <p className="pdp-price">{formatKr(product.priceOre)}</p>
        <p className="muted small">Inkl. 15 % mva. Gratis frakt over 500 kr.</p>
        <p style={{ marginTop: 20 }}>{product.short}</p>

        <AddToCart slug={product.slug} />

        <div className="notice">
          Dette er en forhåndsbestilling. Vi sender {EXPECTED_SHIPPING}, og du kan kansellere med full refusjon
          helt frem til pakken er sendt.
        </div>

        <div style={{ marginTop: 32 }}>
          {product.description.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>

        <div className="facts">
          <details open>
            <summary>Slik bruker du den</summary>
            <ol>
              {product.usage.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ol>
          </details>
          <details>
            <summary>Ingredienser og allergener</summary>
            <p>{product.ingredients}</p>
            <p className="muted small">{product.allergens}</p>
          </details>
          <details>
            <summary>Opprinnelse og oppbevaring</summary>
            <p>Opprinnelsesland: {product.origin}</p>
            <p className="muted small">{product.storage}</p>
          </details>
          <details>
            <summary>Frakt og retur</summary>
            <p>
              Frakt koster 79 kr, og er gratis når du handler for 500 kr eller mer. Uåpnede varer kan returneres
              innen 14 dager. <Link href="/frakt-og-retur">Les mer</Link>.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
