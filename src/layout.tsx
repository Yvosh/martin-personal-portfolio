import { useEffect, useState, type FormEvent, type ReactNode } from "react";
// import form from "@vibe/form";
import { Mail, MapPin, Phone, Send, User } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { academic, featured } from "@/data/projects";

function SiteHeader() {
  const [worksOpen, setWorksOpen] = useState(false);
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    setWorksOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!worksOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWorksOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [worksOpen]);

  const isWorks = pathname.startsWith("/work/") || pathname.startsWith("/academic/");
  const link = "whitespace-nowrap rounded-full px-3 py-1.5 transition-colors hover:bg-secondary hover:text-foreground";
  const idle = "text-muted-foreground";
  const active = "bg-secondary text-foreground";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="shrink-0 pr-3 text-2xl font-extrabold tracking-tighter">
          yvosh.
        </Link>
        <nav className="flex min-w-0 gap-0.5 text-sm font-medium">
          <Link to="/" className={`${link} ${pathname === "/" ? active : idle}`}>
            Home
          </Link>
          <button
            type="button"
            aria-expanded={worksOpen}
            onClick={() => setWorksOpen((v) => !v)}
            className={`flex items-center gap-1 ${link} ${worksOpen || isWorks ? active : idle}`}
          >
            Works
            <svg viewBox="0 0 12 12" className={`size-3 fill-current transition-transform ${worksOpen ? "rotate-180" : ""}`} aria-hidden="true">
              <path d="M2 4l4 4 4-4z" />
            </svg>
          </button>
        </nav>
      </div>
      {worksOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 -z-10 cursor-default"
            onClick={() => setWorksOpen(false)}
          />
          <div className="absolute inset-x-0 top-full max-h-[calc(100svh-3.5rem)] overflow-y-auto border-b border-border bg-background shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 sm:px-6 md:grid-cols-2">
              <div>
                <Link
                  to="/"
                  hash="featured"
                  className="mb-3 inline-flex items-center gap-2 text-lg font-extrabold tracking-tight hover:underline"
                >
                  <span className="size-2.5 rounded-sm bg-[var(--color-21)]" />
                  Featured Work
                </Link>
                <ul className="space-y-1">
                  {featured.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/work/$slug"
                        params={{ slug: p.slug }}
                        className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  to="/"
                  hash="academic"
                  className="mb-3 inline-flex items-center gap-2 text-lg font-extrabold tracking-tight hover:underline"
                >
                  <span className="size-2.5 rounded-sm bg-[var(--color-18)]" />
                  Academic Work
                </Link>
                <ul className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
                  {academic.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/academic/$slug"
                        params={{ slug: p.slug }}
                        className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

const socials = [
  {
    label: "Facebook",
    href: "#",
    paths: ["M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"],
  },
  {
    label: "Instagram",
    href: "#",
    paths: ["M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", "M17.5 6.5h.01"],
    rect: true,
  },
  {
    label: "LinkedIn",
    href: "#",
    paths: ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z", "M2 9h4v12H2z", "M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"],
  },
  {
    label: "GitHub",
    href: "#",
    paths: [
      "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      "M9 18c-4.51 2-5-2-7-2",
    ],
  },
];


function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent("Portfolio Contact");
    const body = encodeURIComponent(`Hello Yvosh,\n\nMy email is: ${email}`);

    window.location.href = `mailto:cailayvosh@gmail.com?subject=${subject}&body=${body}`;

    setStatus("sent");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <div className="flex flex-col gap-2 min-[420px]:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Your email address"
          className="h-11 min-w-0 flex-1 rounded-full border border-border bg-card px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Send className="size-4" aria-hidden="true" />
          Send
        </button>
      </div>

      <p aria-live="polite" className="mt-2 min-h-5 text-sm text-muted-foreground">
        {status === "sent" &&
          "If your email app didn't open, you can write to me at cailayvosh@gmail.com."}
      </p>
    </form>
  );
}

function SiteFooter() {
  const menu = "text-muted-foreground transition-colors hover:text-foreground";
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-3">
        <div>
          <p className="text-3xl font-extrabold tracking-tighter">
            yvosh<span className="text-[var(--color-21)]">.</span>
          </p>
          <p className="mt-4 font-bold">Send me an email</p>
          <p className="text-sm text-muted-foreground">Leave your address and I will get back to you.</p>
          <EmailForm />
          <div className="mt-2 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-card transition-transform hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {s.rect && <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />}
                  {s.paths.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="md:pl-12 lg:pl-20">
          <p className="font-bold">Contact info</p>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3">
              <User className="size-5 shrink-0 text-foreground" aria-hidden="true" />
              Yvosh Caila Martin
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-5 shrink-0 text-foreground" aria-hidden="true" />
              <a href="tel:09955953899" className="hover:text-foreground">
                09955953899
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-5 shrink-0 text-foreground" aria-hidden="true" />
              Philippines
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 shrink-0 text-foreground" aria-hidden="true" />
              <a href="mailto:cailayvosh@gmail.com" className="hover:text-foreground">
                cailayvosh@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="md:pl-6 lg:pl-12">
          <p className="font-bold">Menu</p>
          <ul className="mt-4 space-y-3">
            <li>
              <Link to="/" className={menu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/" hash="featured" className={menu}>
                Featured Work
              </Link>
            </li>
            <li>
              <Link to="/" hash="academic" className={menu}>
                Academic Work
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Yvosh Caila Martin. All rights reserved.
      </div>
    </footer>
  );
}

function Splash() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    if (phase !== "in") return;
    const leave = () => setPhase("out");
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Enter", "Escape"].includes(e.key)) leave();
    };
    window.addEventListener("scroll", leave, { passive: true });
    window.addEventListener("wheel", leave, { passive: true });
    window.addEventListener("touchmove", leave, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", leave);
      window.removeEventListener("wheel", leave);
      window.removeEventListener("touchmove", leave);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "out") return;
    const t = window.setTimeout(() => setPhase("done"), 800);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      onClick={() => setPhase("out")}
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-background bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] transition-transform duration-700 ease-in-out ${phase === "out" ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex text-[clamp(4.5rem,22vw,12rem)] font-extrabold leading-none tracking-tighter">
        {"yvosh".split("").map((c, i) => (
          <span
            key={i}
            className="inline-block animate-in fade-in slide-in-from-bottom-20 zoom-in-50 fill-mode-both duration-700 motion-reduce:animate-none"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {c}
          </span>
        ))}
        <span
          className="inline-block animate-bounce text-[var(--color-21)] motion-reduce:animate-none"
          style={{ animationDelay: "700ms" }}
        >
          .
        </span>
      </div>
      <div
        className="mt-10 flex flex-col items-center gap-2 text-sm font-medium text-muted-foreground animate-in fade-in fill-mode-both duration-700"
        style={{ animationDelay: "1400ms" }}
      >
        Scroll to enter
        <span className="animate-bounce text-xl" aria-hidden="true">
          ↓
        </span>
      </div>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Splash />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
