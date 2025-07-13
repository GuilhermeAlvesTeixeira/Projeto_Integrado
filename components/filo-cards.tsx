"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/theme-context";
import { Lock } from "lucide-react";

type CardItem = {
  title: string;
  content: string;
  imageSrc: string;
  imageAlt?: string;
  href: string;
  locked?: boolean;
  popular?: boolean;
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
    <div className={`flex ${horizontalScroll
      ? 'flex-nowrap overflow-x-auto gap-3 sm:gap-4 pb-2'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center'
      }`}>
      {validItems.map((item, index) => (
        <div
          key={index}
          className={`relative w-full max-w-[280px] sm:max-w-[300px] ${theme === 'high-contrast' ? 'm-1' : ''
            } ${item.locked ? 'pointer-events-none' : ''}`}
        >
          {/* Badge Popular */}
          {item.popular && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-1 z-10 shadow-sm">
              ★ Popular
            </span>
          )}

          {/* Overlay de bloqueio */}
          {item.locked && (
            <div className={`
    absolute inset-0 flex flex-col items-center justify-center 
    rounded-2xl sm:rounded-3xl z-10 backdrop-blur-xs
    ${theme === 'light'
                ? 'bg-white/70'
                : theme === 'dark'
                  ? 'bg-gray-900/70'
                  : 'bg-black/70'
              }
  `}>
              <Lock className={`
      w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2
      ${theme === 'light'
                  ? 'text-gray-700'
                  : theme === 'dark'
                    ? 'text-gray-300'
                    : 'text-yellow-400'
                }
    `} />
              <span className={`
      font-bold text-sm sm:text-base md:text-lg
      ${theme === 'light'
                  ? 'text-gray-800'
                  : theme === 'dark'
                    ? 'text-white'
                    : 'text-yellow-400'
                }
    `}>
                Em breve
              </span>
            </div>
          )}

          <Link
            href={item.href}
            className={`block w-full h-full`}
            aria-label={item.locked ? `Módulo bloqueado: ${item.title}` : `Card: ${item.title}. ${item.content}`}
            tabIndex={item.locked ? -1 : undefined}
          >
            <div className={`
              h-full p-2 sm:p-3 md:p-4 rounded-2xl sm:rounded-3xl 
              border-b-4 sm:border-b-4 border-l-2 border-t-2 border-r-2 
              flex flex-col transition-all duration-300 ease-in-out 
              ${item.locked ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
              ${theme === 'light'
                ? 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-md'
                : theme === 'dark'
                  ? 'bg-gray-800 border-gray-900 hover:border-gray-500 hover:shadow-gray-700'
                  : 'bg-black border-none outline-1 outline-yellow-400 hover:outline-yellow-200 hover:shadow-none'
              }
            `}>
              <div className={`
                flex justify-center items-center 
                h-20 sm:h-24 md:h-28 lg:h-32 mb-2 sm:mb-3
                w-full overflow-hidden rounded-xl sm:rounded-2xl
                ${theme === 'high-contrast'
                  ? 'bg-black'
                  : 'bg-gray-100 dark:bg-gray-800'
                }
                ${item.locked ? 'filter blur-sm' : ''}
              `}>
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt || item.title}
                  width={120}
                  height={120}
                  className={`object-contain w-auto h-3/4 ${theme === 'high-contrast'
                    ? 'filter contrast-150 brightness-125 saturate-200'
                    : ''
                    }`}
                  style={{ objectPosition: 'center' }}
                />
              </div>

              <div className="flex flex-col min-h-[60px] sm:min-h-[70px] md:min-h-[80px] px-1">
                <h3 className={`
                  font-bold text-sm sm:text-base md:text-lg text-center line-clamp-2
                  ${theme === 'light'
                    ? 'text-gray-900'
                    : theme === 'dark'
                      ? 'text-white'
                      : 'text-yellow-400 underline underline-offset-4'
                  }
                `}>
                  {item.title}
                </h3>
                <p className={`
                  text-xs sm:text-xs md:text-sm text-center line-clamp-2 mt-1
                  ${theme === 'light'
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
        </div>
      ))}
    </div>
  );
};