import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { academic, featured, img } from "@/data/projects";
import settings from "@/config/settings.json";

export const Route = createFileRoute("/")({
  head: () => settings.routes["/"],
  component: HomePage,
});


const cursors = [
  ["Designer UI", "bg-[var(--color-18)]", "left-[6%] top-[27%]"],
  ["Designer UX", "bg-[var(--color-20)]", "left-[4%] top-[44%]"],
  ["Developer", "bg-[var(--color-21)]", "left-[31%] bottom-[24%] max-lg:hidden!"],
  ["Art director", "bg-[var(--color-19)]", "right-[14%] top-[10%]"],
  ["Client", "bg-[var(--color-22)]", "right-[4%] top-[44%]"],
  ["Project manager", "bg-[var(--color-23)] !text-foreground", "right-[15%] bottom-[30%] max-lg:hidden!"],
];

const toolGroups: { title: string; items: string[][]; extra?: string }[] = [
  {
    title: "Web design",
    items: [
      ["Duda", "logo-duda"],
      ["WordPress", "logo-wordpress"],
      ["Wix", "logo-wix"],
      ["Squarespace", "logo-squarespace"],
      ["Shopify", "logo-shopify"],
      ["Figma", "logo-figma"],
    ],
    extra: "…and other CMS builders",
  },
  {
    title: "Programming Language / Deployment",
    items: [
      ["JavaScript", "logo-javascript"],
      ["PHP", "logo-php"],
      ["HTML", "logo-html"],
      ["CSS", "logo-css"],
      ["React", "logo-react"],
      ["Tailwind CSS", "logo-tailwind"],
      ["MySQL", "logo-mysql"],
      ["GitHub", "logo-github"],
      ["Hostinger", "logo-hostinger"],
    ],
  },
  {
    title: "Graphic design",
    items: [
      ["Photoshop", "logo-photoshop"],
      ["Canva", "logo-canva"],
      ["CapCut", "logo-capcut"],
    ],
  },
];



const otherBuilders = [
  ["Webflow", "Visual website builder"],
  ["Framer", "Design-to-site builder"],
  ["GoDaddy Website Builder", "Drag-and-drop builder"],
  ["Weebly", "Drag-and-drop builder"],
  ["Elementor", "WordPress page builder"],
  ["Joomla", "Open-source CMS"],
  ["Drupal", "Open-source CMS"],
  ["Ghost", "Publishing CMS"],
  ["BigCommerce", "E-commerce platform"],
  ["Weblium", "Landing page builder"],
];

const accents = [
  "bg-[var(--color-18)]",
  "bg-[var(--color-19)]",
  "bg-[var(--color-20)]",
  "bg-[var(--color-21)]",
  "bg-[var(--color-22)]",
  "bg-[var(--color-23)] !text-foreground",
];

const grid =
  "bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]";

