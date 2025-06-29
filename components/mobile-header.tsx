import { useTheme } from "@/components/theme-context";
import { MobileSideBar } from "./mobile-sidebar";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  AcademicCapIcon,
  EyeIcon,
  MoonIcon,
  SunIcon
} from "@heroicons/react/24/solid";

export const MobileHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`px-4 sm:px-6 h-[50px] flex items-center border-b fixed top-0 w-full z-50 ${
      theme === 'light' ? 'bg-green-500' : 
      theme === 'dark' ? 'bg-green-700' : 
      'bg-black border-white'
    }`}>
      <div className="flex items-center justify-between w-full max-w-[1056px] mx-auto">
        {/* Logo e nome */}
        <Link href="/" className={`flex items-center gap-2 ${
          theme === 'high-contrast' ? 'p-1' : ''
        }`}>
          <Image
            src="/default_logo_white.png"
            alt="logo_white"
            height={25}
            width={25}
            className={`rounded-md ${
              theme === 'high-contrast' ? 'filter brightness-150' : ''
            }`}
          />
          <h2 className={`pl-0.5 text-lg sm:text-xl font-bold ${
            theme === 'high-contrast' ? 'text-yellow-400' : 'text-white'
          } sm:block`}>
            BioOlhar
          </h2>
        </Link>

        {/* Ícones */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              size="sm" 
              variant="ghost" 
              className={`p-2 ${
                theme === 'light' ? 'text-white hover:bg-green-600' :
                theme === 'dark' ? 'text-white hover:bg-green-800' :
                'text-yellow-400 hover:bg-gray-800 border-2 border-yellow-400'
              }`}
              asChild
            >
              <Link href="/homepage" title="Home">
                <HomeIcon className="h-5 w-5" />
                <span className="sr-only md:not-sr-only lg:not-sr-only">Home</span>
              </Link>
            </Button>

            <Button 
              size="sm" 
              variant="ghost" 
              className={`p-2 ${
                theme === 'light' ? 'text-white hover:bg-green-600' :
                theme === 'dark' ? 'text-white hover:bg-green-800' :
                'text-yellow-400 hover:bg-gray-800 border-2 border-yellow-400'
              }`}
              asChild
            >
              <Link href="/learn" title="Cursos">
                <AcademicCapIcon className="h-5 w-5" />
                <span className="sr-only md:not-sr-only lg:not-sr-only">Cursos</span>
              </Link>
            </Button>

            {/* Alternador de temas (desktop) */}
            <Button 
              size="sm" 
              variant="ghost" 
              className={`p-2 hidden sm:flex ${
                theme === 'light' ? 'text-white hover:bg-green-600' :
                theme === 'dark' ? 'text-white hover:bg-green-800' :
                'text-yellow-400 hover:bg-gray-800 border-2 border-yellow-400'
              }`}
              title={theme == 'light' ? 'Modo Claro' : theme == 'dark' ? 'Modo Escuro' : 'Contraste'}
              onClick={toggleTheme}
            >
              {theme == 'light' ? (
                <SunIcon className="h-5 w-5" />
              ) : theme == 'dark' ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
              <span className={`sr-only md:not-sr-only lg:not-sr-only ${
                theme === 'high-contrast' ? 'text-yellow-400' : 'text-white'
              }`}>
                {theme == 'light' ? 'Claro' : theme == 'dark' ? 'Escuro' : 'Contraste'}
              </span>
            </Button>
          </div>

          {/* Menu mobile */}
          <div className="flex items-center gap-2">
            {/* Alternador de temas (mobile) */}
            <Button 
              size="sm" 
              variant="ghost" 
              className={`p-2 sm:hidden ${
                theme === 'light' ? 'text-white hover:bg-green-600' :
                theme === 'dark' ? 'text-white hover:bg-green-800' :
                'text-yellow-400 hover:bg-gray-800 border-2 border-yellow-400'
              }`}
              title={theme === 'light' ? 'Modo Escuro' : theme === 'dark' ? 'Alto Contraste' : 'Modo Claro'}
              onClick={toggleTheme}
            >
              {theme == 'light' ? (
                <MoonIcon className="h-5 w-5" />
              ) : theme == 'dark' ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </Button>

            <MobileSideBar />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
};