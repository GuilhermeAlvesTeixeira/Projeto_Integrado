"use client"

import Image from "next/image";
import { FiloCards } from "@/components/filo-cards";
import { useTheme } from "@/components/theme-context";

type Props = {
  title: string;
  description: string;
  imgSrc: string;
  cards?: {
    title: string;
    content: string;
    imageSrc: string; 
    imageAlt?: string;
    href: string;
  }[];
};

export const FiloSection = ({ imgSrc, title, description, cards }: Props) => {
  const { theme } = useTheme();
  const validCards = cards?.filter(card => 
    card.href && (typeof card.href === 'string' || typeof card.href === 'object')
  );

  return (
    <section className={`lg:mt-15 lg:mb-15 mb-10 sm:mb-10 mt-10 sm:mt-8 p-3 sm:p-6 pb-6 sm:pb-10 ${
      theme === 'light' 
        ? 'border-b border-gray-200' 
        : theme === 'dark' 
        ? 'border-b border-gray-700' 
        : 'border-b-2 border-white'
    }`}>
      {/* Cabeçalho */}
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:gap-6">
        <div className={`flex-shrink-0 mx-auto md:mx-0 ${
          theme === 'high-contrast'
        }`}>
          <Image
            src={imgSrc}
            alt={title}
            width={100}
            height={100}
            className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain ${
              theme === 'high-contrast' ? 'filter contrast-125 brightness-110' : ''
            }`}
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className={`
            text-xl sm:text-2xl md:text-3xl font-bold
            ${
              theme === 'light' 
                ? 'text-gray-900' 
                : theme === 'dark' 
                ? 'text-white' 
                : 'text-white underline'
            }
          `}>
            {title}
          </h1>
          <p className={`
            text-sm lg:text-lg sm:text-base mt-1 sm:mt-2
            ${
              theme === 'light' 
                ? 'text-gray-600' 
                : theme === 'dark' 
                ? 'text-gray-300' 
                : 'text-gray-200 font-bold'
            }
          `}>
            {description}
          </p>
        </div>
      </div>

      {/* Seção de Cards */}
      {validCards && validCards.length > 0 && (
        <div className="mt-6 sm:mt-8 relative">
          <div className={`overflow-x-auto pb-3 sm:pb-4 -mx-3 sm:-mx-4 px-3 sm:px-4 
          }`}>
            <FiloCards 
              items={validCards}
              horizontalScroll={true}
            />
          </div>
        </div>
      )}
    </section>
  );
};