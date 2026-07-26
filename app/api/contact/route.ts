import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { SITE } from "@/lib/data";

// Very small in-memory rate limiter. Good enough to blunt naive bots on a
// single-instance deploy; swap for a Supabase edge function + durable store
// (or Upstash/Vercel KV) if you deploy across multiple regions/instances.
const submissionsByIp = new Map<string, number[]>();
// Increased rate limit for development/testing to prevent blocking repeated form submissions
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 20;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 },
    );
  }

  const { name, email, budget, projectType, message, hp, renderedAt } =
    parsed.data;
  // Sanitize user message before saving to database:
  // Removes HTML tags and extra spaces to prevent stored XSS attacks
  // and keeps database content clean.
  const cleanMessage = message
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  // Honeypot: a filled hidden field means a bot. This is the only place a
  // filled honeypot has any effect — always a silent success, never an
  // error surfaced to whoever/whatever submitted it.
  if (hp) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  // Time-trap: real humans take at least ~2s to fill the form.
  if (renderedAt && Date.now() - renderedAt < 2000) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  const supabase = createClient();
  const { error } = await supabase.from("messages").insert({
    name,
    email,
    budget,
    project_type: projectType,
    // Save the sanitized message instead of raw user input
    message: cleanMessage,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json(
      { error: `Something went wrong. Please email ${SITE.email} directly.` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
