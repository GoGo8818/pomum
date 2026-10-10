import type { Metadata } from "next";
import Link from "next/link";
import { ProductArt } from "@/components/ProductArt";

export const metadata: Metadata = {
  title: "Om oss",
  description: "Pomum henter klassiske persiske råvarer til nordiske kjøkken.",
};

// TODO: Gjør teksten personlig. Fortell gjerne med egne ord hvorfor du startet Pomum.
export default function AboutPage() {
  return (
    <>
      <section className="wrap page">
        <div className="story-grid">
          <div>
            <p className="eyebrow">Om Pomum</p>
            <h1>Smaker med tusen års erfaring, til kjøkkenet ditt i dag.</h1>
            <p className="lead">
              Pomum kommer av det latinske ordet for frukt, og det er der granateplet har fått navnet sitt.
              Vi henter klassiske persiske råvarer og gjør dem enkle å bruke i en nordisk hverdag.
            </p>
          </div>
          <ProductArt kind="molasses" />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap prose">
          <h2 style={{ marginTop: 0 }}>Hvorfor vi startet</h2>
          <p>
            Det persiske kjøkkenet har noen av verdens mest karakteristiske smaker: safran som farger risen gyllen,
            syrlig granateple, pistasj og dadler. I Norge er det ofte vanskelig å vite hva man egentlig kjøper.
            Safran selges som pulver uten opprinnelse, og granateplesirup er ofte mest sukker.
          </p>
          <p>
            Pomum er vårt svar. Vi starter smått, med to produkter vi bruker selv hver uke, og legger til nye først
            når vi har funnet en vare vi står helt inne for.
          </p>
          <h2>Slik jobber vi</h2>
          <ul>
            <li>Få produkter, valgt med omhu.</li>
            <li>Tydelig opprinnelse og ingrediensliste på norsk.</li>
            <li>Emballasje som tåler å stå fremme på benken.</li>
            <li>Enkle oppskrifter og tips, så produktene faktisk blir brukt.</li>
          </ul>
          <h2>Pure Yum</h2>
          <p>
            Det er hele filosofien. Ingen fyllstoffer, ingen omveier. Bare god mat som smaker av noe.
          </p>
          <p style={{ marginTop: 32 }}>
            <Link href="/produkter" className="btn">Se produktene</Link>
          </p>
        </div>
      </section>
    </>
  );
}
