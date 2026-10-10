import type { Metadata } from "next";
import { ThankYou } from "@/components/ThankYou";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { EXPECTED_SHIPPING } from "@/lib/config";

export const metadata: Metadata = { title: "Takk for bestillingen", robots: { index: false } };
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ metode?: string; ref?: string; session_id?: string }> };

export default async function ThanksPage({ searchParams }: Props) {
  const { metode = "", ref, session_id } = await searchParams;
  let cardPaid = false;
  if (metode === "kort" && session_id && stripeConfigured()) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      cardPaid = session.payment_status === "paid";
    } catch {}
  }
  return (
    <div className="wrap page narrow">
      <ThankYou method={metode} vippsRef={ref} cardPaid={cardPaid} expected={EXPECTED_SHIPPING} />
    </div>
  );
}
