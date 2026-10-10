import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { buildOrder, parseCustomer, orderSummaryText } from "@/lib/order";
import { createVippsPayment, newReference } from "@/lib/vipps";
import { siteUrl } from "@/lib/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order = buildOrder(body.items);
    const customer = parseCustomer(body.customer);
    const reference = newReference();
    const base = siteUrl(new URL(req.url).origin);

    const redirectUrl = await createVippsPayment({
      reference,
      amountOre: order.totalOre,
      phone: customer.phone,
      returnUrl: `${base}/takk?metode=vipps&ref=${reference}`,
      description: `Pomum forhåndsbestilling: ${orderSummaryText(order)}`,
    });

    // Ordredetaljene holdes i en kortvarig cookie til kunden kommer tilbake fra Vipps,
    // slik at bekreftelses-e-posten kan inneholde leveringsadressen.
    const jar = await cookies();
    jar.set("pomum_vipps_order", JSON.stringify({ reference, items: body.items, customer }), {
      httpOnly: true,
      sameSite: "lax",
      secure: base.startsWith("https"),
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    return NextResponse.json({ url: redirectUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Noe gikk galt.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
