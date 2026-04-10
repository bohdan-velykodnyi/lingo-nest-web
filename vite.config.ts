import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "src/pages",
      generatedRouteTree: "src/shared/router/routerTree.gen.ts",
    }),
    react(),
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
  optimizeDeps: {
    include: ["lucide-react"],
  },
  resolve: {
    tsconfigPaths: true,
  },
  oxc: {
    jsx: "preserve",
  },
  server: {
    port: 3030,
  },
});
