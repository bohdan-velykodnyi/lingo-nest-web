import { Logo } from "@/shared/icons";
import { SidebarHeader as SidebarHeaderLib } from "@/shared/ui/kit/sidebar";

export const SidebarHeader = () => (
  <SidebarHeaderLib className="border-b border-sidebar-border pt-4">
    <div className="items-center justify-center justify-items-center ">
      <Logo className="w-[80px] [&_g]:!fill-[#4f46e5] dark:[&_g]:!fill-[#818cf8]" />
      <span className="text-2xl font-bold font-[borel] text-[#4f46e5] dark:text-[#818cf8] mt-3">
        NestLingo
      </span>
    </div>
  </SidebarHeaderLib>
);
