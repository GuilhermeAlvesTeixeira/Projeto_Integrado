"use client"

import Image from "next/image";
import { FiloCards } from "@/components/filo-cards";
import { useTheme } from "@/components/theme-context";

const HomePage = () => {
  const { theme } = useTheme();

  const filos = [
    {
      title: "Protozoários",
      content: "Organismos unicelulares complexos com diversas estruturas locomotoras",
      imageSrc: "/protozoa.png",
      href: "/protozoa",
      imageAlt: "Protozoário"
    },
    {
      title: "Poríferos",
      content: "Animais filtradores aquáticos sem tecidos verdadeiros",
      imageSrc: "/esponja.png",
      href: "/poriferos",
      imageAlt: "Esponja"
    },
    {
      title: "Cnidários",
      content: "Inclui águas-vivas, corais e anêmonas com cnidócitos",
      imageSrc: "/jellyfish.svg",
      href: "/cnidarios",
      imageAlt: "Água-viva"
    },
    {
      title: "Platelmintos",
      content: "Vermes achatados, muitos com vida parasitária",
      imageSrc: "/planaria.png",
      href: "/platelmintos",
      imageAlt: "Planária"
    },
    {
      title: "Nemerteas",
      content: "Vermes proboscídeos de habitat marinho",
      imageSrc: "/nemertea.png",
      href: "/nemerteas",
      imageAlt: "Nemertia"
    },
    {
      title: "Moluscos",
      content: "Diversificado grupo que inclui polvos e caramujos",
      imageSrc: "/polvo.png",
      href: "/moluscos",
      imageAlt: "Polvo"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Seção Hero */}
      <div className={`bg-green-600 p-6 sm:p-8 md:p-12 lg:p-16 rounded-lg mx-4 sm:mx-6 md:mx-10 lg:mx-auto lg:max-w-6xl mt-8 mb-12 ${
        theme === 'dark' ? 'bg-green-800' : theme === 'high-contrast' ? 'bg-transparent border border-amber-400' : ''
      }`}>
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === 'high-contrast' ? 'text-white' : 'text-white'
            }`}>
              Explorando os Filos Biológicos
            </h1>
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl mb-6 ${
              theme === 'high-contrast' ? 'text-gray-200' : 'text-white opacity-90'
            }`}>
              Descubra a incrível diversidade do reino animal
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <Image
              src="/cientista.png"
              alt="Ilustração científica"
              width={400}
              height={300}
              className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain ${
                theme === 'high-contrast' ? 'filter contrast-125 brightness-110' : ''
              }`}
            />
          </div>
        </div>
      </div>

      {/* Seção de Cards - Layout ajustado */}
      <div className="flex-1 px-4 sm:px-6 md:px-10 lg:px-0 pb-10 max-w-6xl mx-auto w-full">
        <h2 className={`text-xl sm:text-2xl font-semibold mb-8 text-center ${
          theme === 'light' ? 'text-gray-900' : 
          theme === 'dark' ? 'text-white' : 
          'text-yellow-400'
        }`}>
          Conheça Nossos Principais Grupos
        </h2>
        
        <div className="w-full">
          <FiloCards 
            items={filos}
            horizontalScroll={false}
          />
        </div>
      </div>

      {/* Rodapé ajustado */}
      <div className={`text-center p-4 mt-auto ${
        theme === 'light' ? 'text-gray-600' : 
        theme === 'dark' ? 'text-gray-300' : 
        'text-gray-200'
      }`}>
        <p className="max-w-2xl mx-auto text-sm sm:text-base">
          Selecione qualquer card para explorar conteúdos detalhados
        </p>
      </div>
    </div>
  );
};

export default HomePage;