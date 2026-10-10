// Pomum-ordmerket: P · granateplefrø · gullprikk · MUM
export function Seed({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.18} viewBox="0 0 40 47" aria-hidden="true">
      <path
        d="M20 2C29 10 38 19 38 29a18 18 0 0 1-36 0C2 19 11 10 20 2Z"
        fill="var(--pomegranate)"
      />
      <ellipse cx="13.5" cy="27" rx="4" ry="7" fill="#fff" opacity=".35" transform="rotate(-18 13.5 27)" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo" aria-label="Pomum">
      <span className="logo-letters">P</span>
      <span className="logo-seed">
        <Seed size={22} />
        <span className="logo-dot" />
      </span>
      <span className="logo-letters">MUM</span>
    </span>
  );
}
