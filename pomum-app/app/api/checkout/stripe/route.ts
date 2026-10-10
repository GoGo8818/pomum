import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { buildOrder, parseCustomer, orderSummaryText } from "@/lib/order";
import { siteUrl, EXPECTED_SHIPPING } from "@/lib/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order = buildOrder(body.items);
    const customer = parseCustomer(body.customer);
    const stripe = getStripe();
    const base = siteUrl(new URL(req.url).origin);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "nb",
      customer_email: customer.email,
      line_items: order.lines.map((l) => ({
        quantity: l.qty,
        price_data: {
          currency: "nok",
          unit_amount: l.unitOre,
          product_data: {
            name: `${l.name} ${l.size} (forhåndsbestilling)`,
          },
        },
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: order.shippingOre === 0 ? "Gratis frakt" : "Frakt",
            fixed_amount: { amount: order.shippingOre, currency: "nok" },
          },
        },
      ],
      custom_text: {
        submit: {
          message: `Forhåndsbestilling. Forventet sendt ${EXPECTED_SHIPPING}. Du kan kansellere og få full refusjon frem til vi sender.`,
        },
      },
      metadata: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        postcode: customer.postcode,
        city: customer.city,
        items: JSON.stringify(order.lines.map((l) => ({ slug: l.slug, qty: l.qty }))),
      },
      payment_intent_data: {
        description: `Pomum forhåndsbestilling: ${orderSummaryText(order)}`.slice(0, 500),
      },
      success_url: `${base}/takk?metode=kort&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/kasse?avbrutt=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Noe gikk galt.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
