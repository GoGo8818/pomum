import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getVippsPayment } from "@/lib/vipps";
import { buildOrder, parseCustomer, orderEmailHtml } from "@/lib/order";
import { sendEmail, shopEmail } from "@/lib/email";
import { EXPECTED_SHIPPING } from "@/lib/config";

// Kalles fra takk-siden når kunden kommer tilbake fra Vipps.
// Sjekker status hos Vipps og sender ordrebekreftelse én gang.
export async function POST(req: Request) {
  try {
    const { ref } = await req.json();
    if (typeof ref !== "string" || !/^pomum-[a-z0-9-]+$/.test(ref)) {
      return NextResponse.json({ state: "UNKNOWN" }, { status: 400 });
    }
    const payment = await getVippsPayment(ref);
    const jar = await cookies();
    const raw = jar.get("pomum_vipps_order")?.value;

    if (payment.state === "AUTHORIZED" && raw) {
      const saved = JSON.parse(raw);
      if (saved.reference === ref) {
        const order = buildOrder(saved.items);
        const customer = parseCustomer(saved.customer);
        if (order.totalOre === payment.amountOre) {
          await sendEmail(
            shopEmail(),
            `Ny forhåndsbestilling (Vipps) – ${customer.name}`,
            orderEmailHtml({
              heading: "Ny forhåndsbestilling",
              intro: "Beløpet er reservert i Vipps. Husk å trekke (capture) betalingen i Vipps-portalen når varen sendes.",
              order,
              customer,
              method: "Vipps (reservert)",
              reference: ref,
            })
          );
          await sendEmail(
            customer.email,
            "Takk for forhåndsbestillingen hos Pomum",
            orderEmailHtml({
              heading: "Takk for bestillingen!",
              intro: `Beløpet er reservert i Vipps og trekkes først når vi sender pakken. Forventet sendt ${EXPECTED_SHIPPING}.`,
              order,
              customer,
              method: "Vipps",
              reference: ref,
            })
          );
        }
        jar.delete("pomum_vipps_order");
      }
    }
    return NextResponse.json({ state: payment.state });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ state: "UNKNOWN" }, { status: 500 });
  }
}
