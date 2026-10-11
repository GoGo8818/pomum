import { NextResponse } from "next/server";

// Steg 1 i innloggingen til redigeringspanelet (/admin): sender deg til GitHub for å logge inn.
// Krever miljøvariablene GITHUB_OAUTH_CLIENT_ID og GITHUB_OAUTH_CLIENT_SECRET i Vercel.
export async function GET(req: Request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("Innlogging er ikke satt opp (mangler GITHUB_OAUTH_CLIENT_ID i Vercel).", { status: 500 });
  }
  const url = new URL(req.url);
  const state = crypto.randomUUID();
  const scope = url.searchParams.get("scope") || "repo";
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${url.origin}/api/decap/callback`);
  authorize.searchParams.set("scope", scope);
  authorize.searchParams.set("state", state);

  const res = NextResponse.redirect(authorize.toString());
  res.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: url.protocol === "https:",
    sameSite: "lax",
    path: "/api/decap",
    maxAge: 600,
  });
  return res;
}
