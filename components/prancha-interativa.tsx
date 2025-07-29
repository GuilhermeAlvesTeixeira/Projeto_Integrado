import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { SpecimenData, Lamina } from '@/interfaces/types';
import { useTheme } from '@/components/theme-context';

interface PranchaInformativaProps {
  specimenData: SpecimenData;
  laminas: Lamina[];
  onImageChange: (index: number) => void;
  selectedImageIndex: number;
}

const PranchaInformativa: React.FC<PranchaInformativaProps> = ({
  specimenData,
  laminas,
  onImageChange,
  selectedImageIndex
}) => {
  const { theme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const currentLamina = laminas[selectedImageIndex];

  const toggleItem = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const closeModal = () => setIsImageModalOpen(false);
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="space-y-4">
      <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' :
          theme === 'dark' ? 'text-white' :
            'text-white'
        }`}>
        {specimenData.nome}
      </h2>

      <p className={
        theme === 'light' ? 'text-gray-600' :
          theme === 'dark' ? 'text-gray-300' :
            'text-amber-400'
      }>
        {specimenData.descricaoGeral}
      </p>

      {currentLamina.pranchaImage && (
        <>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' :
              theme === 'dark' ? 'text-white' :
                'text-white'
            }`}>
            Esquema Anatômico
          </h2>

          <div
            className={`border rounded p-2 cursor-zoom-in ${theme === 'light' ? 'bg-white border-gray-200' :
                theme === 'dark' ? 'bg-gray-700 border-gray-600' :
                  'bg-black border-amber-300'
              }`}
            onClick={() => setIsImageModalOpen(true)}
          >
            <img
              src={currentLamina.pranchaImage}
              alt="Esquema anatômico"
              className="w-full h-auto"
            />
          </div>

          {isImageModalOpen && (
            <div 
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div 
                className="relative max-w-full max-h-full"
                onClick={stopPropagation}
              >
                <button
                  onClick={closeModal}
                  className={`absolute top-2 right-2 ${theme === 'high-contrast' ? 'text-amber-400' : 'text-white'
                    } hover:opacity-80 z-50 p-2 bg-black/50 rounded-full`}
                >
                  <X size={30} />
                </button>
                <img
                  src={currentLamina.pranchaImage}
                  alt="Esquema anatômico ampliado"
                  className="max-w-[90vw] max-h-[90vh] object-contain"
                />
              </div>
            </div>
          )}
        </>
      )}

      <div className="space-y-2">
        <h3 className={`font-semibold text-lg ${theme === 'light' ? 'text-gray-800' :
            theme === 'dark' ? 'text-white' :
              'text-white'
          }`}>
          Seleção de Lâminas
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {laminas.map((lamina, index) => (
            <button
              key={index}
              onClick={() => onImageChange(index)}
              className={`p-2 rounded-md text-sm ${selectedImageIndex === index
                  ? theme === 'light' ? 'bg-green-600 text-white' :
                    theme === 'dark' ? 'bg-green-700 text-white' :
                      'bg-amber-500 text-black'
                  : theme === 'light' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' :
                    theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-500' :
                      'bg-black border border-amber-400 text-amber hover:border-amber-600'
                }`}
            >
              {lamina.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className={`font-semibold text-lg ${theme === 'light' ? 'text-gray-800' :
            theme === 'dark' ? 'text-white' :
              'text-white'
          }`}>
          {currentLamina.estrutura.nome}
        </h3>

        <div className="space-y-1">
          {currentLamina.estrutura.itens.map((item, index) => (
            <div key={index} className={`border rounded overflow-hidden ${theme === 'light' ? 'border-gray-200' :
                theme === 'dark' ? 'border-gray-600' :
                  'border-amber-300'
              }`}>
              <button
                onClick={() => toggleItem(index)}
                className={`w-full flex justify-between items-center p-3 ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' :
                    theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' :
                      'bg-amber-400 hover:bg-amber-500'
                  }`}
              >
                <span className={`font-medium ${theme === 'high-contrast' ? 'text-black' : ''
                  }`}>
                  {item.nome}
                </span>
                {expandedItems[index] ?
                  <ChevronUp size={18} className={
                    theme === 'high-contrast' ? 'text-black' : ''
                  } /> :
                  <ChevronDown size={18} className={
                    theme === 'high-contrast' ? 'text-black' : ''
                  } />
                }
              </button>

              {expandedItems[index] && (
                <div className={`p-3 ${theme === 'light' ? 'bg-white text-gray-700' :
                    theme === 'dark' ? 'bg-gray-800 text-gray-300' :
                      'bg-black text-amber-300'
                  }`}>
                  <p>{item.descricao}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PranchaInformativa;