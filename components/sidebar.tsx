import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import {
    ClerkLoading,
    ClerkLoaded,
    UserButton,
} from "@clerk/nextjs";
import {Loader} from "lucide-react";

type Props = {
    className?: string;
}

export const SideBar = ({className}: Props) => {
    return (
        <div className={cn(
            "flex h-full right-0 top-0 px-4 border-l-2 flex-col lg:bg-white",
            className,
        )}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/default_logo.png" height={40} width={40} alt="Mascot"/>
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                        BioOlhar
                    </h1>
                </div>
            </Link>    
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem 
                    label={"Conteúdo 1"} 
                    iconSrc={"/learn.svg"} 
                    href={"/learn"}/>
                <SidebarItem 
                    label={"Conteúdo 2"} 
                    iconSrc={"/learn.svg"} 
                    href={"/learn"}/>
                <SidebarItem 
                    label={"Conteúdo 3"} 
                    iconSrc={"/learn.svg"} 
                    href={"/learn"}/>
                <SidebarItem 
                    label={"Conteúdo 4"} 
                    iconSrc={"/learn.svg"} 
                    href={"/learn"}/>
                <SidebarItem 
                    label={"Conteúdo 5"} 
                    iconSrc={"/learn.svg"} 
                    href={"/learn"}/>
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton/>
                </ClerkLoaded>
            </div>
        </div>
    );
};