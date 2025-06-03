import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "src/pages",
      generatedRouteTree: "src/shared/router/routerTree.gen.ts",
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        exportType: "named",
        ref: true,
        titleProp: true,
      },
      include: "**/*.svg",
      exclude: "**/*.svg?default",
    }),
  ],
  server: {
    port: 3030,
  },
});
