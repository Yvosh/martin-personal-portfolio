import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import settings from "@/config/settings.json";
import { academic, galleryFor, img } from "@/data/projects";
import { Gallery } from "@/components/gallery";
import { NotFound } from "@/components/blocks/not-found";

export const Route = createFileRoute("/academic/$slug")({
  loader: ({ params }) => {
    const project = academic.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    const entry = settings.routes["/academic/$slug"];
    if (!loaderData) return entry;
    const title = `${loaderData.title} | Academic Work | Yvosh`;
    const description =
      loaderData.text ||
      `${loaderData.title}, an academic project by Yvosh. ${loaderData.details.map(([l, v]) => `${l}: ${v}`).join(". ")}.`;
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
  component: AcademicPage,
  notFoundComponent: () => <NotFound fullHeight={false} />,
});

function AcademicPage() {
  const project = Route.useLoaderData();
  const index = academic.findIndex((p) => p.slug === project.slug);
  const next = academic[(index + 1) % academic.length];
  const prev = academic[(index - 1 + academic.length) % academic.length];

  return (
    <div className="min-h-svh bg-background text-foreground">

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <span className={`mb-4 inline-flex rounded-sm px-2.5 py-1 text-xs font-medium text-white ${project.color}`}>
          {project.tag}
        </span>
        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl">
          {project.title}
          <span className="text-[var(--color-21)]">.</span>
        </h1>
        {project.text && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{project.text}</p>}
        <dl className="mt-5 space-y-1 text-lg text-muted-foreground">
          {project.details.map(([label, value]) => (
            <div key={label}>
              <dt className="inline font-bold text-foreground">{label}: </dt>
              <dd className="inline">{value}</dd>
            </div>
          ))}
        </dl>

        {project.site ? (
          <>
            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="size-2.5 rounded-full bg-[var(--color-22)]" />
                <span className="size-2.5 rounded-full bg-[var(--color-23)]" />
                <span className="size-2.5 rounded-full bg-[var(--color-19)]" />
                <span className="ml-3 truncate rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                  {project.site.url}
                </span>
              </div>
              <div className="max-h-[80vh] overflow-y-auto">
                <img
                  src={img(project.site.image, 1200)}
                  srcSet={`${img(project.site.image, 800)} 800w, ${img(project.site.image, 1200)} 1200w, ${img(project.site.image, 1920)} 1920w`}
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  width={1920}
                  height={project.site.height}
                  alt={`${project.title} website`}
                  className="w-full"
                />
              </div>
            </div>
            <a
              href={project.site.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-21)] px-6 font-medium text-white shadow-md transition-transform hover:-translate-y-0.5 hover:opacity-90"
            >
              Visit website <span aria-hidden="true">↗</span>
            </a>
          </>
        ) : (
          <>
            <h2 className="mb-6 mt-14 text-2xl font-extrabold tracking-tight">Gallery</h2>
            <Gallery sections={project.gallerySections} images={project.gallery ?? galleryFor(project.image, index)} title={project.title} />
          </>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/academic/$slug"
            params={{ slug: prev.slug }}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 font-medium transition-colors hover:bg-secondary"
          >
            <span aria-hidden="true">←</span> Prev: {prev.title}
          </Link>
          <Link
            to="/academic/$slug"
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