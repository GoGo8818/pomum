import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductArt } from "@/components/ProductArt";
import { EXPECTED_SHIPPING } from "@/lib/config";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Forhåndsbestilling er åpen</p>
            <h1>Persiske råvarer for nordiske kjøkken.</h1>
            <p className="lead">
              Vi starter med to klassikere: hel safran og syrlig granateplemelasse. Bestill nå, så er du blant
              de første som får dem. Vi sender {EXPECTED_SHIPPING}.
            </p>
            <div className="hero-actions">
              <Link href="/produkter" className="btn">Se produktene</Link>
              <Link href="/om-oss" className="btn btn-ghost">Historien vår</Link>
            </div>
          </div>
          <div className="hero-art">
            <ProductArt kind="saffron" />
            <ProductArt kind="molasses" />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <h2 style={{ margin: 0 }}>Første utgave</h2>
            <p className="muted" style={{ margin: 0 }}>Gratis frakt på bestillinger over 500 kr.</p>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="values">
            <div className="value">
              <div className="value-dot" style={{ background: "var(--pomegranate)" }} />
              <h3>Få ting, valgt med omhu</h3>
              <p className="muted" style={{ margin: 0 }}>Vi selger bare det vi selv bruker hjemme, og vi vet hvor det kommer fra.</p>
            </div>
            <div className="value">
              <div className="value-dot" style={{ background: "var(--saffron)" }} />
              <h3>Ekte vare</h3>
              <p className="muted" style={{ margin: 0 }}>Hele safrantråder, ikke pulver. Melasse uten tilsatt sukker.</p>
            </div>
            <div className="value">
              <div className="value-dot" style={{ background: "var(--pistachio)" }} />
              <h3>Laget for hverdagen</h3>
              <p className="muted" style={{ margin: 0 }}>Enkle tips på hver produktside, så du vet hvordan du bruker det.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
