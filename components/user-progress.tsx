import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";


type Props = {
    activeCourse: {imageSrc: string; title:string};  // TODO: Trocar por DB types
    hearts: number;
}

export const UserProgress = ({
    activeCourse, 
    hearts
    
    }:Props) => {
    return(
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
                <Button variant = "ghost">
                    <Image 
                        src = {activeCourse.imageSrc}
                        alt = {activeCourse.title}
                        className="rounded-md border"
                        width={32}
                        height={32}
                    />
                </Button>
            </Link>

            <Link href="/courses">
                <Button variant = "ghost" className="text-rose-500">
                    <Image src="/heart.svg" height={22} width = {22} alt = "Hearts"
                     className="mr-2"
                    />
                    {hearts}
                </Button>
            </Link>
            
        </div>
    )
}