# Pomum

Landingsside for Pomum — Ancient Superfoods. Bygget med Next.js 14 (App Router).

## Kjøre lokalt

```bash
npm install
npm run dev
```

Åpne http://localhost:3000

## Hvor ligger innholdet?

- `app/markup.ts` — selve siden (hero, produkter, oppskrifter, footer osv.) som en
  HTML-streng. Dette er den enkleste filen å redigere: finn teksten du vil endre
  og skriv over den direkte. Fungerer akkurat som å redigere en vanlig HTML-fil.
- `app/globals.css` — alle farger, fonter, spacing og animasjoner. Fargene ligger
  øverst som CSS-variabler (`--wine`, `--gold`, `--rose` osv.) — endre dem der for
  å justere paletten globalt.
- `app/layout.tsx` — sidetittel, meta-beskrivelse og fontlasting (Google Fonts).
- `app/page.tsx` — kobler sammen markup + CSS, og kjører scroll-animasjonene og
  mobilmenyen. Trenger vanligvis ingen endringer.

## Waitlist-skjemaene

De to skjemaene på siden ("Bli med på ventelisten" og college-crew-skjemaet)
poster i dag direkte til **Formspree**. For å ta dem i bruk:

1. Opprett gratis konto på https://formspree.io
2. Lag et skjema, kopier form-ID-en
3. I `app/markup.ts`, søk etter `YOUR_FORM_ID` (to steder) og lim inn din egen ID

### Alternativ: egen API-route

Det ligger også en ferdig `app/api/waitlist/route.ts` som sender deg en e-post
via Resend for hver påmelding, hvis du heller vil eie dataflyten selv i stedet
for Formspree. For å bruke den:

1. Opprett gratis konto på https://resend.com
2. I Vercel → Project Settings → Environment Variables, legg til:
   - `RESEND_API_KEY`
   - `NOTIFY_EMAIL` (adressen du vil motta påmeldinger på)
3. I `app/markup.ts`, endre skjemaenes `action`-attributt fra Formspree-URL-en
   til `/api/waitlist`

Uten `RESEND_API_KEY` satt logges påmeldingen bare til funksjonens konsoll
(synlig i Vercels "Logs"-fane), så ingenting går i stykker om du ikke setter
dette opp med én gang.

## Deploy

Se hovedinstruksen for hvordan du kobler dette repoet til Vercel — kort sagt:
importer repoet på vercel.com/new, ikke endre noen build-innstillinger (Next.js
oppdages automatisk), og trykk Deploy. Etter det: hver `git push` til `main`
deployer automatisk.
