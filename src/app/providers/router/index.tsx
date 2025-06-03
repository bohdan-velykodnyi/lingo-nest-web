import { router } from "@/shared/router";
import { RouterProvider as TanStackRouterProvider } from "@tanstack/react-router";

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

export const RouterProvider = () => <TanStackRouterProvider router={router} />;
