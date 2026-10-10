// Flate illustrasjoner som plassholdere til ekte produktbilder er klare.
// Bytt ut med <Image src="/bilder/safran.jpg" .../> når fotoene finnes.
export function ProductArt({ kind }: { kind: "saffron" | "molasses" }) {
  if (kind === "saffron") {
    return (
      <svg viewBox="0 0 400 400" className="product-art" role="img" aria-label="Glass med safrantråder">
        <rect width="400" height="400" fill="var(--blush)" />
        <circle cx="300" cy="96" r="14" fill="var(--saffron)" />
        <rect x="128" y="112" width="144" height="34" rx="8" fill="var(--espresso)" />
        <rect x="116" y="146" width="168" height="182" rx="26" fill="#fff" opacity=".85" />
        <g stroke="var(--pomegranate)" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M150 300c10-40 30-70 60-96" />
          <path d="M170 306c8-34 22-58 50-80" />
          <path d="M196 308c4-30 16-56 40-74" />
          <path d="M222 304c2-24 10-44 28-60" />
          <path d="M160 270c20-14 40-20 64-22" />
          <path d="M184 286c20-6 44-6 66 0" />
        </g>
        <g fill="var(--saffron)">
          <circle cx="210" cy="204" r="5" />
          <circle cx="220" cy="226" r="4" />
          <circle cx="236" cy="234" r="4" />
          <circle cx="250" cy="244" r="4" />
        </g>
        <rect x="140" y="214" width="120" height="44" rx="6" fill="var(--cream)" />
        <text x="200" y="242" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="18" fill="var(--espresso)">
          Safran
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 400" className="product-art" role="img" aria-label="Flaske med granateplemelasse">
      <rect width="400" height="400" fill="var(--pistachio-soft)" />
      <circle cx="96" cy="300" r="14" fill="var(--saffron)" />
      <rect x="178" y="64" width="44" height="36" rx="6" fill="var(--espresso)" />
      <path d="M182 100h36v46c34 14 50 40 50 76v104a20 20 0 0 1-20 20h-96a20 20 0 0 1-20-20V222c0-36 16-62 50-76Z" fill="var(--pomegranate)" />
      <path d="M150 230c0-30 14-50 36-62" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity=".3" fill="none" />
      <rect x="148" y="240" width="104" height="58" rx="6" fill="var(--cream)" />
      <text x="200" y="266" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="15" fill="var(--espresso)">
        Granateple
      </text>
      <text x="200" y="285" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="15" fill="var(--espresso)">
        melasse
      </text>
    </svg>
  );
}
