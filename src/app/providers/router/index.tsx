import { routeTree } from "@/app/routerTree.gen";
import {
  createRouter,
  RouterProvider as TanStackRouterProvider,
} from "@tanstack/react-router";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    auth?: {
      tab: "login" | "registration";
    };
  }
}

const router = createRouter({ routeTree });

export const RouterProvider = () => <TanStackRouterProvider router={router} />;
