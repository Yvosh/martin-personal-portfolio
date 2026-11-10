import { Fragment, useEffect, useState } from "react";
import { img } from "@/data/projects";

export function Gallery({
  images,
  title,
  sections,
}: {
  images: string[];
  title: string;
  sections?: { title: string; start: number }[];
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const count = images.length;
  const sectionAt = (i: number) => sections?.find((sec) => sec.start === i);
  const sectionOf = (i: number) => (sections ? [...sections].reverse().find((sec) => sec.start <= i) : undefined);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") setActive((v) => (v + 1) % count);
      if (e.key === "ArrowLeft") setActive((v) => (v - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, count]);

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <button
          type="button"
          onClick={() => setZoom(true)}
          aria-label="Open image larger"
          className="block cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
        >
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-[var(--color-22)]" />
            <span className="size-2.5 rounded-full bg-[var(--color-23)]" />
            <span className="size-2.5 rounded-full bg-[var(--color-19)]" />
          </div>
          <img
            key={images[active]}
            src={img(images[active], 1200)}
            srcSet={`${img(images[active], 800)} 800w, ${img(images[active], 1200)} 1200w, ${img(images[active], 1920)} 1920w`}
            sizes="(min-width: 1024px) 760px, 100vw"
            fetchPriority={active === 0 ? "high" : undefined}
            alt={`${title}, image ${active + 1}`}
            className="aspect-[4/3] w-full bg-secondary object-contain animate-in fade-in"
          />
        </button>
        <ul className="grid max-h-none grid-cols-4 gap-3 sm:grid-cols-6 lg:max-h-[560px] lg:grid-cols-2 lg:overflow-y-auto lg:pr-1">
          {images.map((name, i) => (
            <Fragment key={`${name}-${i}`}>
            {sectionAt(i) && (
              <li className="col-span-full pt-2 text-sm font-extrabold uppercase tracking-wide first:pt-0">{sectionAt(i)?.title}</li>
            )}
            <li>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setZoom(true);
                }}
                aria-label={`Open image ${i + 1} larger`}
                className={`block w-full overflow-hidden rounded-lg border-2 transition-all hover:-translate-y-0.5 ${i === active ? "border-foreground" : "border-border opacity-70 hover:opacity-100"}`}
              >
                <img
                  src={img(name, 400)}
                  loading={i === 0 ? undefined : "lazy"}
                  alt=""
                  className="aspect-[4/3] w-full bg-secondary object-contain"
                />
              </button>
            </li>
            </Fragment>
          ))}
        </ul>
      </div>

      {zoom && (
        <div
          role="dialog"
          aria-label={title}
          className="fixed inset-0 z-50 flex flex-col items-center bg-background/95 p-4 backdrop-blur animate-in fade-in"
          onClick={() => setZoom(false)}
        >
          <div className="flex w-full max-w-5xl items-center justify-between py-2" onClick={(e) => e.stopPropagation()}>
            <div>
              <p className="font-bold">{title}</p>
              <p className="text-sm text-muted-foreground">
                {sectionOf(active)?.title ? `${sectionOf(active)?.title} · ` : ""}
                {active + 1} of {count}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setZoom(false)}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Close
            </button>
          </div>
          <div className="relative flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => setActive((v) => (v - 1 + count) % count)}
              className="absolute left-0 z-10 flex size-11 items-center justify-center rounded-full border border-border bg-card text-xl shadow-lg transition-transform hover:scale-110"
            >
              ←
            </button>
            <img
              key={images[active]}
              src={img(images[active], 1920)}
              alt={`${title}, image ${active + 1}`}
              className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl animate-in fade-in"
            />
            <button
              type="button"
              aria-label="Next image"
              onClick={() => setActive((v) => (v + 1) % count)}
              className="absolute right-0 z-10 flex size-11 items-center justify-center rounded-full border border-border bg-card text-xl shadow-lg transition-transform hover:scale-110"
            >
              →
            </button>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto py-4" onClick={(e) => e.stopPropagation()}>
            {images.map((name, i) => (
              <button
                key={`${name}-${i}`}
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${i === active ? "border-foreground" : "border-border opacity-60 hover:opacity-100"}`}
              >
                <img src={img(name, 200)} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}