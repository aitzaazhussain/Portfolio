"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { CheckCircle, Mail, Globe, Send, Calendar } from "lucide-react";
import {
  BUDGETS,
  PROJECT_TYPES,
  SITE,
  SOCIALS,
  CALENDLY_URL,
} from "@/lib/data";
import { contactFormSchema } from "@/lib/validations/contact";
import { SOCIAL_ICON_MAP } from "@/lib/social-icons";
import { IconLink } from "@/components/IconLink";

const inputStyle: React.CSSProperties = {
  background: "var(--surface2)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--text)",
  padding: "12px 14px",
  width: "100%",
  fontSize: 14,
  outline: "none",
};
const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "var(--text-muted)",
  display: "block",
  marginBottom: 6,
};

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    projectType: "",
    message: "",
    hp: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const renderedAt = useRef(Date.now());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Only the fields a real visitor actually filled in are validated
    // client-side. The honeypot (hp) and renderedAt are bot-detection
    // signals for the server only — they must never produce a
    // user-visible error here, or a false positive (e.g. browser autofill
    // touching the honeypot) blocks a real inquiry with a scary message.
    const parsed = contactFormSchema.safeParse({
      ...form,
      renderedAt: renderedAt.current,
    });
    if (!parsed.success) {
      const firstRealIssue = parsed.error.issues.find(
        (i) => i.path[0] !== "hp" && i.path[0] !== "renderedAt",
      );
      setStatus("error");
      setErrorMsg(firstRealIssue?.message || "Please check the form fields.");
      return;
    }
    setStatus("sending");
    try {
      // Add timeout protection so the form does not hang forever
      const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, 15000); // 15 seconds maximum wait

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: controller.signal,
      });

      // Clear timeout after successful response
      clearTimeout(timeout);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      // Show a user-friendly message instead of a generic failure
      setErrorMsg(
        err instanceof DOMException && err.name === "AbortError"
          ? "Request timed out. Please try again."
          : err instanceof Error
            ? err.message
            : "Unable to send message. Please try again.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="relative rounded-full overflow-hidden flex-shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid var(--border-strong)",
                }}
              >
                <Image
                  src="/photo.jpg"
                  alt="Aitzaaz Hussain"
                  fill
                  sizes="40px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="section-label">Contact</div>
            </div>
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                color: "var(--text)",
                letterSpacing: "-0.03em",
              }}
            >
              Let&apos;s Start a Conversation
            </h2>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "var(--text-muted)", fontSize: 15 }}
            >
              I respond to all enquiries within 24 hours. Let&apos;s talk about
              your project and see if we&apos;re a good fit.
            </p>

            <div
              className="flex items-center gap-2 mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              <Globe size={14} style={{ color: "var(--secondary)" }} />
              <span className="text-sm">
                Available worldwide · Remote-first
              </span>
            </div>

            {/* Every way to reach or hire Aitzaaz, given equal visibility —
                Upwork included on the same footing as GitHub/LinkedIn/Fiverr. */}
            <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all hover:-translate-y-0.5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              >
                <Mail size={15} style={{ color: "var(--primary)" }} /> Email Me
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Schedule a meeting on Calendly (opens in a new tab)"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all hover:-translate-y-0.5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              >
                <Calendar size={15} style={{ color: "var(--secondary)" }} />{" "}
                Schedule a Meeting
              </a>
              {SOCIALS.filter(
                (s) =>
                  s.href &&
                  ["Upwork", "Fiverr", "GitHub", "LinkedIn"].includes(s.label),
              ).map((s) => {
                const Icon = SOCIAL_ICON_MAP[s.label];
                const displayName =
                  s.label === "Upwork" ? "Aitzaaz H." : SITE.name;
                const actionLabel =
                  s.label === "Upwork"
                    ? "Hire Me on Upwork"
                    : s.label === "Fiverr"
                      ? "Hire Me on Fiverr"
                      : s.label === "GitHub"
                        ? "View GitHub"
                        : "Connect on LinkedIn";
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={`${actionLabel} — ${displayName} (opens in a new tab)`}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all hover:-translate-y-0.5"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                    }}
                  >
                    <Icon size={15} /> {actionLabel}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-xs font-medium"
                style={{ color: "var(--text-subtle)" }}
              >
                Also on
              </span>
              <IconLink
                href="https://instagram.com/aitzaazhussain"
                label="Aitzaaz Hussain on Instagram"
                size={32}
              >
                {(() => {
                  const Insta = SOCIAL_ICON_MAP.Instagram;
                  return <Insta size={14} />;
                })()}
              </IconLink>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {status === "sent" ? (
              <div className="card p-10 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}
                >
                  <CheckCircle size={26} style={{ color: "#10B981" }} />
                </div>
                <h3
                  className="font-display font-bold mb-2"
                  style={{ fontSize: 20, color: "var(--text)" }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: "var(--text-muted)" }}>
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="card p-6 md:p-8 space-y-5">
                {/* Honeypot — hidden from real users via off-screen positioning, not display:none (bots skip display:none fields).
                    Named/labeled away from common autofill targets like "company" on purpose — see lib/validations/contact.ts. */}
                <div
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "auto",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                  }}
                  aria-hidden="true"
                >
                  <label htmlFor="hp_field">Leave this field blank</label>
                  <input
                    id="hp_field"
                    name="hp_field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.hp}
                    onChange={(e) => setForm({ ...form, hp: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Project Budget</label>
                  <select
                    value={form.budget}
                    onChange={(e) =>
                      setForm({ ...form, budget: e.target.value })
                    }
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="">Select budget range</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Project Type</label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, projectType: t })}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background:
                            form.projectType === t
                              ? "var(--primary)"
                              : "var(--surface2)",
                          border: `1px solid ${form.projectType === t ? "transparent" : "var(--border)"}`,
                          color:
                            form.projectType === t
                              ? "#fff"
                              : "var(--text-muted)",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, goals, and timeline..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm" style={{ color: "var(--danger)" }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full py-3.5 justify-center text-[15px] disabled:opacity-60"
                >
                  {status === "sending" ? (
                    "Sending…"
                  ) : (
                    <>
                      Send Message <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
