import type { Metadata } from "next";
import { SHOP } from "@/lib/config";

export const metadata: Metadata = { title: "Personvern" };

export default function PrivacyPage() {
  return (
    <div className="wrap page prose">
      <h1>Personvernerklæring</h1>
      <p className="muted small">Sist oppdatert: oktober 2026</p>

      <h2>Behandlingsansvarlig</h2>
      <p>
        {SHOP.legalName}, org.nr. {SHOP.orgNumber}, er behandlingsansvarlig. Kontakt oss på{" "}
        <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>.
      </p>

      <h2>Hva vi samler inn og hvorfor</h2>
      <ul>
        <li>
          <strong>Navn, adresse, e-post og mobilnummer</strong> for å levere bestillingen og sende ordrebekreftelse.
          Grunnlag: avtale (GDPR art. 6 nr. 1 b).
        </li>
        <li>
          <strong>Ordre- og betalingsopplysninger</strong> som vi må oppbevare i fem år etter bokføringsloven. Grunnlag:
          rettslig forpliktelse (art. 6 nr. 1 c).
        </li>
      </ul>
      <p>Vi lagrer ikke kortnummer. Betalingen håndteres av Stripe og Vipps MobilePay.</p>

      <h2>Hvem vi deler med</h2>
      <ul>
        <li>Stripe (kortbetaling)</li>
        <li>Vipps MobilePay (Vipps-betaling)</li>
        <li>Vercel (drift av nettsiden)</li>
        <li>Resend (utsending av ordrebekreftelser)</li>
        <li>Fraktleverandør (levering av pakken)</li>
      </ul>
      <p>
        Noen av disse leverandørene kan behandle data utenfor EU/EØS. Det skjer i så fall med EUs standard
        personvernbestemmelser eller annet gyldig overføringsgrunnlag.
      </p>

      <h2>Informasjonskapsler</h2>
      <p>
        Vi bruker bare nødvendige funksjoner i nettleseren for å huske handlekurven og fullføre betalingen. Vi bruker
        ikke sporings- eller markedsføringscookies.
      </p>

      <h2>Dine rettigheter</h2>
      <p>
        Du kan be om innsyn, retting, sletting eller begrensning av opplysninger om deg, og protestere mot behandling.
        Send en e-post til <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>. Du kan også klage til{" "}
        <a href="https://www.datatilsynet.no" target="_blank" rel="noreferrer">Datatilsynet</a>.
      </p>
    </div>
  );
}
