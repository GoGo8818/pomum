import type { Metadata } from "next";
import Link from "next/link";
import { SITE, fill } from "@/lib/config";
import { RichText } from "@/components/RichText";

// Tekstene redigeres i content/site.json (redigeringspanelet: /admin → Nettsiden → Om oss).
export const metadata: Metadata = {
  title: "Om oss",
  description: SITE.about.lead,
};

export default function AboutPage() {
  const about = SITE.about;
  return (
    <>
      <section className="wrap page">
        <div className="story-grid">
          <div>
            <p className="eyebrow">{about.eyebrow}</p>
            <h1>{fill(about.title)}</h1>
            <p className="lead">{fill(about.lead)}</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-pure-yum.svg"
            alt="Pomum – Pure Yum"
            style={{ width: "100%", height: "auto", background: "#fff", borderRadius: 14 }}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap prose">
          {about.sections.map((s, i) => (
            <div key={i}>
              <h2 style={i === 0 ? { marginTop: 0 } : undefined}>{s.heading}</h2>
              <RichText text={fill(s.body)} />
            </div>
          ))}
          <p style={{ marginTop: 32 }}>
            <Link href="/produkter" className="btn">Se produktene</Link>
          </p>
        </div>
      </section>
    </>
  );
}
