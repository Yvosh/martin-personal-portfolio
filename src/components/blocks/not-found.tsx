import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  Link,
  useCanGoBack,
  useHydrated,
  useRouter,
  type LinkProps,
} from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, House } from "lucide-react";
import * as React from "react";

type NotFoundHref = NonNullable<LinkProps["to"]> | `#${string}`;

type NotFoundAction = {
  label: string;
  href: NotFoundHref;
};

type NotFoundLink = NotFoundAction & {
  description?: string;
};

type NotFoundVariant = "centered" | "split";
type NotFoundCodeTone = "foreground" | "primary" | "muted";

type NotFoundProps = React.ComponentProps<"section"> & {
  code?: string;
  heading?: string;
  description?: string;
  headingLevel?: "h1" | "h2" | "h3";
  variant?: NotFoundVariant;
  codeTone?: NotFoundCodeTone;
  homeLink?: NotFoundAction | null;
  backLabel?: string;
  links?: NotFoundLink[];
  linksLabel?: string;
  media?: React.ReactNode;
  fullHeight?: boolean;
};

const CODE_TONE: Record<NotFoundCodeTone, string> = {
  foreground: "text-foreground",
  primary: "text-primary",
  muted: "text-muted-foreground",
};

function NotFoundAnchor({
  href,
  className,
  children,
}: {
  href: NotFoundHref;
  className?: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href as LinkProps["to"]} className={className}>
      {children}
    </Link>
  );
}

function NotFound({
  code = "404",
  heading = "Page not found",
  description = "The page you're looking for doesn't exist or has moved.",
  headingLevel: Heading = "h1",
  variant = "centered",
  codeTone = "foreground",
  homeLink = { label: "Back to home", href: "/" },
  backLabel,
  links = [],
  linksLabel = "Try one of these pages",
  media,
  fullHeight = true,
  className,
  ...props
}: NotFoundProps) {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  // The server cannot know the visitor's history, so the back button waits for
  // hydration rather than differing between the two renders.
  const hydrated = useHydrated();
  const showBack = Boolean(backLabel) && hydrated && canGoBack;

  const codeText = code.trim();
  const headingText = heading.trim();
  const descriptionText = description.trim();
  const suggestions = links.filter((link) => link.label.trim() && link.href);
  const split = variant === "split" && Boolean(media);

  if (!codeText && !headingText) return null;

  return (
    <section
      data-slot="not-found"
      className={cn(
        "w-full bg-background px-4 py-16 md:px-8 md:py-24",
        fullHeight && "flex min-h-svh items-center",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full",
          split
            ? "grid max-w-5xl items-center gap-10 md:grid-cols-2"
            : "max-w-xl text-center"
        )}
      >
        {media && !split && (
          <div
            data-slot="not-found-media"
            className="mb-10 flex min-w-0 justify-center"
          >
            {media}
          </div>
        )}
        <div className="min-w-0">
          {codeText && (
            <p
              data-slot="not-found-code"
              className={cn(
                "font-display font-bold leading-none tracking-tight text-[clamp(3.5rem,16vw,8rem)]",
                CODE_TONE[codeTone]
              )}
            >
              {codeText}
            </p>
          )}
          {headingText && (
            <Heading
              data-slot="not-found-heading"
              className="mt-4 font-display text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
            >
              {headingText}
            </Heading>
          )}
          {descriptionText && (
            <p
              data-slot="not-found-description"
              className="mt-3 text-base text-muted-foreground"
            >
              {descriptionText}
            </p>
          )}
          {(homeLink || showBack) && (
            <div
              data-slot="not-found-actions"
              className={cn(
                "mt-8 flex flex-wrap items-center gap-3",
                !split && "justify-center"
              )}
            >
              {homeLink && (
                <Button
                  nativeButton={false}
                  render={
                    homeLink.href.startsWith("#") ? (
                      <a href={homeLink.href}>
                        <House aria-hidden />
                        {homeLink.label}
                      </a>
                    ) : (
                      <Link to={homeLink.href as LinkProps["to"]}>
                        <House aria-hidden />
                        {homeLink.label}
                      </Link>
                    )
                  }
                />
              )}
              {showBack && (
                <Button variant="outline" onClick={() => router.history.back()}>
                  <ArrowLeft aria-hidden />
                  {backLabel}
                </Button>
              )}
            </div>
          )}
          {suggestions.length > 0 && (
            <div
              data-slot="not-found-links"
              className={cn("mt-10 text-left", !split && "mx-auto max-w-sm")}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {linksLabel}
              </p>
              <ul className="mt-3 divide-y border-y">
                {suggestions.map((link, index) => (
                  <li
                    key={`${link.label}-${index}`}
                    data-slot="not-found-link"
                    className="min-w-0"
                  >
                    <NotFoundAnchor
                      href={link.href}
                      className="flex min-w-0 items-center justify-between gap-4 rounded-sm px-1 py-3 outline-none transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <span className="min-w-0 break-words">
                        <span className="block text-sm font-medium text-foreground">
                          {link.label}
                        </span>
                        {link.description && (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {link.description}
                          </span>
                        )}
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="size-4 shrink-0 text-muted-foreground"
                      />
                    </NotFoundAnchor>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {media && split && (
          <div data-slot="not-found-media" className="min-w-0">
            {media}
          </div>
        )}
      </div>
    </section>
  );
}

export { NotFound };
export type { NotFoundProps, NotFoundAction, NotFoundLink };