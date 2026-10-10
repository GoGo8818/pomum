"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

type Status = "checking" | "ok" | "pending" | "failed";

export function ThankYou({ method, vippsRef, cardPaid, expected }: {
  method: string;
  vippsRef?: string;
  cardPaid?: boolean;
  expected: string;
}) {
  const { clear } = useCart();
  const [status, setStatus] = useState<Status>(method === "kort" ? (cardPaid ? "ok" : "pending") : "checking");

  useEffect(() => {
    if (method !== "vipps" || !vippsRef) return;
    let tries = 0;
    let stopped = false;
    const check = async () => {
      try {
        const res = await fetch("/api/vipps/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ref: vippsRef }),
        });
        const { state } = await res.json();
        if (stopped) return;
        if (state === "AUTHORIZED") return setStatus("ok");
        if (["ABORTED", "EXPIRED", "TERMINATED"].includes(state)) return setStatus("failed");
        if (++tries < 6) setTimeout(check, 2000);
        else setStatus("pending");
      } catch {
        if (!stopped) setStatus("pending");
      }
    };
    check();
    return () => { stopped = true; };
  }, [method, vippsRef]);

  useEffect(() => {
    if (status === "ok") clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "checking") {
    return <div className="center"><h1>Et øyeblikk…</h1><p className="muted">Vi sjekker betalingen hos Vipps.</p></div>;
  }
  if (status === "failed") {
    return (
      <div className="center">
        <h1>Betalingen ble ikke fullført</h1>
        <p className="muted">Ingenting er trukket. Handlekurven din er lagret.</p>
        <Link href="/kasse" className="btn">Prøv igjen</Link>
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className="center">
        <h1>Vi venter på bekreftelse</h1>
        <p className="muted">
          Betalingen er ikke bekreftet ennå. Får du ikke e-post fra oss i løpet av noen minutter, kontakt{" "}
          <a href="mailto:hei@pomum.no">hei@pomum.no</a>.
        </p>
      </div>
    );
  }
  return (
    <div className="center">
      <p className="eyebrow">Bestilling mottatt</p>
      <h1>Takk! Pure yum er på vei.</h1>
      <p className="lead" style={{ margin: "0 auto 24px" }}>
        Du får en bekreftelse på e-post. Vi sender pakken {expected}
        {method === "vipps" ? ", og beløpet trekkes først da." : "."}
      </p>
      <Link href="/om-oss" className="btn btn-ghost">Les historien vår</Link>
    </div>
  );
}
