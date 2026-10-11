import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { SITE, fill } from "@/lib/config";

// Tekstene redigeres i content/site.json (redigeringspanelet: /admin → Nettsiden → Forside).
const dots = ["var(--pomegranate)", "var(--saffron)", "var(--pistachio)"];

export default function Home() {
  const home = SITE.home;
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">{fill(home.eyebrow)}</p>
            <h1>{fill(home.title)}</h1>
            <p className="lead">{fill(home.lead)}</p>
            <div className="hero-actions">
              <Link href="/produkter" className="btn">Se produktene</Link>
              <Link href="/om-oss" className="btn btn-ghost">Historien vår</Link>
            </div>
          </div>
          <div className="hero-art">
            {products.slice(0, 2).map((p) => (
              <ProductImage key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <h2 style={{ margin: 0 }}>{fill(home.productsHeading)}</h2>
            <p className="muted" style={{ margin: 0 }}>{fill(home.productsSubheading)}</p>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {home.values?.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="values">
              {home.values.map((v, i) => (
                <div className="value" key={i}>
                  <div className="value-dot" style={{ background: dots[i % dots.length] }} />
                  <h3>{v.title}</h3>
                  <p className="muted" style={{ margin: 0 }}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
