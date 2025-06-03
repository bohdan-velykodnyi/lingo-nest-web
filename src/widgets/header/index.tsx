import { Logo } from "@/shared/icons";
import { useBreakpoint } from "@/shared/lib";
import { Button } from "@/shared/ui/kit/button";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import { MenuIcon } from "lucide-react";

export const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { isAboveMd } = useBreakpoint("md");

  if (isAboveMd) {
    return null;
  }

  return (
    <div className="fixed h-16 top-0 z-50 w-full bg-white p-6 shadow-md dark:bg-background flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <div className="flex">
        <Logo className="w-[60px] [&_g]:!fill-[#4f46e5] dark:[&_g]:!fill-[#818cf8]" />
        <span className="text-xl font-bold font-[borel] text-[#4f46e5] dark:text-[#818cf8] mt-3">
          NestLingo
        </span>
      </div>

      <Button variant="ghost" onClick={toggleSidebar}>
        <MenuIcon />
      </Button>
    </div>
  );
};
