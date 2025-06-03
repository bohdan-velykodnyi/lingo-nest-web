import { Outlet } from "@tanstack/react-router";

import { DevTools } from "./dev-tools";

export const RootLayout = () => (
  <div className="bg-gradient-to-b from-[#eef2ff] to-[#dbeafe] dark:from-[#2d3345]/20 dark:to-[#3b415c]/30 min-h-screen">
    <Outlet />
    <DevTools />
  </div>
);