const graphics = [
  { name: "yvosh-graphic-g1-5", label: "Citrusly Good", views: ["yvosh-graphic-g1-5", "yvosh-graphic-g1-1", "yvosh-graphic-g1-2", "yvosh-graphic-g1-3", "yvosh-graphic-g1-4", "yvosh-graphic-g1-6", "yvosh-graphic-g1-7", "yvosh-graphic-g1-8"], w: 1587, h: 2245 },
  { name: "yvosh-graphic-g2-4", label: "Nutriglow", views: ["yvosh-graphic-g2-4", "yvosh-graphic-g2-2", "yvosh-graphic-g2-3", "yvosh-graphic-g2-5", "yvosh-graphic-g2-1", "yvosh-graphic-g2-6", "yvosh-graphic-g2-7", "yvosh-graphic-g2-8"], w: 1587, h: 2245 },
  { name: "yvosh-graphic-g3-5", label: "OISHI SUSHI (Brochure)", views: ["yvosh-graphic-g3-5", "yvosh-graphic-g3-1", "yvosh-graphic-g3-2", "yvosh-graphic-g3-3", "yvosh-graphic-g3-4"], w: 2000, h: 1500 },
{ name: "yvosh-graphic-g3-5", label: "OISHI SUSHI (Brochure)", views: ["yvosh-graphic-g3-5", ... ], w: 896, h: 1152 }
  { name: "yvosh-graphic-g4-1", label: "OISHI SUSHI (Carousel Instagram Post)", views: ["yvosh-graphic-g4-1", "yvosh-graphic-g4-0", "yvosh-graphic-g4-2", "yvosh-graphic-g4-3", "yvosh-graphic-g4-4", "yvosh-graphic-g4-5", "yvosh-graphic-g4-6", "yvosh-graphic-g4-7", "yvosh-graphic-g4-8"], w: 2000, h: 1500 },
  { name: "graphic-normal-distribution", label: "Normal Distribution (Infographic)", views: ["graphic-normal-distribution"], w: 800, h: 2600 },
  { name: "graphic-dads-day", label: "Dad's Day Bento Cake (Poster)", views: ["graphic-dads-day"], w: 1080, h: 1920 },
  { name: "graphic-mothers-day", label: "Mother's Day Bento Cake (Poster)", views: ["graphic-mothers-day"], w: 1080, h: 1920 },
  { name: "graphic-valentine-red", label: "Valentine's Bento Cake (Poster)", views: ["graphic-valentine-red", "graphic-valentine-white"], w: 1587, h: 2245 },
  { name: "graphic-recharge-poster", label: "ReCharge (Poster)", views: ["graphic-recharge-poster"], w: 2880, h: 6528 },
  { name: "graphic-pokemon-invite", label: "Pokemon Birthday Invitation", views: ["graphic-pokemon-invite"], w: 1240, h: 1748 },
];

const graphicColumns = [[0, 6, 10], [1, 7, 8], [2, 4, 5], [3, 9]];

const reveal =
  "animate-in fade-in slide-in-from-bottom-8 fill-mode-both duration-700 [animation-timeline:view()] [animation-range:entry_10%_cover_35%] motion-reduce:animate-none";

function Heading({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div className={`mb-12 max-w-3xl ${reveal}`}>
      <span
        className={`mb-4 inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium text-white ${accents[(Number(n) - 1) % accents.length]}`}
      >
        <svg viewBox="0 0 12 12" className="size-3 fill-current" aria-hidden="true">
          <path d="M1 1l9 3.5-3.8 1.7L4.5 10z" />
        </svg>
        {n}
      </span>
      <h2 className="text-4xl font-extrabold tracking-tighter min-[420px]:text-5xl sm:text-7xl">
        {title}
        <span className="text-[var(--color-21)]">.</span>
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">{sub}</p>
    </div>
  );
}

