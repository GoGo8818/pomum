// Vipps MobilePay ePayment API (v1).
// Dokumentasjon: https://developer.vippsmobilepay.com/docs/APIs/epayment-api/
// Flyt: opprett betaling → kunden godkjenner i Vipps-appen → beløpet er RESERVERT.
// Pengene trekkes først når du "capturer" betalingen, normalt når varen sendes.
// Det kan gjøres i Vipps-portalen (portal.vippsmobilepay.com) uten kode.

const BASE = process.env.VIPPS_ENV === "production" ? "https://api.vipps.no" : "https://apitest.vipps.no";

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Vipps er ikke satt opp (mangler ${name}).`);
  return v;
}

export function vippsConfigured(): boolean {
  return ["VIPPS_CLIENT_ID", "VIPPS_CLIENT_SECRET", "VIPPS_SUBSCRIPTION_KEY", "VIPPS_MSN"].every(
    (k) => !!process.env[k]
  );
}

function baseHeaders(): Record<string, string> {
  return {
    "Ocp-Apim-Subscription-Key": required("VIPPS_SUBSCRIPTION_KEY"),
    "Merchant-Serial-Number": required("VIPPS_MSN"),
    "Vipps-System-Name": "pomum",
    "Vipps-System-Version": "1.0.0",
    "Vipps-System-Plugin-Name": "pomum-nextjs",
    "Vipps-System-Plugin-Version": "1.0.0",
  };
}

async function accessToken(): Promise<string> {
  const res = await fetch(`${BASE}/accesstoken/get`, {
    method: "POST",
    headers: {
      ...baseHeaders(),
      client_id: required("VIPPS_CLIENT_ID"),
      client_secret: required("VIPPS_CLIENT_SECRET"),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Vipps-innlogging feilet (${res.status}).`);
  const json = await res.json();
  return json.access_token as string;
}

async function authHeaders(extra: Record<string, string> = {}) {
  return {
    ...baseHeaders(),
    Authorization: `Bearer ${await accessToken()}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export function newReference(): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `pomum-${Date.now().toString(36)}-${rand}`;
}

export async function createVippsPayment(opts: {
  reference: string;
  amountOre: number;
  phone: string;
  returnUrl: string;
  description: string;
}): Promise<string> {
  const digits = opts.phone.replace(/\D/g, "");
  const phoneNumber = digits.length === 8 ? `47${digits}` : digits;
  const res = await fetch(`${BASE}/epayment/v1/payments`, {
    method: "POST",
    headers: await authHeaders({ "Idempotency-Key": opts.reference }),
    body: JSON.stringify({
      amount: { currency: "NOK", value: opts.amountOre },
      paymentMethod: { type: "WALLET" },
      customer: { phoneNumber },
      reference: opts.reference,
      returnUrl: opts.returnUrl,
      userFlow: "WEB_REDIRECT",
      paymentDescription: opts.description.slice(0, 100),
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Vipps create payment feilet:", res.status, text);
    throw new Error("Kunne ikke starte Vipps-betalingen. Prøv igjen eller betal med kort.");
  }
  const json = await res.json();
  return json.redirectUrl as string;
}

export type VippsPayment = {
  state: "CREATED" | "AUTHORIZED" | "ABORTED" | "EXPIRED" | "TERMINATED" | string;
  amountOre: number;
};

export async function getVippsPayment(reference: string): Promise<VippsPayment> {
  const res = await fetch(`${BASE}/epayment/v1/payments/${encodeURIComponent(reference)}`, {
    headers: await authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Fant ikke Vipps-betalingen (${res.status}).`);
  const json = await res.json();
  return { state: json.state, amountOre: json.amount?.value ?? 0 };
}
