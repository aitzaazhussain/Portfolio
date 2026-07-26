"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calendar, Menu, X } from "lucide-react";
import { Logo, LogoMark } from "@/components/LogoMark";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS, CALENDLY_URL } from "@/lib/data";

// Handles navbar navigation:
// - If user is on another page (Blog/Case Studies), return to homepage first.
// - Then scroll smoothly to the selected section.
// - Updates the browser URL hash without forcing a page refresh.
function navigateToSection(
  href: string,
  pathname: string,
  router: ReturnType<typeof useRouter>,
) {
  // If we are not on the homepage, go back home before scrolling to a section.
  if (pathname !== "/") {
    router.push("/");

    // Wait for homepage to load before finding the section element.
    setTimeout(() => {
      const el = document.querySelector(href);

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);

    return;
  }

  const el = document.querySelector(href);

  if (el) {
    // Smoothly scroll to the selected homepage section.
    el.scrollIntoView({
      behavior: "smooth",
    });

    // Update URL hash without refreshing the page.
    // Example: localhost:3000/#about
    window.history.replaceState(null, "", href);
  }
}
export function Navbar() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();

  // Scroll-spy: highlight the nav link for whichever section is in view.
  useEffect(() => {
    // Do not run section observer on separate pages
    // Intersection observer useEffect
    if (pathname.startsWith("/case-studies") || pathname.startsWith("/blog")) {
      return;
    }
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href),
    ).filter((el): el is Element => !!el);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const hash = `#${entry.target.id}`;

            // Update navbar active state when section enters the viewport.
            setActive(hash);

            // Keep browser URL synced with the section currently visible.
            // Prevents URL staying stuck on old sections like #contact.
            window.history.replaceState(null, "", hash);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Route active useEffect
  useEffect(() => {
    if (pathname.startsWith("/case-studies")) {
      setActive("#case-studies");
      return;
    }

    if (pathname.startsWith("/blog")) {
      setActive("#blog");
      return;
    }

    setActive("");
  }, [pathname]);

  // Transparent over the hero; crossfades into the glass surface once the
  // user scrolls past it — driven by scroll position, not an abrupt snap
  // (the crossfade itself is a plain CSS transition on .nav-shell).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu, matching standard disclosure-pattern behavior.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep navbar active state correct on page routes
  useEffect(() => {
    if (pathname.startsWith("/case-studies")) {
      setActive("#case-studies");
      return;
    }

    if (pathname.startsWith("/blog")) {
      setActive("#blog");
      return;
    }

    setActive("");
  }, [pathname]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div
        className={`nav-shell mx-auto flex items-center justify-between px-4 py-2 max-w-6xl ${scrolled ? "nav-scrolled" : ""}`}
        style={{ borderRadius: 9999 }}
      >
        <Logo size={32} />

        {/* 9 anchor links (incl. the longer "How We Work Together") need real
            room — full horizontal nav only from xl (1280px) up. Below that,
            the hamburger menu carries the exact same NAV_LINKS order, so the
            nav-order requirement holds at every breakpoint either way. */}
        <nav className="hidden xl:flex items-center gap-0.5 relative">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => navigateToSection(l.href, pathname, router)}
              aria-current={active === l.href ? "true" : undefined}
              className="relative px-3 py-2 rounded-full text-[13px] font-medium transition-colors whitespace-nowrap"
              style={{
                color: active === l.href ? "var(--text)" : "var(--text-muted)",
              }}
            >
              {active === l.href && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "var(--surface2)",
                    boxShadow: "0 0 12px var(--primary-glow)",
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a free consultation on Calendly (opens in a new tab)"
            className="btn-primary hidden lg:inline-flex px-5 py-2.5 text-sm no-underline"
          >
            <Calendar size={14} /> Book a Call
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="xl:hidden w-9 h-9 rounded-full flex items-center justify-center border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="xl:hidden fixed inset-0 top-20 z-40 px-4"
          >
            <div className="glass rounded-2xl p-4 flex flex-col gap-1">
              <div
                className="flex items-center gap-2 pb-3 mb-2 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <LogoMark size={28} />
                <span
                  className="font-display font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  Menu
                </span>
              </div>
              {NAV_LINKS.map((l) => (
                <button
                  key={l.label}
                  onClick={() => {
                    setOpen(false);
                    navigateToSection(l.href, pathname, router);
                  }}
                  className="text-left px-3 py-3 rounded-xl text-sm font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {l.label}
                </button>
              ))}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                aria-label="Book a free consultation on Calendly (opens in a new tab)"
                className="btn-primary mt-3 px-5 py-3 text-sm justify-center no-underline"
              >
                <Calendar size={14} /> Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
