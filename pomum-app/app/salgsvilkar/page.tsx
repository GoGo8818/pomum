import Link from "next/link";
import type { Metadata } from "next";
import { SHOP, EXPECTED_SHIPPING, SHIPPING_ORE, FREE_SHIPPING_THRESHOLD_ORE } from "@/lib/config";
import { formatKr } from "@/lib/products";

export const metadata: Metadata = { title: "Salgsvilkår" };

// Bygger på Forbrukertilsynets standard salgsbetingelser for netthandel, tilpasset matvarer og forhåndsbestilling.
// Gå gjennom teksten før lansering.
export default function TermsPage() {
  return (
    <div className="wrap page prose">
      <h1>Salgsvilkår</h1>
      <p className="muted small">Sist oppdatert: oktober 2026</p>

      <h2>1. Avtalen</h2>
      <p>
        Avtalen består av disse salgsvilkårene, opplysninger i bestillingsløsningen og eventuelt særskilt avtalte
        vilkår. Kjøpet reguleres av forbrukerkjøpsloven, angrerettloven og ehandelsloven.
      </p>

      <h2>2. Partene</h2>
      <p>
        Selger er {SHOP.legalName}, org.nr. {SHOP.orgNumber}, {SHOP.address},{" "}
        <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>. Kjøper er forbrukeren som foretar bestillingen.
      </p>

      <h2>3. Pris</h2>
      <p>
        Oppgitt pris er totalprisen kjøper skal betale, inkludert eventuelle avgifter. Frakt er {formatKr(SHIPPING_ORE)} per bestilling og
        gratis for bestillinger over {formatKr(FREE_SHIPPING_THRESHOLD_ORE)}. Fraktkostnaden vises i handlekurven før kjøpet bekreftes.
      </p>

      <h2>4. Avtaleinngåelse og forhåndsbestilling</h2>
      <p>
        Avtalen er bindende for begge parter når kjøper har sendt bestillingen. Varene selges som
        forhåndsbestilling, med forventet sending {EXPECTED_SHIPPING}. Kjøper kan kansellere bestillingen
        kostnadsfritt frem til varen er sendt.
      </p>

      <h2>5. Betaling</h2>
      <p>
        Ved betaling med Vipps reserveres beløpet ved bestilling og trekkes når varen sendes. Ved betaling med kort,
        Apple Pay eller Google Pay belastes beløpet ved bestilling. Ved kansellering eller manglende levering
        refunderes hele beløpet.
      </p>

      <h2>6. Levering</h2>
      <p>
        Levering skjer når kjøper, eller hans eller hennes representant, har overtatt varen. Dersom leveringstiden ikke
        kan overholdes, varsler vi kjøper med ny forventet dato. Kjøper kan da velge å heve kjøpet.
      </p>

      <h2>7. Risikoen for varen</h2>
      <p>Risikoen for varen går over på kjøper når hun eller han har fått varen i sin besittelse.</p>

      <h2>8. Angrerett</h2>
      <p>
        Kjøper har 14 dagers angrerett fra varen er mottatt, jf. angrerettloven. Angreretten gjelder ikke forseglede
        matvarer der forseglingen er brutt etter levering, jf. angrerettloven § 22. Melding om bruk av angreretten
        sendes til <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>. Kjøper kan bruke standard <Link href="/angreskjema">angreskjema</Link>, eller gi en annen utvetydig
        erklæring om at kjøpet angres.
      </p>
      <p>
        Kjøper dekker de direkte kostnadene ved å returnere varen. Vi tilbakebetaler beløpet innen 14 dager etter at
        vi har mottatt melding om bruk av angreretten. Vi kan holde tilbake betalingen til varen er mottatt.
      </p>

      <h2>9. Mangler og reklamasjon</h2>
      <p>
        Hvis det foreligger en mangel ved varen, må kjøper innen rimelig tid etter at den ble oppdaget gi selger
        melding om at manglen påberopes. Fristen er minst to måneder fra mangelen ble oppdaget. Reklamasjon kan ikke
        skje senere enn to år etter at kjøper overtok varen. Matvarer har begrenset holdbarhet, og vurderingen tar
        hensyn til dette.
      </p>

      <h2>10. Personopplysninger</h2>
      <p>
        Vi behandler personopplysninger for å gjennomføre kjøpet. Se <a href="/personvern">personvernerklæringen</a>.
      </p>

      <h2>11. Konfliktløsning</h2>
      <p>
        Klager rettes til selger innen rimelig tid. Partene skal forsøke å løse tvister i minnelighet. Lykkes ikke
        dette, kan kjøper kontakte{" "}
        <a href="https://www.forbrukerradet.no" target="_blank" rel="noreferrer">Forbrukerrådet</a> for mekling.
      </p>
    </div>
  );
}
