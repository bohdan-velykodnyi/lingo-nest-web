import { CONFIG } from "@/shared/config";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const DevTools = () =>
  CONFIG.DEV_TOOLS_ENABLED && <TanStackRouterDevtools />;
