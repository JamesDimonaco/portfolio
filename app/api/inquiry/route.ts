import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
// Telegram messages cap at 4096 chars — leave headroom for the header lines
const MAX_TELEGRAM_TEXT = 3800;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  // Honeypot — real users never fill this in, bots often do
  const company = typeof body.company === "string" ? body.company.trim() : "";

  if (company) {
    // Pretend success so bots don't learn anything
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in your name, email, and message." }, { status: 400 });
  }

  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set — inquiry could not be sent", { name, email });
    return NextResponse.json(
      { error: "The form isn't wired up right now — please email me directly instead." },
      { status: 503 }
    );
  }

  const text = [
    "📬 Portfolio inquiry",
    `From: ${name}`,
    `Email: ${email}`,
    "",
    message.slice(0, MAX_TELEGRAM_TEXT),
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        // Plain text (no parse_mode) — visitor input can't break formatting
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Telegram API error:", res.status, errText);
      return NextResponse.json(
        { error: "Couldn't send that just now — please try emailing me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send inquiry to Telegram:", error);
    return NextResponse.json(
      { error: "Couldn't send that just now — please try emailing me directly." },
      { status: 502 }
    );
  }
}
