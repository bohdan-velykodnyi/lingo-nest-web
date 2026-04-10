import { CONFIG } from "@/shared/config";
import { lazy, Suspense } from "react";

const TanStackRouterDevtools = CONFIG.DEV_TOOLS_ENABLED
  ? lazy(() =>
      import("@tanstack/react-router-devtools").then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : () => null;

export const DevTools = () => (
  <Suspense fallback={null}>
    <TanStackRouterDevtools />
  </Suspense>
);
