"use client";
import { Logo } from "@/components/LogoMark";
import { SITE, SOCIALS, NAV_LINKS, SERVICES } from "@/lib/data";
import { SOCIAL_ICON_MAP } from "@/lib/social-icons";
import { useRouter, usePathname } from "next/navigation";

// Handles Footer Quick Links navigation.
// Works from Blog and Case Studies pages.
// Returns to homepage first, then scrolls to the selected section.
function handleQuickLink(
  href: string,
  pathname: string,
  router: ReturnType<typeof useRouter>,
) {
  // If user is on another page, return to homepage first.
  if (pathname !== "/") {
    router.push("/");

    // Wait for homepage to load before scrolling.
    setTimeout(() => {
      const el = document.querySelector(href);

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
        });

        // Update URL hash after scrolling.
        window.history.replaceState(null, "", href);
      }
    }, 300);

    return;
  }

  const el = document.querySelector(href);

  if (el) {
    // Smooth scroll to selected section.
    el.scrollIntoView({
      behavior: "smooth",
    });

    // Update URL hash without refreshing the page.
    window.history.replaceState(null, "", href);
  }
}

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <Logo size={32} />
            <p
              className="text-sm mt-4 max-w-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {SITE.tagline} — available for freelance projects worldwide.
            </p>
          </div>

          <div>
            <div
              className="text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ color: "var(--text-subtle)" }}
            >
              Quick Links
            </div>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <button
                    // Use the same navigation logic as Navbar.
                    // This fixes Quick Links on /blog and /case-studies pages.
                    // It returns to homepage first, then scrolls to the section.
                    onClick={() => handleQuickLink(l.href, pathname, router)}
                    className="text-sm no-underline"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              className="text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ color: "var(--text-subtle)" }}
            >
              Services
            </div>
            <ul className="space-y-2">
              {SERVICES.slice(0, 5).map((s) => (
                <li
                  key={s.title}
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {/* Official SVG icons only, equal visibility for every professional
              platform (Upwork included — never hidden). rel="me" doubles as
              a lightweight, standard identity signal for these profile links. */}
          <div className="flex items-center gap-3">
            {SOCIALS.filter((s) => s.href).map((s) => {
              const Icon = SOCIAL_ICON_MAP[s.label];
              const displayName =
                s.label === "Upwork" ? "Aitzaaz H." : SITE.name;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`${displayName} on ${s.label}`}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border transition-transform hover:-translate-y-0.5"
                  style={{
                    background: "var(--surface2)",
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  <Icon size={16} />
                </a>
              );
            })}
            <a
              href={`mailto:${SITE.email}`}
              aria-label={`Email ${SITE.name}`}
              className="w-9 h-9 rounded-lg flex items-center justify-center border transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <SOCIAL_ICON_MAP.Email size={16} />
            </a>
          </div>

          <p
            className="text-xs text-center"
            style={{ color: "var(--text-subtle)" }}
          >
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>

          <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
            Built with React · Supabase · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
