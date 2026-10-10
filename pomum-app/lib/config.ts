// Butikkinnstillinger. Fyll inn selskapsinformasjonen før lansering —
// e-handelsloven krever at navn, org.nr., adresse og e-post vises på nettsiden.

export const SHOP = {
  name: "Pomum",
  legalName: "[Selskapsnavn AS]", // TODO: fyll inn
  orgNumber: "[000 000 000]", // TODO: fyll inn
  address: "[Gateadresse, 0000 Oslo]", // TODO: fyll inn
  email: "hei@pomum.no",
  instagram: "https://instagram.com/pomum.no",
};

export const SHIPPING_ORE = 7900; // 79 kr
export const FREE_SHIPPING_THRESHOLD_ORE = 50000; // gratis frakt fra 500 kr

export const EXPECTED_SHIPPING =
  process.env.NEXT_PUBLIC_EXPECTED_SHIPPING || "november 2026";

export function siteUrl(fallback?: string): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || fallback || "http://localhost:3000").replace(/\/$/, "");
}
