/**
 * Default /sitemap.xml — indexable routes from settings.json, every visible content entry, and every public database record page.
 * `?include=noindex` also lists no-indexed routes and entries; the editor's page picker asks for it. Search engines never do.
 */
import { createFileRoute } from "@tanstack/react-router";
import settings from "@/config/settings.json";

// The content engine exists only once a content folder does; until then the glob matches nothing.
// Safe here only because this route has server handlers and no component: nothing reaches the browser.
const contentEngine = import.meta.glob<{ sitemapEntries: (options?: { includeNoindex?: boolean }) => SitemapEntry[] }>("/src/services/content.ts", { eager: true });

// The host fills in the site's publish date. Never replace, compute or remove it.
const PUBLISH_DATE_PLACEHOLDER = "__SITE_PUBLISH_DATE__";

type SitemapEntry = {
  path: string;
  lastmod?: string;
};

type MetaEntry = {
  name?: string;
  content?: string;
};

type RouteEntry = {
  meta?: MetaEntry[];
};

type SettingsFile = {
  site?: { meta?: MetaEntry[] };
  routes?: Record<string, RouteEntry | undefined>;
};

const XML_HEADERS = {
  "content-type": "application/xml; charset=utf-8",
  "x-content-type-options": "nosniff",
} as const;

function robotsEntries(meta: MetaEntry[] | undefined): MetaEntry[] {
  return (meta ?? []).filter((entry) => entry.name === "robots");
}

/** A route's own robots entry replaces the site-wide one, as TanStack's head merge does. */
function isNoindex(routeMeta: MetaEntry[] | undefined, siteMeta: MetaEntry[] | undefined): boolean {
  const robots = robotsEntries(routeMeta);
  return (robots.length > 0 ? robots : robotsEntries(siteMeta)).some((entry) =>
    String(entry.content ?? "")
      .split(/[, \t\r\n]+/)
      .some((token) => {
        const directive = token.toLowerCase();
        return directive === "noindex" || directive === "none";
      }),
  );
}

function isIndexablePath(path: string): boolean {
  if (!path.startsWith("/") || path.startsWith("//")) {
    return false;
  }
  if (/[?#\s$]/.test(path)) {
    return false;
  }
  if (path === "/sitemap.xml" || path === "/api" || path.startsWith("/api/")) {
    return false;
  }
  return !path.split("/").some((segment) => segment === "..");
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Origin plus any prefix the request was served under. `/sitemap.xml` at the domain root is just the origin. */
function requestBase(request: Request): string {
  const url = new URL(request.url);
  return `${url.origin}${url.pathname.replace(/\/sitemap\.xml\/?$/i, "")}`;
}

function locFor(base: string, path: string): string | undefined {
  try {
    const root = new URL(base.endsWith("/") ? base : `${base}/`);
    const url = new URL(path === "/" ? "./" : path.slice(1), root);
    if (url.origin !== root.origin) {
      return undefined;
    }
    return url.href;
  } catch {
    return undefined;
  }
}

function comparePaths(left: string, right: string): number {
  if (left === "/") {
    return -1;
  }
  if (right === "/") {
    return 1;
  }
  return left.localeCompare(right);
}

/** An entry page's static head is its folder's `$slug` settings entry, as the content skill wires it. */
function slugRouteKey(entryPath: string): string {
  return `${entryPath.slice(0, entryPath.lastIndexOf("/"))}/$slug`;
}

function contentEntries({ site, routes = {} }: SettingsFile, includeNoindex: boolean): SitemapEntry[] {
  return Object.values(contentEngine)
    .flatMap((engine) => engine.sitemapEntries({ includeNoindex }))
    .filter(({ path }) => includeNoindex || !isNoindex(routes[slugRouteKey(path)]?.meta, site?.meta));
}

/** One entry per public database row that has its own detail page, read at request time (see the `vibe-database` skill). */
async function recordPaths(): Promise<SitemapEntry[]> {
  return [];
}

function urlXml(loc: string, lastmod: string | undefined): string {
  const lastmodXml = lastmod ? `\n      <lastmod>${escapeXml(lastmod)}</lastmod>` : "";
  return `    <url>\n      <loc>${escapeXml(loc)}</loc>${lastmodXml}\n    </url>`;
}

function buildSitemapXml(base: string, file: SettingsFile, records: SitemapEntry[], includeNoindex: boolean): string {
  const { site, routes = {} } = file;
  const settingsEntries = Object.keys(routes)
    .sort(comparePaths)
    .filter((path) => isIndexablePath(path) && (includeNoindex || !isNoindex(routes[path]?.meta, site?.meta)))
    .map((path) => ({ path, lastmod: PUBLISH_DATE_PLACEHOLDER }));
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const { path, lastmod } of [...settingsEntries, ...contentEntries(file, includeNoindex), ...records.filter(({ path }) => isIndexablePath(path))]) {
    const loc = locFor(base, path);
    if (!loc || seen.has(loc)) {
      continue;
    }
    seen.add(loc);
    urls.push(urlXml(loc, lastmod));
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

async function sitemapResponse(request: Request): Promise<Response> {
  const includeNoindex = new URL(request.url).searchParams.get("include") === "noindex";
  const xml = buildSitemapXml(requestBase(request), settings as SettingsFile, await recordPaths(), includeNoindex);
  return new Response(xml, { headers: XML_HEADERS });
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => sitemapResponse(request),
      HEAD: ({ request }) => sitemapResponse(request),
    },
  },
});