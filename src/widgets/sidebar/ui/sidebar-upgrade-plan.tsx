import { Button } from "@/shared/ui/kit/button";
import { Card } from "@/shared/ui/kit/card";
import { SidebarGroup, SidebarGroupContent } from "@/shared/ui/kit/sidebar";
import { Sparkles } from "lucide-react";

export const SidebarUpgradePlan = () => (
  <SidebarGroup className="mt-auto">
    <SidebarGroupContent>
      <Card className="p-0">
        <div className="mx-2 mb-2 rounded-lg p-4 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Upgrade to Pro</span>
          </div>
          <p className="text-xs mb-3">
            Unlock advanced features and unlimited lessons
          </p>
          <Button size="sm" className="w-full">
            Upgrade Now
          </Button>
        </div>
      </Card>
    </SidebarGroupContent>
  </SidebarGroup>
);
