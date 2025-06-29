"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/theme-context";

type CardItem = {
  title: string;
  content: string;
  imageSrc: string;
  imageAlt?: string;
  href: string;
};

type CardProps = {
  items: CardItem[];
  horizontalScroll?: boolean;
};

export const FiloCards = ({ items, horizontalScroll = false }: CardProps) => {
  const { theme } = useTheme();
  const validItems = items.filter(item => 
    item.href && (typeof item.href === 'string' || typeof item.href === 'object')
  );

  return (
    <div className={`flex ${
      horizontalScroll 
        ? 'flex-nowrap overflow-x-auto gap-3 sm:gap-4 pb-2' 
        : 'flex-wrap justify-center gap-4'
    }`}>
      {validItems.map((item, index) => (
        <Link 
          key={index}
          href={item.href}
          className={`block min-w-[160px] sm:min-w-[180px] md:min-w-[200px] ${
            theme === 'high-contrast' ?'m-1' : ''
          }`}
          aria-label={`Card: ${item.title}. ${item.content}`}
        >
          <div className={`
            p-3 sm:p-4 rounded-3xl sm:rounded-4xl 
            border-b-4 sm:border-b-6 border-l-2 border-t-2 border-r-2 
            flex flex-col h-full transition-all duration-300 ease-in-out 
            cursor-pointer hover:shadow-md
            ${
              theme === 'light' 
                ? 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-md' 
                : theme === 'dark' 
                ? 'bg-gray-800 border-gray-900 hover:border-gray-500 hover:shadow-gray-700' 
                : 'bg-black border-none outline-1 outline-yellow-400 hover:outline-yellow-200 hover:shadow-none'
            }
          `}>
            <div className={`
              mb-2 sm:mb-3 flex justify-center h-24 sm:h-30 w-full overflow-hidden rounded-2xl sm:rounded-3xl
              ${
                theme === 'high-contrast' 
                  ? 'bg-black' 
                  : 'bg-gray-100 dark:bg-gray-800'
              }
            `}>
              <Image
                src={item.imageSrc}
                alt={item.imageAlt || item.title}
                width={200}
                height={128}
                className={`object-cover mt-3 sm:mt-4 w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] ${
                  theme === 'high-contrast' 
                    ? 'filter contrast-150 brightness-125 saturate-200' 
                    : ''
                }`}
                style={{ objectPosition: 'center' }}
              />
            </div>

            <div className="flex-1 px-1 sm:px-0">
              <h3 className={`
                font-bold text-base sm:text-lg text-center line-clamp-2
                ${
                  theme === 'light' 
                    ? 'text-gray-900' 
                    : theme === 'dark' 
                    ? 'text-white' 
                    : 'text-yellow-400 underline underline-offset-4'
                }
              `}>
                {item.title}
              </h3>
              <p className={`
                text-xs sm:text-sm text-center line-clamp-2 mt-1
                ${
                  theme === 'light' 
                    ? 'text-gray-600' 
                    : theme === 'dark' 
                    ? 'text-gray-300' 
                    : 'text-gray-300 font-medium'
                }
              `}>
                {item.content}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};