import { createRootRouteWithContext } from "@tanstack/react-router";

import { RootLayout } from "./-layouts";

export const Route = createRootRouteWithContext()({
  errorComponent: () => <div>Something went wrong</div>,
  component: RootLayout,
});
