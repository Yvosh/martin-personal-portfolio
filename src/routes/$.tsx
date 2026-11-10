import { createFileRoute, notFound } from "@tanstack/react-router";
import settings from "@/config/settings.json";
import { NotFound } from "@/components/blocks/not-found";

export const Route = createFileRoute("/$")({
  head: () => settings.routes["/$"],
  loader: () => {
    throw notFound();
  },
  notFoundComponent: () => <NotFound fullHeight={false} />,
});