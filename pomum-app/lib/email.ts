import { Resend } from "resend";

/** Sender e-post via Resend hvis nøkkel er satt. Uten nøkkel logges bare meldingen. */
export async function sendEmail(to: string | string[], subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[e-post ikke sendt – RESEND_API_KEY mangler] ${subject} → ${to}`);
    return;
  }
  const resend = new Resend(key);
  const from = process.env.ORDER_FROM_EMAIL || "Pomum <ordre@pomum.no>";
  const { error } = await resend.emails.send({ from, to, subject, html });
  if (error) console.error("Resend-feil:", error);
}

export function shopEmail(): string {
  return process.env.ORDER_NOTIFY_EMAIL || "hei@pomum.no";
}
