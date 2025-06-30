import { useTheme } from "@/components/theme-context";
import { MobileSideBar } from "./mobile-sidebar";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  HomeIcon,
  AcademicCapIcon,
  EyeIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon
} from "@heroicons/react/24/solid";

export const MobileHeader = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // verifica se é mobile quando o componente monta e em redimensionamentos
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); 
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // fechar o dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowThemeDropdown(false);
      }
    };

    if (showThemeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showThemeDropdown]);

  // Função para lidar com o clique no botão de tema
  const handleThemeClick = () => {
    if (isMobile) {
      toggleTheme(); // permite alternancia de temas no mobile
    } else {
      setShowThemeDropdown(!showThemeDropdown); // Mostra/oculta dropdown em desktop
    }
  };

  return (
    <nav className={`px-4 sm:px-6 h-[50px] flex items-center border-b fixed top-0 w-full z-50 ${
      theme === 'light' ? 'bg-green-500' : 
      theme === 'dark' ? 'bg-green-700' : 
      'bg-black border-white'
    }`}>
      <div className="flex items-center justify-between w-full max-w-[1056px] mx-auto">
        
        {/* seção de logo e nome */}
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

        {/* ícones do app */}
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

            {/* botões e Dropdown de temas */}
            <div className="relative" ref={dropdownRef}>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleThemeClick}
                className={`p-2 flex items-center gap-1 ${
                  theme === 'light' ? 'text-white hover:bg-green-600' :
                  theme === 'dark' ? 'text-white hover:bg-green-800' :
                  'text-yellow-400 hover:bg-gray-800 border-2 border-yellow-400'
                }`}
              >
                {theme == 'light' ? (
                  <SunIcon className="h-5 w-5" />
                ) : theme == 'dark' ? (
                  <MoonIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
                {!isMobile && <ChevronDownIcon className="h-4 w-4" />}
              </Button>

              {/* mostra dropdown apenas em desktop e quando aberto */}
              {!isMobile && showThemeDropdown && (
                <div className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 z-50 ${
                  theme === 'light' ? 'bg-white border border-gray-200' :
                  theme === 'dark' ? 'bg-gray-800 border border-gray-700' :
                  'bg-black border-2 border-yellow-400'
                }`}>
                  <button
                    onClick={() => {
                      setTheme('light');
                      setShowThemeDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      theme === 'light' ? 'bg-green-100 text-green-900' :
                      theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' :
                      'hover:bg-gray-900 text-yellow-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <SunIcon className="h-4 w-4" />
                      Modo Claro
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setTheme('dark');
                      setShowThemeDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      theme === 'dark' ? 'bg-gray-700 text-white' :
                      theme === 'light' ? 'hover:bg-gray-100 text-gray-900' :
                      'hover:bg-gray-900 text-yellow-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MoonIcon className="h-4 w-4" />
                      Modo Escuro
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setTheme('high-contrast');
                      setShowThemeDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      theme === 'high-contrast' ? 'bg-gray-900 text-yellow-400' :
                      theme === 'light' ? 'hover:bg-gray-100 text-gray-900' :
                      'hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <EyeIcon className="h-4 w-4" />
                      Alto Contraste
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* menu mobile */}
          <div className="flex items-center gap-2">
            <MobileSideBar />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
};