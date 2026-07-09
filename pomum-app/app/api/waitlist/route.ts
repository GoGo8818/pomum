import { NextRequest, NextResponse } from "next/server";

// Optional alternative to Formspree: sends you an email for every waitlist
// signup via Resend (https://resend.com — free tier is generous).
//
// Setup:
// 1. Create a free Resend account and verify a sending domain (or use their
//    shared onboarding domain for quick testing).
// 2. In Vercel → Project Settings → Environment Variables, add:
//      RESEND_API_KEY   = your Resend API key
//      NOTIFY_EMAIL     = the address you want signups sent to
// 3. In the HTML, point the waitlist <form> elements at
//    action="/api/waitlist" method="POST" instead of the Formspree URL.
//
// Without RESEND_API_KEY set, this route just logs the email to the
// function's console output (visible in Vercel's function logs) so nothing
// breaks in local development.

export async function POST(req: NextRequest) {
  let email = "";

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    email = body.email ?? "";
  } else {
    const form = await req.formData();
    email = String(form.get("email") ?? "");
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_EMAIL;

  if (apiKey && notifyTo) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Pomum Waitlist <onboarding@resend.dev>",
          to: notifyTo,
          subject: "Ny påmelding til Pomum-ventelisten",
          text: `Ny e-post på ventelisten: ${email}`,
        }),
      });
    } catch (err) {
      console.error("Resend notification failed:", err);
    }
  } else {
    console.log("[waitlist] New signup (RESEND_API_KEY not set):", email);
  }

  return NextResponse.json({ ok: true });
}
