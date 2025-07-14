import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { SpecimenData, Lamina } from '@/interfaces/types';

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
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const currentLamina = laminas[selectedImageIndex];

  const toggleItem = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{specimenData.nome}</h2>
      <p className="text-gray-600">{specimenData.descricaoGeral}</p>
      
      {currentLamina.pranchaImage && (
        <>
        <h2 className="text-xl font-bold text-gray-800">Esquema Anatômico</h2>
          <div 
            className="border rounded p-2 bg-white cursor-zoom-in" 
            onClick={() => setIsImageModalOpen(true)}
          >
            <img 
              src={currentLamina.pranchaImage} 
              alt="Esquema anatômico" 
              className="w-full h-auto"
            />
          </div>
          
          {isImageModalOpen && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <div className="relative max-w-6xl max-h-screen">
                <button 
                  onClick={() => setIsImageModalOpen(false)}
                  className="absolute -top-10 right-0 text-white hover:text-gray-300"
                >
                  <X size={30} />
                </button>
                <img 
                  src={currentLamina.pranchaImage} 
                  alt="Esquema anatômico ampliado" 
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Seleção de Lâminas</h3>
        <div className="grid grid-cols-3 gap-2">
          {laminas.map((lamina, index) => (
            <button
              key={index}
              onClick={() => onImageChange(index)}
              className={`p-2 rounded-md text-sm ${
                selectedImageIndex === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {lamina.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{currentLamina.estrutura.nome}</h3>
        
        <div className="space-y-1">
          {currentLamina.estrutura.itens.map((item, index) => (
            <div key={index} className="border rounded overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200"
              >
                <span className="font-medium">{item.nome}</span>
                {expandedItems[index] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {expandedItems[index] && (
                <div className="p-3 bg-white">
                  <p className="text-gray-700">{item.descricao}</p>
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