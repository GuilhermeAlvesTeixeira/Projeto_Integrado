import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";

import {SideBar} from "@/components/sidebar"
import { Menu } from "lucide-react";

export const MobileSideBar = () => {
    return (
        <Sheet>

            <SheetTrigger>
                <Menu className = "text-white"/>
            </SheetTrigger>
    
            <SheetContent className = "p-0 z-[100]" side="left">
            <SheetTitle className = "p-0 z-[100]"> Menu </SheetTitle>
                <SideBar />
            </SheetContent>

        </Sheet>
    );
};