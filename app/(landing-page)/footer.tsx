import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return (

        //Em app-devices o footer não será visível (hidden)
        <footer   className="hidden lg:block h-20 w-full p-2"
        style={{
          borderTop: '1px solid #3BBD57',
          background: 'linear-gradient(295.36deg, rgba(0, 217, 0, 0) -262.38%, rgba(0, 68, 0, 0.15) 195.96%)'
        }}>

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

                <Button size = "lg" variant="ghost" >
                    <Image 
                        src="/polvo.png" 
                        alt= "polvo"
                        height={32} 
                        width={40}
                        className ="mr-4 rounded-md"
                    />
                    <span className="-translate-x-2 text">Moluscos</span>
                </Button>

                
            </div>
        </footer>

    );
};