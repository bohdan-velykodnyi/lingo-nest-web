import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routerTree.gen";

export const router = createRouter({ routeTree });
