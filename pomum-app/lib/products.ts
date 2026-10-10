// Produktkatalogen. Endre navn, priser, tekster og innhold her.
// Prisene er i øre (inkl. 15 % mva for næringsmidler). 24900 = 249 kr.
// Prisene sendes ALDRI fra nettleseren til betalingen — serveren henter dem herfra,
// så ingen kan endre prisen i handlekurven.

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  size: string;
  priceOre: number;
  short: string;
  description: string[];
  ingredients: string;
  allergens: string;
  origin: string;
  storage: string;
  usage: string[];
  illustration: "saffron" | "molasses";
  accent: string;
};

export const products: Product[] = [
  {
    slug: "safran",
    name: "Safran",
    tagline: "Røde tråder fra Khorasan",
    size: "1 g",
    priceOre: 24900,
    short:
      "Hele safrantråder i premium kvalitet. Dyp farge, honningaktig duft og en smak som bærer en hel rett.",
    description: [
      "Safran er verdens mest arbeidskrevende krydder. Hver blomst gir bare tre tråder, og alt plukkes for hånd tidlig om morgenen i den korte høstsesongen.",
      "Vi har valgt hele tråder fremfor pulver, slik at du ser hva du får. Litt holder lenge: noen få tråder gir farge og aroma til en hel gryte ris.",
    ],
    ingredients: "100 % safran (Crocus sativus), hele tråder.",
    allergens: "Ingen kjente allergener.",
    origin: "Iran",
    storage: "Oppbevares tørt, mørkt og lufttett i romtemperatur.",
    usage: [
      "Knus 6–8 tråder i en morter, trekk i 2 ss varmt vann i 10 minutter.",
      "Tilsett i ris, gryter, kaker eller varm melk.",
    ],
    illustration: "saffron",
    accent: "var(--saffron)",
  },
  {
    slug: "granateplemelasse",
    name: "Granateplemelasse",
    tagline: "Syrlig, dyp og rubinrød",
    size: "250 ml",
    priceOre: 16900,
    short:
      "Granateplejuice kokt langsomt ned til en tykk, syrlig sirup. Den hemmelige ingrediensen i dressinger, marinader og glaseringer.",
    description: [
      "Granateplemelasse er et basisprodukt i det persiske kjøkkenet. Smaken er syrlig først, så rund og fruktig, med en mørk sødme som minner om balsamico.",
      "Vår melasse er laget av granateple uten tilsatt sukker. Den passer like godt over grillede grønnsaker som i en vinaigrette eller over vaniljeis.",
    ],
    ingredients: "Konsentrert granateplejuice.",
    allergens: "Ingen kjente allergener.",
    origin: "Iran",
    storage: "Oppbevares kjølig etter åpning.",
    usage: [
      "Visp 1 ss melasse med 3 ss olivenolje, salt og pepper til en dressing.",
      "Pensle over kylling, laks eller halloumi rett før den er ferdig.",
    ],
    illustration: "molasses",
    accent: "var(--pomegranate)",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatKr(ore: number): string {
  const kr = ore / 100;
  return `${kr.toLocaleString("nb-NO", {
    minimumFractionDigits: kr % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })} kr`;
}
