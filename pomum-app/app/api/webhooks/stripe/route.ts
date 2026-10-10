import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { buildOrder, parseCustomer, orderEmailHtml } from "@/lib/order";
import { sendEmail, shopEmail } from "@/lib/email";
import { EXPECTED_SHIPPING } from "@/lib/config";

// Stripe kaller denne når en kortbetaling er fullført.
// Sett opp i Stripe: Developers → Webhooks → https://pomum.no/api/webhooks/stripe
// Hendelse: checkout.session.completed
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature) return NextResponse.json({ error: "Mangler signatur" }, { status: 400 });

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Ugyldig signatur" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid") {
      const m = session.metadata || {};
      const order = buildOrder(JSON.parse(m.items || "[]"));
      const customer = parseCustomer({ ...m, email: session.customer_details?.email || session.customer_email });
      await sendEmail(
        shopEmail(),
        `Ny forhåndsbestilling (kort) – ${customer.name}`,
        orderEmailHtml({
          heading: "Ny forhåndsbestilling",
          intro: "Betalt med kort via Stripe.",
          order,
          customer,
          method: "Kort / Stripe",
          reference: session.id,
        })
      );
      await sendEmail(
        customer.email,
        "Takk for forhåndsbestillingen hos Pomum",
        orderEmailHtml({
          heading: "Takk for bestillingen!",
          intro: `Vi har mottatt betalingen din. Forventet sendt ${EXPECTED_SHIPPING}. Du kan kansellere og få full refusjon frem til vi sender – svar på denne e-posten.`,
          order,
          customer,
          method: "Kort",
          reference: session.id.slice(-10),
        })
      );
    }
  }

  return NextResponse.json({ received: true });
}
