import Image from "next/image";
import { FiloCards } from "@/components/filo-cards";

type Props = {
  title: string;
  description: string;
  imgSrc: string;
  cards?: {
    title: string;
    content: string;
    imageSrc: string; 
    imageAlt?: string; 
  }[];
};

export const FiloSection = ({ imgSrc, title, description, cards }: Props) => {
  return (
    <div className="mb-5 mt-5 p-5 pb-10 pt-5 border-b border-gray-300">
      
      {/* Header: Imagem + Título + Descrição */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <Image
          src={imgSrc}
          alt={title}
          width={100}
          height={100}
          className="w-20 h-20 sm:items-center sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
        />

        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="text-sm sm:text-base md:text-lg text-neutral-700">
            {description}
          </p>
        </div>
      </div>

      {/* Cards */}
      {cards && cards.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <FiloCards 
            items={cards.map(card => ({
              title: card.title,
              content: card.content,
              imageSrc: card.imageSrc,
              imageAlt: card.imageAlt || card.title,
            }))} 
            horizontalScroll={true} 
          />
        </div>
      )}
    </div>
  );
};
