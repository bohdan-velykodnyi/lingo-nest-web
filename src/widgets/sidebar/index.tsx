import type * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/shared/ui/kit/sidebar";

import {
  SidebarAvatar,
  SidebarHeader,
  SidebarList,
  SidebarUpgradePlan,
} from "./ui";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => (
  <div>
    <Sidebar collapsible="offcanvas" className="border-r-0" {...props}>
      <SidebarHeader />

      <SidebarContent className="bg-gradient-to-b from-sidebar-background to-sidebar-background/95">
        <SidebarList />
        <SidebarUpgradePlan />
      </SidebarContent>

      <SidebarAvatar />
      <SidebarRail />
    </Sidebar>
  </div>
);
