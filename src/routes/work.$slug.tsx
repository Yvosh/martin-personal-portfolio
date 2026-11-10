import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import settings from "@/config/settings.json";
import { featured, img } from "@/data/projects";
import { NotFound } from "@/components/blocks/not-found";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = featured.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    const entry = settings.routes["/work/$slug"];
    if (!loaderData) return entry;
    const title = `${loaderData.title} | Yvosh`;
    const description = loaderData.text;
    return {
      ...entry,
      meta: [
        ...entry.meta,
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: WorkPage,
  notFoundComponent: () => <NotFound fullHeight={false} />,
});

function WorkPage() {
  const project = Route.useLoaderData();
  const index = featured.findIndex((p) => p.slug === project.slug);
  const next = featured[(index + 1) % featured.length];
  const prev = featured[(index - 1 + featured.length) % featured.length];

  return (
    <div className="min-h-svh bg-background text-foreground">

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <span className="mb-4 inline-flex rounded-sm bg-[var(--color-21)] px-2.5 py-1 text-xs font-medium text-white">
          Featured Work {String(index + 1).padStart(2, "0")}
        </span>
        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl">
          {project.title}
          <span className="text-[var(--color-21)]">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{project.text}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-sm">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-[var(--color-22)]" />
            <span className="size-2.5 rounded-full bg-[var(--color-23)]" />
            <span className="size-2.5 rounded-full bg-[var(--color-19)]" />
            <span className="ml-3 truncate rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
              {project.url || "Live link coming soon"}
            </span>
          </div>
          <div className="max-h-[80vh] overflow-y-auto">
            <img
              src={img(project.image, 1200)}
              srcSet={`${img(project.image, 800)} 800w, ${img(project.image, 1200)} 1200w, ${img(project.image, 1920)} 1920w`}
              sizes="(min-width: 1152px) 1152px, 100vw"
              width={1920}
              height={project.imageHeight}
              fetchPriority="high"
              alt={`${project.title} website`}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-21)] px-6 font-medium text-white shadow-md transition-transform hover:-translate-y-0.5 hover:opacity-90"
            >
              Visit website <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="inline-flex h-12 items-center rounded-full border border-dashed border-border px-6 text-muted-foreground">
              Live link coming soon
            </span>
          )}
          <Link
            to="/work/$slug"
            params={{ slug: prev.slug }}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 font-medium transition-colors hover:bg-secondary"
          >
            <span aria-hidden="true">←</span> Prev: {prev.title}
          </Link>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 font-medium transition-colors hover:bg-secondary"
          >
            Next: {next.title} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}