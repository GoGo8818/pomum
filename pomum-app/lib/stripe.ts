import Stripe from "stripe";

let client: Stripe | null = null;

export function stripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Kortbetaling er ikke satt opp (mangler STRIPE_SECRET_KEY).");
  if (!client) client = new Stripe(key);
  return client;
}
