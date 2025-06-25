import Image from "next/image";

type CardItem = {
  title: string;
  content: string;
  imageSrc: string;
  imageAlt?: string;
};

type CardProps = {
  items: CardItem[];
  horizontalScroll?: boolean;
};

export const FiloCards = ({ items, horizontalScroll = false }: CardProps) => {
  return (
    <div className={`flex ${horizontalScroll ? 'flex-nowrap overflow-x-auto gap-4 pb-2' : 'flex-wrap justify-between gap-4'}`}>
      {items.map((item, index) => (
        <div 
          key={index}
          className="bg-white p-4 rounded-4xl border-b-6 border-l-2 border-t-2 border-r-2 border-gray-300 min-w-[200px] flex flex-col"
        >
          {/* Container da imagem com tamanho fixo */}
          <div className="mb-3 flex justify-center h-30 w-full overflow-hidden rounded-3xl">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt || item.title}
              width={200}  
              height={128}
              className="object-cover mt-5 w-[90px] h-[90px]"
              style={{
                objectPosition: 'center' // Garante que o foco fique no centro
              }}
            />
          </div>

          <div className="flex-1"> {/* Garante que o texto ocupe o espaço restante */}
            <h3 className="font-bold text-lg text-center">{item.title}</h3>
            <p className="text-gray-600 text-center">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};