import type { Metadata } from "next";
import Link from "next/link";
import { EXPECTED_SHIPPING, SHOP, SHIPPING_ORE, FREE_SHIPPING_THRESHOLD_ORE } from "@/lib/config";
import { formatKr } from "@/lib/products";

export const metadata: Metadata = { title: "Frakt og retur" };

export default function ShippingPage() {
  return (
    <div className="wrap page prose">
      <h1>Frakt og retur</h1>

      <h2>Frakt</h2>
      <ul>
        <li>Vi sender til hele Norge.</li>
        <li>Frakt koster {formatKr(SHIPPING_ORE)}.</li>
        <li>Gratis frakt når du handler for {formatKr(FREE_SHIPPING_THRESHOLD_ORE)} eller mer.</li>
        <li>Pakken sendes som brev eller pakke i postkassen når den får plass, ellers til nærmeste hentested.</li>
      </ul>

      <h2>Forhåndsbestillinger</h2>
      <p>
        Alle bestillinger nå er forhåndsbestillinger. Vi forventer å sende {EXPECTED_SHIPPING}. Blir det
        forsinkelser, gir vi beskjed på e-post med ny dato. Du kan når som helst kansellere og få full refusjon,
        frem til pakken er sendt.
      </p>

      <h2>Retur og angrerett</h2>
      <p>
        Du har 14 dagers angrerett fra du mottar varen. Fordi produktene våre er matvarer i forseglet emballasje,
        gjelder angreretten bare uåpnede varer med forseglingen intakt. Du betaler selv for returfrakten.
      </p>
      <p>
        Send en e-post til <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a> innen fristen, så får du
        returadresse. Du kan bruke <Link href="/angreskjema">angreskjemaet</Link>, men det holder også å skrive
        at du vil angre kjøpet. Pengene tilbakebetales innen 14 dager etter at vi har fått beskjed, men vi kan
        vente med tilbakebetalingen til vi har mottatt varen.
      </p>

      <h2>Skadet eller feil vare?</h2>
      <p>
        Ta bilde og send det til oss, så sender vi ny vare eller refunderer kostnadsfritt. Se også{" "}
        <Link href="/salgsvilkar">salgsvilkårene</Link>.
      </p>
    </div>
  );
}
