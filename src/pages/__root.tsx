import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext()({
  errorComponent: () => <div>Something went wrong</div>,
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
