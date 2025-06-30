import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SideBar } from "@/components/sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useTheme } from "@/components/theme-context";

export const MobileSideBar = () => {
  const { theme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger className={`p-2 rounded-md transition-colors ${
        theme === 'light' 
          ? 'text-white hover:bg-green-600' 
          : theme === 'dark' 
          ? 'text-white hover:bg-green-800' 
          : 'text-yellow-400 hover:bg-gray-800'
      }`}>
        <Bars3Icon className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="right">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};