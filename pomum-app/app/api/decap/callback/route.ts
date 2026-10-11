import { cookies } from "next/headers";

// Steg 2 i innloggingen til redigeringspanelet: GitHub sender deg tilbake hit,
// og vi gir tilgangsnøkkelen videre til panelet i vinduet som åpnet innloggingen.
function page(status: "success" | "error", payload: object) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Logger inn…</title></head>
<body style="font-family:system-ui;padding:24px">Logger inn…
<script>
(function () {
  var msg = ${JSON.stringify(message)};
  function receive(e) {
    if (e.origin !== window.location.origin) return;
    window.opener.postMessage(msg, e.origin);
    window.removeEventListener("message", receive, false);
    setTimeout(function () { window.close(); }, 300);
  }
  window.addEventListener("message", receive, false);
  if (window.opener) window.opener.postMessage("authorizing:github", window.location.origin);
})();
</script></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const jar = await cookies();
  const expected = jar.get("decap_oauth_state")?.value;
  jar.delete("decap_oauth_state");

  if (!code || !state || state !== expected) {
    return page("error", { message: "Innloggingen kunne ikke bekreftes. Prøv igjen." });
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/decap/callback`,
    }),
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!json.access_token) {
    return page("error", { message: json.error_description || "GitHub ga ingen tilgang." });
  }
  return page("success", { token: json.access_token, provider: "github" });
}
