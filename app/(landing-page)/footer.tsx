import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return (

        //Em app-devices o footer não será visível (hidden)
        <footer className = "hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className = "pl-10 max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size = "lg" variant="ghost" >
                    <Image 
                        src="/esponja.png" 
                        alt= "esponja"
                        height={32} 
                        width={40}
                        className ="mr-4 rounded-md"
                    />
                    <span className="-translate-x-2">Poríferos</span>
                </Button>

                <Button size = "lg" variant="ghost">
                    <Image 
                        src="/jellyfish.svg" 
                        alt= "jellyfish"
                        height={32} 
                        width={40}
                        className ="mr-4 rounded-md"
                    />
                    <span className="-translate-x-2">Cnidários</span>
                </Button>

                <Button size = "lg" variant="ghost">
                    <Image 
                        src="/planaria.png" 
                        alt= "planaria"
                        height={32} 
                        width={40}
                        className ="mr-4 rounded-md"
                    />
                    <span className="-translate-x-2">Platelmintos</span>
                </Button>

                <Button size = "lg" variant="ghost" >
                    <Image 
                        src="/nemertea.png" 
                        alt= "nemertea"
                        height={30} 
                        width={38}
                        className ="mr-4 rounded-md"
                    />
                    <span className="-translate-x-2">Chaetognathas & Nemerteas</span>
                </Button>

                <Button size = "lg" variant="ghost">
                    <Image 
                        src="/polvo.png" 
                        alt= "polvo"
                        height={32} 
                        width={40}
                        className ="mr-4 rounded-md"
                    />
                    <span className="-translate-x-2">Moluscos</span>
                </Button>

                
            </div>
        </footer>

    );
};