function HomePage() {
  const [open, setOpen] = useState<number | null>(null);
  const [cmsOpen, setCmsOpen] = useState(false);
  const [view, setView] = useState(0);
  const shown = open === null ? null : graphics[open];
  const viewCount = shown ? shown.views.length : 0;

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setView((v) => (v + 1) % viewCount);
      if (e.key === "ArrowLeft") setView((v) => (v - 1 + viewCount) % viewCount);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, viewCount]);


  return (
    <div className="bg-background text-foreground">

      <section
        id="intro"
        className="relative flex min-h-[calc(100svh-3.5rem)] items-center justify-center overflow-clip bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]"
      >
        {cursors.map(([label, color, pos]) => (
          <span
            key={label}
            className={`absolute z-20 hidden items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-white shadow-sm sm:flex ${color} ${pos}`}
          >
            {label}
          </span>
        ))}
        <div className="absolute left-[5%] top-[5%] size-10 sm:left-[17%] sm:top-[50%] sm:size-14 items-center justify-center rounded-2xl border border-border bg-white shadow-sm flex">
          <img src={img("logo-figma", 200)} width={1024} height={1024} alt="Figma" className="size-7 object-contain sm:size-9" />
        </div>
        <div className="absolute right-[5%] top-[5%] size-10 sm:right-[13%] sm:top-[32%] sm:size-14 items-center justify-center rounded-2xl border border-border bg-white shadow-sm flex">
          <img src={img("logo-vscode", 200)} width={1024} height={1024} alt="VS Code" className="size-7 object-contain sm:size-9" />
        </div>
        <div className="absolute left-[calc(50%-1.25rem)] top-[3%] size-10 sm:left-[24%] sm:top-[8%] sm:size-14 items-center justify-center rounded-2xl border border-border bg-white shadow-sm flex">
          <img src={img("logo-wordpress", 200)} width={1024} height={1024} alt="WordPress" className="size-7 object-contain sm:size-9" />
        </div>
        <div className="absolute left-[8%] top-[12%] hidden w-[15%] -rotate-3 rounded-lg border border-border bg-card/90 shadow-sm md:block">
          <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
            <span className="size-1.5 rounded-full bg-border" />
            <span className="size-1.5 rounded-full bg-border" />
            <span className="size-1.5 rounded-full bg-border" />
          </div>
          <div className="space-y-2 p-3">
            <div className="flex gap-2">
              <span className="size-5 rounded-full bg-secondary" />
              <span className="mt-1.5 h-1.5 w-1/2 rounded bg-secondary" />
            </div>
            <div className="h-1.5 w-4/5 rounded bg-secondary" />
            <div className="h-1.5 w-3/5 rounded bg-secondary" />
            <div className="h-6 rounded border border-border" />
          </div>
        </div>
        <div className="absolute bottom-[6%] right-[18%] hidden w-[14%] rotate-3 rounded-lg border border-border bg-card/90 shadow-sm lg:block">
          <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
            <span className="size-1.5 rounded-full bg-border" />
            <span className="size-1.5 rounded-full bg-border" />
            <span className="size-1.5 rounded-full bg-border" />
          </div>
          <div className="space-y-1 p-3 font-mono text-[0.55rem] leading-tight text-muted-foreground">
            <div>&lt;html&gt;</div>
            <div className="pl-2">&lt;body&gt;</div>
            <div className="pl-4">&lt;h1&gt;Hello&lt;/h1&gt;</div>
            <div className="pl-2">&lt;/body&gt;</div>
            <div>&lt;/html&gt;</div>
          </div>
        </div>
        <div className="absolute bottom-[8%] left-[38%] hidden rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-sm lg:block">
          <span className="font-semibold">Yvosh</span>{" "}
          <span className="text-muted-foreground">just now</span>
          <p>Designed and built by hand.</p>
        </div>
        <div className="absolute right-[6%] top-[18%] hidden rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-sm md:block">
          <span className="font-semibold">Yvosh</span>{" "}
          <span className="text-muted-foreground">just now</span>
          <p>Let's make your new website.</p>
        </div>

        <div className="absolute -left-[5%] bottom-[2%] w-[44%] md:w-[28%] max-w-lg [perspective:1800px] animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="relative origin-bottom-left [transform-style:preserve-3d] [transform:rotateY(24deg)_rotateX(3deg)]">
            <div className="relative rounded-t-2xl bg-foreground p-[3.5%] pb-[3%] shadow-[0_0_0_2px_var(--color-11),0_-6px_30px_rgb(0_0_0/0.15)]">
              <span className="absolute left-1/2 top-[1.2%] size-1.5 -translate-x-1/2 rounded-full bg-muted-foreground/60" />
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={img("yvosh-work-studio", 800)}
                  width={1152}
                  height={896}
                  alt="Website design on a laptop"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.35)_0%,transparent_38%,transparent_100%)]" />
              </div>
            </div>
            <div className="relative -mx-[4%] origin-top [transform:rotateX(62deg)]">
              <div className="h-10 bg-[linear-gradient(to_bottom,var(--color-13),var(--color-17))] [clip-path:polygon(4%_0,96%_0,100%_100%,0_100%)]">
                <div className="mx-auto mt-2 h-5 w-[78%] rounded-sm bg-[repeating-linear-gradient(90deg,var(--color-15)_0_6px,transparent_6px_8px)] opacity-60" />
                <div className="mx-auto mt-1 h-2 w-[30%] rounded-sm bg-[var(--color-15)]/60" />
              </div>
            </div>
            <div className="relative -mx-[4%] -mt-px h-2 rounded-b-3xl bg-[linear-gradient(to_bottom,var(--color-15),var(--color-11))] shadow-[0_24px_30px_-6px_rgb(0_0_0/0.35)]">
              <span className="absolute left-1/2 top-0 h-1 w-[16%] -translate-x-1/2 rounded-b-md bg-[var(--color-11)]" />
            </div>
          </div>
        </div>
        <div className="absolute -right-[1%] bottom-[-4%] w-[20%] md:w-[12%] max-w-[190px] [perspective:1400px] animate-in fade-in slide-in-from-right-10 duration-1000">
          <div className="relative [transform-style:preserve-3d] [transform:rotateY(-26deg)_rotateX(6deg)_rotateZ(3deg)]">
            <div className="relative rounded-[2.1rem] bg-foreground p-[5px] shadow-[3px_0_0_0_var(--color-11),6px_0_0_0_var(--color-15),9px_2px_0_0_var(--color-11),26px_34px_44px_rgb(0_0_0/0.35)]">
              <span className="absolute -left-[3px] top-[18%] h-8 w-[3px] rounded-l bg-[var(--color-11)]" />
              <span className="absolute -left-[3px] top-[28%] h-12 w-[3px] rounded-l bg-[var(--color-11)]" />
              <span className="absolute -right-[10px] top-[24%] h-14 w-[3px] rounded-r bg-[var(--color-15)]" />
              <div className="relative overflow-hidden rounded-[1.7rem]">
                <img
                  src={img("yvosh-work-app", 600)}
                  width={1152}
                  height={896}
                  alt="App design on a phone"
                  className="aspect-[9/18] w-full object-cover"
                />
                <span className="absolute left-1/2 top-2 h-4 w-1/3 -translate-x-1/2 rounded-full bg-foreground" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(255_255_255/0.4)_0%,transparent_40%)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-44 pt-20 text-center md:py-20 sm:px-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="text-[clamp(4.5rem,14vw,11rem)] font-extrabold leading-[0.85] tracking-tighter">
            <span className="sr-only">yvosh.</span>
            <span aria-hidden="true" className="inline-flex">
              {"yvosh".split("").map((c, i) => (
                <span
                  key={i}
                  className="inline-block animate-in fade-in slide-in-from-bottom-16 fill-mode-both duration-700 motion-reduce:animate-none"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {c}
                </span>
              ))}
              <span
                className="inline-block animate-bounce text-[var(--color-21)] motion-reduce:animate-none"
                style={{ animationDelay: "600ms" }}
              >
                .
              </span>
            </span>
          </h1>
          <p className="mt-6 text-2xl font-medium sm:text-3xl">Web Designer</p>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            I design and build clear, fast websites that look sharp on every screen.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#featured"
              className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground transition-opacity hover:opacity-85"
            >
              See my work
            </a>
            <a
              href="#about"
              className="inline-flex h-12 items-center rounded-full border border-border bg-card px-6 font-medium transition-colors hover:bg-secondary"
            >
              About me
            </a>
          </div>
          <div className="mt-12 flex items-end justify-center gap-2 pb-4 hidden">
            <div className="w-56 -rotate-[8deg] rounded-t-xl border-4 border-b-0 border-foreground bg-foreground shadow-xl">
              <img
                src={img("yvosh-work-studio", 600)}
                width={1152}
                height={896}
                alt="Website design on a laptop"
                className="aspect-[16/10] w-full rounded-t-md object-cover"
              />
            </div>
            <div className="w-20 rotate-[8deg] rounded-2xl border-4 border-foreground bg-foreground shadow-xl">
              <img
                src={img("yvosh-work-app", 400)}
                width={1152}
                height={896}
                alt="App design on a phone"
                className="aspect-[9/17] w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className={`scroll-mt-16 py-24 ${grid}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Heading n="01" title="Tools I used" sub="The tools behind every website and design, from first sketch to launch." />
          <div className="space-y-12">
            {toolGroups.map((group, g) => (
              <div key={group.title} className={reveal}>
                <h3 className="mb-5 text-xl font-bold tracking-tight">{group.title}</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {group.items.map(([name, mark], i) => {
                    const accent = accents[(i + g) % accents.length];
                    return (
                      <div
                        key={name}
                        className="group relative flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                      >
                        <span
                          className={`absolute -top-2.5 right-3 rounded-sm px-2 py-0.5 text-[0.65rem] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 ${accent}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
                          <img src={img(mark, 200)} width={1024} height={1024} loading="lazy" alt={`${name} logo`} className="size-9 object-contain" />
                        </div>
                        <span className="min-w-0 font-bold leading-tight">{name}</span>
                      </div>
                    );
                  })}
                  {group.extra && (
                    <button
                      type="button"
                      onClick={() => setCmsOpen(true)}
                      className="group relative flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                    >
                      <span className="absolute -top-2.5 right-3 rounded-sm bg-[var(--color-23)] px-2 py-0.5 text-[0.65rem] font-medium opacity-0 transition-opacity group-hover:opacity-100">
                        {String(group.items.length + 1).padStart(2, "0")}
                      </span>
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-2xl font-bold">
                        +
                      </div>
                      <span className="min-w-0 font-bold leading-tight">{group.extra}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="scroll-mt-16 bg-secondary py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Heading n="02" title="Featured Work" sub="Selected examples of my work using the Duda website builder. They show my experience creating websites from scratch, working with AI-generated designs, and customizing pre-designed templates. I focus on clean, responsive, user-friendly sites that match each client's goals and brand identity." />
          <div className="space-y-16">
            {featured.map((p, i) => (
              <article
                key={p.title}
                className={`grid items-center gap-8 md:grid-cols-2 ${reveal}`}
              >
                <div
                  className={`overflow-hidden rounded-2xl border border-border bg-card shadow-xl ${i % 2 ? "md:order-2 md:rotate-1" : "md:-rotate-1"}`}
                >
                  <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                    <span className="size-2.5 rounded-full bg-[var(--color-22)]" />
                    <span className="size-2.5 rounded-full bg-[var(--color-23)]" />
                    <span className="size-2.5 rounded-full bg-[var(--color-19)]" />
                  </div>
                  <img
                    src={img(p.image, 800)}
                    srcSet={`${img(p.image, 800)} 800w, ${img(p.image, 1200)} 1200w`}
                    sizes="(min-width: 768px) 560px, 100vw"
                    width={1920}
                    height={1440}
                    loading="lazy"
                    alt={p.title}
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-6xl font-extrabold leading-none sm:text-8xl tracking-tighter text-border">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{p.title}</h3>
                  <p className="mt-3 text-lg text-muted-foreground">{p.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className={`mt-6 inline-flex h-12 items-center gap-2 rounded-full px-6 font-medium text-white shadow-md transition-transform hover:-translate-y-0.5 hover:opacity-90 ${accents[i % 5]}`}
                  >
                    View project <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="academic" className={`scroll-mt-16 py-24 ${grid}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Heading n="03" title="Academic Work" sub="Here are some of my academic projects showcasing my skills in UI/UX design and front-end development. I use Figma to create user interfaces and user experiences, while I use Figma, Canva, Photoshop, HTML, CSS, Tailwind CSS, and React to build responsive and functional websites." />
          <ul className="grid gap-6 md:grid-cols-2">
            {academic.map(({ slug, tag, title: course, text, details, image, cover, color }) => (
              <li
                key={slug}
                className={`group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl ${reveal}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img(cover ?? image, 800)}
                    width={552}
                    height={447}
                    loading="lazy"
                    alt={course}
                    className="aspect-[552/447] w-full bg-secondary object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className={`absolute left-4 top-4 rounded-sm px-2.5 py-1 text-xs font-medium text-white ${color}`}>
                    {tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-extrabold tracking-tight">{course}</h3>
                  {text && <p className="mt-2 text-muted-foreground">{text}</p>}
                  <dl className="mt-3 space-y-1 text-muted-foreground">
                    {details.map(([label, value]) => (
                      <div key={label}>
                        <dt className="inline font-bold text-foreground">{label}: </dt>
                        <dd className="inline">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    to="/academic/$slug"
                    params={{ slug }}
                    className={`mt-5 inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-white shadow-md transition-transform hover:-translate-y-0.5 hover:opacity-90 ${color}`}
                  >
                    View more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="graphics" className="scroll-mt-16 bg-secondary py-24 md:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Heading n="04" title="Graphic Works" sub="Posters, brand kits and illustrations. Tap any piece to see it larger." />
          <div className="grid grid-cols-2 items-start gap-4 md:grid-cols-4">
            {graphicColumns.map((col, c) => (
              <div key={c} className="flex flex-col gap-4">
                {col.map((i) => {
                  const g = graphics[i];
                  return (
                    <button
                      key={g.name}
                      type="button"
                      onClick={() => {
                        setView(0);
                        setOpen(i);
                      }}
                      className={`group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-md transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-105 ${i % 2 ? "md:translate-y-8 md:rotate-2" : "md:-rotate-2"} ${reveal}`}
                    >
                      <img
                        src={img(g.name, 600)}
                        width={g.w}
                        height={g.h}
                        loading="lazy"
                        alt={g.label}
                        className="w-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="block px-3 py-2 text-sm font-medium">{g.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {cmsOpen && (
        <div
          role="dialog"
          aria-label="Other CMS builders"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur animate-in fade-in"
          onClick={() => setCmsOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[var(--color-19)] px-4 py-3 text-white">
              <span className="font-bold">Other CMS builders.xlsx</span>
              <button
                type="button"
                onClick={() => setCmsOpen(false)}
                className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium hover:bg-white/30"
              >
                Close
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 bg-secondary">
                  <tr>
                    <th className="w-12 border border-border px-3 py-2 text-center font-medium text-muted-foreground" />
                    <th className="border border-border px-3 py-2 text-left font-bold">Builder</th>
                    <th className="border border-border px-3 py-2 text-left font-bold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {otherBuilders.map(([name, type], i) => (
                    <tr key={name} className="even:bg-secondary/40">
                      <td className="border border-border bg-secondary px-3 py-2 text-center text-muted-foreground">{i + 1}</td>
                      <td className="border border-border px-3 py-2 font-medium">{name}</td>
                      <td className="border border-border px-3 py-2 text-muted-foreground">{type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {shown && (
        <div
          role="dialog"
          aria-label={shown.label}
          className="fixed inset-0 z-50 flex flex-col items-center bg-background/95 p-4 backdrop-blur animate-in fade-in"
          onClick={() => setOpen(null)}
        >
          <div className="flex w-full max-w-4xl items-center justify-between py-2" onClick={(e) => e.stopPropagation()}>
            <div>
              <p className="font-bold">{shown.label}</p>
              <p className="text-sm text-muted-foreground">
                View {view + 1} of {viewCount}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Close
            </button>
          </div>
          <div className="relative flex min-h-0 w-full max-w-4xl flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Previous view"
              onClick={() => setView((v) => (v - 1 + viewCount) % viewCount)}
              className="absolute left-0 z-10 flex size-11 items-center justify-center rounded-full border border-border bg-card text-xl shadow-lg transition-transform hover:scale-110"
            >
              ←
            </button>
            <img
              key={shown.views[view]}
              src={img(shown.views[view], 1200)}
              alt={`${shown.label}, view ${view + 1}`}
              className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl animate-in fade-in"
            />
            <button
              type="button"
              aria-label="Next view"
              onClick={() => setView((v) => (v + 1) % viewCount)}
              className="absolute right-0 z-10 flex size-11 items-center justify-center rounded-full border border-border bg-card text-xl shadow-lg transition-transform hover:scale-110"
            >
              →
            </button>
          </div>
          <div className="flex gap-3 py-4" onClick={(e) => e.stopPropagation()}>
            {shown.views.map((v, i) => (
              <button
                key={v}
                type="button"
                aria-label={`Show view ${i + 1}`}
                aria-current={i === view}
                onClick={() => setView(i)}
                className={`size-16 overflow-hidden rounded-lg border-2 transition-all sm:size-20 ${i === view ? "border-foreground" : "border-border opacity-60 hover:opacity-100"}`}
              >
                <img src={img(v, 200)} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}


      <section id="about" className={`scroll-mt-16 py-24 ${grid}`}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[2fr_3fr]">
          <div className={`relative w-full max-w-sm ${reveal}`}>
            <img
              src="/portrait.png"
              width={896}
              height={1152}
              loading="lazy"
              alt="Portrait of Yvosh"
              className="w-full rounded-2xl border border-border object-cover shadow-xl"
            />
            <span className="absolute -right-3 top-8 rounded-sm bg-[var(--color-19)] px-2.5 py-1 text-xs font-medium text-white shadow-sm">
              Yvosh
            </span>
            <span className="absolute -left-3 bottom-10 rounded-sm bg-[var(--color-20)] px-2.5 py-1 text-xs font-medium text-white shadow-sm">
              Designer + Developer
            </span>
          </div>
          <div className={reveal}>
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-sm bg-[var(--color-23)] px-2.5 py-1 text-xs font-medium">
              <svg viewBox="0 0 12 12" className="size-3 fill-current" aria-hidden="true">
                <path d="M1 1l9 3.5-3.8 1.7L4.5 10z" />
              </svg>
              05
            </span>
            <h2 className="text-4xl font-extrabold tracking-tighter min-[420px]:text-5xl sm:text-7xl">
              About Me<span className="text-[var(--color-21)]">.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground whitespace-pre-line">
              {"I am a Senior Analyst – Web Designer with experience in website design, development, customization, and maintenance. My primary expertise lies in Duda, where I create clean, professional, and responsive websites from scratch, using themed templates, or AI-generated designs.In addition to Duda, I work with various website builders and Content Management Systems (CMS), including WordPress, Wix, Squarespace, Shopify, Odoo, and other similar platforms. My responsibilities include website modifications, content updates, layout adjustments, design customization, basic SEO optimization, and plugin updates to maintain website performance, functionality, and overall quality.\n\nI am committed to delivering functional, visually appealing websites while continuously improving my skills and adapting to new technologies."}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
              {[
                ["65+", "Website Builts"],
                ["250+", "Modifications & Counting"],
                ["2+", "Year Learning"],
              ].map(([num, label]) => (
                <div key={label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="text-3xl font-extrabold tracking-tighter sm:text-4xl">{num}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Web design", "UI / UX", "Front-end", "Branding", "Illustration"].map((s, i) => (
                <span
                  key={s}
                  className={`rounded-sm px-2.5 py-1 text-xs font-medium text-white ${accents[i % accents.length]}`}
                >
                  {s}
                </span>
              ))}
            </div>
<a
  href="mailto:cailayvosh@gmail.com"
  className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground transition-opacity hover:opacity-85"
>
  Contact Me
</a>
          </div>
        </div>
      </section>

    </div>
  );
}
