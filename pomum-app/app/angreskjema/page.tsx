import type { Metadata } from "next";
import { SHOP } from "@/lib/config";

export const metadata: Metadata = { title: "Angreskjema" };

// Standard angreskjema, jf. angrerettloven og forskriften om opplysningsplikt og angrerett.
export default function WithdrawalFormPage() {
  return (
    <div className="wrap page prose">
      <h1>Angreskjema</h1>
      <p>
        Fyll ut og send dette skjemaet til oss hvis du vil gå fra kjøpet. Du kan kopiere teksten inn i en e-post til{" "}
        <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>. Det holder også å skrive med egne ord at du vil angre kjøpet.
      </p>

      <h2>Skjema for bruk av angreretten</h2>
      <p>
        Til: {SHOP.legalName}, {SHOP.address}, {SHOP.email}
      </p>
      <p>
        Jeg/vi underretter herved om at jeg/vi ønsker å gå fra min/vår avtale om kjøp av følgende varer:
      </p>
      <ul>
        <li>Varer: ...</li>
        <li>Avtalen ble inngått den (dato)* / varen ble mottatt den (dato)*: ...</li>
        <li>Forbrukerens/forbrukernes navn: ...</li>
        <li>Forbrukerens/forbrukernes adresse: ...</li>
        <li>Dato: ...</li>
        <li>Forbrukerens/forbrukernes underskrift (dersom papirskjema benyttes): ...</li>
      </ul>
      <p className="muted small">* Stryk det som ikke passer.</p>
    </div>
  );
}
