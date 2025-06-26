import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { SideBar } from "@/components/sidebar";
  import { Bars3Icon } from "@heroicons/react/24/solid";
  
  export const MobileSideBar = () => {
    return (
      <Sheet>
        <SheetTrigger className="p-2 text-white hover:bg-green-600 rounded-md">
          <Bars3Icon className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent className="p-0 z-[100]" side="right">
          <SideBar />
        </SheetContent>
      </Sheet>
    );
  };