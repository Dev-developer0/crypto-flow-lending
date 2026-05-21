import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      window.location.replace("/login");
    }
  },
  component: () => null,
});

