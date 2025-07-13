"use client"

import Image from "next/image";
import { FiloCards } from "@/components/filo-cards";
import { useTheme } from "@/components/theme-context";
import Link from "next/link";
import { Lock, ChevronRight, ChevronLeft } from "lucide-react";
import useSound from "use-sound";
import { useState } from "react";

const HomePage = () => {
  const { theme } = useTheme();
  const [playClickSound] = useSound("/click.wav");
  const [currentSlide, setCurrentSlide] = useState(0);

  const filos = [
    {
      title: "Protozoários",
      content: "Organismos unicelulares complexos com diversas estruturas locomotoras",
      imageSrc: "/protozoa.png",
      href: "/protozoa",
      imageAlt: "Micrografia de um protozoário ciliado, mostrando detalhes de seus cílios e estruturas internas",
      locked: true
    },
    {
      title: "Poríferos",
      content: "Animais filtradores aquáticos sem tecidos verdadeiros",
      imageSrc: "/esponja.png",
      href: "/poriferos",
      imageAlt: "Esponja-do-mar com poros visíveis e estrutura característica",
      locked: true
    },
    {
      title: "Cnidários",
      content: "Inclui águas-vivas, corais e anêmonas com cnidócitos",
      imageSrc: "/jellyfish.svg",
      href: "/cnidarios",
      imageAlt: "Água-viva com tentáculos transparentes e corpo gelatinoso",
      locked: true
    },
    {
      title: "Platelmintos",
      content: "Vermes achatados, muitos com vida parasitária",
      imageSrc: "/planaria.png",
      href: "/platelmintos",
      imageAlt: "Planária, verme achatado de corpo alongado e cabeça triangular",
      locked: true
    },
    {
      title: "Nemerteas",
      content: "Vermes proboscídeos de habitat marinho",
      imageSrc: "/nemertea.png",
      href: "/nemerteas",
      imageAlt: "Nemertia, verme marinho alongado com probóscide retraída",
      locked: true
    },
    {
      title: "Moluscos",
      content: "Diversificado grupo que inclui polvos e caramujos",
      imageSrc: "/polvo.png",
      href: "/moluscos",
      imageAlt: "Polvo com tentáculos enrolados, mostrando ventosas características",
      locked: false,
      popular: true
    }
  ];

  const heroSlides = [
    {
      title: "Bem-vindo ao BioOlhar!",
      subtitle: "Esta plataforma foi desenvolvida para servir de material complementar para a disciplina de Invertebrados I, oferecendo recursos interativos, ilustrações detalhadas e conteúdo científico atualizado sobre os principais filos de invertebrados marinhos.",
      image: "/cientista.png",
      imageAlt: "Ilustração de cientista estudando organismos marinhos",
      width: 500,
      height: 375
    },
    {
      title: "Curiosidades Marinhas",
      subtitle: "Sabia que os cnidários existem há mais de 500 milhões de anos? E que algumas esponjas do mar podem viver por mais de 2.300 anos? Explore nosso acervo para descobrir mais fascinantes fatos sobre os invertebrados marinhos.",
      image: "/cnidario-anatomia-1.png",
      imageAlt: "Água-viva flutuando no oceano",
      width: 400,
      height: 400
    },
    {
      title: "Teste Seu Conhecimento",
      subtitle: "Desafie-se com nosso quiz anatômico interativo sobre moluscos e avalie seu domínio sobre as estruturas morfológicas deste importante filo de invertebrados.",
      image: "/bivalve-anatomia.png",
      imageAlt: "Ilustração de um quiz sobre anatomia animal",
      quizLink: "/moluscos/anatomia",
      width: 600,
      height: 450
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Slider Section */}
      <div className={`relative bg-green-600 p-6 sm:p-8 md:p-12 lg:p-16 rounded-lg mx-4 sm:mx-6 md:mx-10 lg:mx-auto lg:max-w-6xl mt-8 mb-12 ${
        theme === 'dark' ? 'bg-green-800' : theme === 'high-contrast' ? 'bg-transparent border border-amber-400' : ''
      }`}>
        <div className="lg:pl-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === 'high-contrast' ? 'text-white' : 'text-white'
            }`}>
              {heroSlides[currentSlide].title}
            </h1>
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl mb-6 ${
              theme === 'high-contrast' ? 'text-gray-200' : 'text-white opacity-90'
            }`}>
              {heroSlides[currentSlide].subtitle}
            </p>
            {currentSlide === 2 && (
              <Link 
                href={heroSlides[currentSlide].quizLink || "#"} 
                className={`inline-block px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium ${
                  theme === 'light' ? 'bg-white text-green-600 hover:bg-gray-100' :
                  theme === 'dark' ? 'bg-gray-900 text-white hover:bg-gray-800' :
                  'bg-amber-400 text-black hover:bg-amber-500'
                } transition-colors`}
                aria-label="Iniciar quiz anatômico"
              >
                Iniciar Quiz
              </Link>
            )}
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md h-[300px]">
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].imageAlt}
                width={heroSlides[currentSlide].width}
                height={heroSlides[currentSlide].height}
                className={`w-full h-full object-contain ${
                  theme === 'high-contrast' ? 'filter contrast-125 brightness-110' : ''
                }`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              />
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <button 
          onClick={prevSlide}
          className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:cursor-pointer ${
            theme === 'high-contrast' ? 'bg-amber-400 text-black' : 'text-white'
          }`}
          aria-label="Slide anterior"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={nextSlide}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:cursor-pointer ${
            theme === 'high-contrast' ? 'bg-amber-400 text-black' : 'text-white'
          }`}
          aria-label="Próximo slide"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Cards Section */}
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
            items={filos.map(filo => ({
              ...filo,
              ariaLabel: filo.locked ? 
                `Módulo bloqueado: ${filo.title}` : 
                `Explorar informações sobre o filo ${filo.title}`,
              className: filo.locked ? 'opacity-50 pointer-events-none' : '',
              onClick: filo.locked ? undefined : () => playClickSound(),
              additionalContent: filo.popular && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-1 z-10 shadow-sm">
                  ★ Popular
                </span>
              ),
              lockedContent: filo.locked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                  <Lock className="text-white w-8 h-8" />
                </div>
              )
            }))}
            horizontalScroll={false}
          />
        </div>
      </div>

      {/* Footer Section */}
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