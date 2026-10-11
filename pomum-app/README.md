# Pomum nettbutikk

Next.js-nettbutikk for pomum.no med forhåndsbestilling, Vipps og kortbetaling (Stripe).

## Sider

| Side | Fil |
|---|---|
| Forside | `app/page.tsx` |
| Produkter | `app/produkter/page.tsx` |
| Produktside | `app/produkter/[slug]/page.tsx` |
| Handlekurv | `app/handlekurv/page.tsx` |
| Kasse (Vipps + kort) | `app/kasse/page.tsx` |
| Takk for bestillingen | `app/takk/page.tsx` |
| Om oss | `app/om-oss/page.tsx` |
| Kontakt | `app/kontakt/page.tsx` |
| Frakt og retur | `app/frakt-og-retur/page.tsx` |
| Salgsvilkår | `app/salgsvilkar/page.tsx` |
| Personvern | `app/personvern/page.tsx` |

## Endre innhold

- **Produkter, priser og tekster:** `lib/products.ts`
- **Firmaopplysninger, frakt og gratis-frakt-grense:** `lib/config.ts`
- **Forventet leveringstid:** miljøvariabelen `NEXT_PUBLIC_EXPECTED_SHIPPING`
- **Farger:** øverst i `app/globals.css`
- **Produktbilder:** i dag flate illustrasjoner (`components/ProductArt.tsx`). Legg ekte bilder i `public/` og bytt ut.

## Før lansering (sjekkliste)

1. Fyll inn selskapsnavn, org.nr. og adresse i `lib/config.ts` (påkrevd etter ehandelsloven).
2. Bekreft priser, størrelser, ingredienser og opprinnelse i `lib/products.ts`.
3. Registrer virksomheten hos Mattilsynet og sjekk merkingen på emballasjen.
4. Les gjennom salgsvilkår og personvernerklæring.
5. Skriv om-oss-teksten med egne ord.
6. Test hele kjøpsflyten med test-nøkler før du bytter til live-nøkler.

## Oppsett av betaling

Alle nøkler legges i **Vercel → Project → Settings → Environment Variables**. Se `.env.example` for full liste.

### Stripe (kort, Apple Pay, Google Pay)
1. Opprett konto på stripe.com og fullfør verifisering av virksomheten.
2. Developers → API keys: kopier `Secret key` til `STRIPE_SECRET_KEY` i Vercel.
3. Developers → Webhooks → Add endpoint: `https://pomum.no/api/webhooks/stripe`, hendelse `checkout.session.completed`. Kopier signing secret til `STRIPE_WEBHOOK_SECRET`.
4. Settings → Payment methods: slå på Apple Pay og Google Pay.

Kortbetaling belastes ved bestilling. Refusjon gjøres i Stripe-dashbordet.

### Vipps (ePayment API)
1. Søk om Vipps-betaling for nettbutikk på vippsmobilepay.com (krever org.nr.).
2. I portal.vippsmobilepay.com: hent `client_id`, `client_secret`, `Ocp-Apim-Subscription-Key` og MSN (Merchant Serial Number).
3. Legg dem inn som `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY`, `VIPPS_MSN`.
4. Sett `VIPPS_ENV=test` mens du tester, `production` når du går live.

**Viktig om Vipps og forhåndsbestilling:** Vipps-betalinger reserveres ved bestilling og må trekkes (capture) i Vipps-portalen når varen sendes. Vipps tillater ikke å trekke før levering. Reservasjoner på Visa-kort kan utløpe etter 5–7 dager (Mastercard 30 dager). Er det lenge til varene sendes, kan noen reservasjoner utløpe. Da må kunden betale på nytt.

### E-postvarsler (Resend)
1. Opprett konto på resend.com og verifiser domenet pomum.no (DNS-oppføringer).
2. Legg `RESEND_API_KEY`, `ORDER_NOTIFY_EMAIL` og `ORDER_FROM_EMAIL` inn i Vercel.

Uten Resend fungerer butikken, men verken du eller kunden får e-post. Bestillingene ligger likevel i Stripe- og Vipps-portalene.

## Kjøre lokalt

```
npm install
cp .env.example .env.local   # fyll inn test-nøkler
npm run dev                  # http://localhost:3000
```

## Publisere

Push til GitHub-repoet som er koblet til Vercel. Vercel bygger og publiserer automatisk.
