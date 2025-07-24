"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
    label: string;
    iconSrc: string;
    href: string;
    disabled?: boolean;
};

export const SidebarItem = ({label, iconSrc, href, disabled = false} : Props) => {
    const pathname = usePathname();
    const active = pathname === href;
    
    return (
        <Button
            variant={active ? "default" : "sidebar"}
            className={cn(
                "justify-start h-[52px]",
                disabled && "opacity-50 cursor-not-allowed"
            )}
            asChild={!disabled}
            disabled={disabled}
        >
            {disabled ? (
                <div className="flex items-center">
                    <Image
                        src={iconSrc}
                        alt={label}
                        className="mr-5"
                        height={32}
                        width={32}
                    />
                    {label}
                </div>
            ) : (
                <Link href={href}> 
                    <Image
                        src={iconSrc}
                        alt={label}
                        className="mr-5"
                        height={32}
                        width={32}
                    />
                    {label} 
                </Link>
            )}
        </Button>
    );
};