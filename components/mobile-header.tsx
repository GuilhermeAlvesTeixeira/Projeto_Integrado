import { MobileSideBar } from "./mobile-sidebar";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  AcademicCapIcon,
  Bars3Icon
} from "@heroicons/react/24/solid";

export const MobileHeader = () => {
  return (
    <nav className="px-4 sm:px-6 h-[50px] flex items-center bg-green-500 border-b fixed top-0 w-full z-50">
      <div className="flex items-center justify-between w-full max-w-[1056px] mx-auto">
        {/* seção da logo e nome */}
        <Link href="/" className="flex items-center gap-2">
          <Image
                src="/default_logo_white.png"
                alt="logo_white"
                height={25}
                width={25}
                className="rounded-md"
          />
          <h2 className="pl-0.5 text-lg sm:text-xl font-bold text-white sm:block">
            BioOlhar
          </h2>
        </Link>

        {/* ícones + menu + usuario) */}
        <div className="flex items-center gap-4">
          {/* ícones de navegação 'Home' e 'cursos' */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              size="sm" 
              variant="ghost" 
              className="p-2 text-white hover:bg-green-600"
              asChild
            >
              <Link href="/" title="Home">
                <HomeIcon className="h-5 w-5" />
                <span className="sr-only md:not-sr-only lg:not-sr-only">Home</span>
              </Link>
            </Button>

            <Button 
              size="sm" 
              variant="ghost" 
              className="p-2 text-white hover:bg-green-600"
              asChild
            >
              <Link href="/learn" title="Cursos">
                <AcademicCapIcon className="h-5 w-5" />
                <span className="sr-only md:not-sr-only lg:not-sr-only">Cursos</span>
              </Link>
            </Button>
          </div>

          {/* Menu mobile e usuario*/}
          <div className="flex items-center gap-2">
            <MobileSideBar />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
};