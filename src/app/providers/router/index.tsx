import { routeTree } from "@/app/routerTree.gen";
import {
  createRouter,
  RouterProvider as TanStackRouterProvider,
} from "@tanstack/react-router";

const router = createRouter({ routeTree });

export const RouterProvider = () => <TanStackRouterProvider router={router} />;
