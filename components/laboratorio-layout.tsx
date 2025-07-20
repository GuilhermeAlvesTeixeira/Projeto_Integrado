"use client"

import { useState, useEffect } from 'react';
import LaminaInterativa from '@/components/lamina-interativa';
import PranchaInformativa from '@/components/prancha-interativa';
import { Specimens } from '@/interfaces/types';
import { useTheme } from '@/components/theme-context';

const specimenNames = {
  poliplacoforo: "Poliplacóforo",
  bivalve: "Moluscos Bivalves",
  aplysia: "Aplysia sp.",
  gastropode: "Gastrópode",
  concha: "Anatomia de Concha",
  lula: "Lula",
  polvo: "Polvo"
};

const LaboratorioLayout = () => {
  const { theme } = useTheme();
  const [specimensData, setSpecimensData] = useState<Specimens | null>(null);
  const [selectedSpecimen, setSelectedSpecimen] = useState<keyof typeof specimenNames>('poliplacoforo');
  const [isPranchaVisible, setIsPranchaVisible] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    fetch('/data/pranchas/specimens.json')
      .then(response => response.json())
      .then(data => {
        setSpecimensData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error ao carregar os dados dos espécimes:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center h-screen gap-4 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className={`w-10 h-10 border-4 rounded-full animate-spin ${
          theme === 'light' ? 'border-green-500 border-t-transparent' :
          theme === 'dark' ? 'border-green-400 border-t-transparent' :
          'border-amber-500 border-t-transparent'
        }`} />
        <p className={
          theme === 'light' ? 'text-gray-600' :
          theme === 'dark' ? 'text-gray-300' :
          'text-amber-400'
        }>Carregando dados...</p>
      </div>
    );
  }

  if (!specimensData) {
    return (
      <div className={`flex items-center justify-center h-screen ${
        theme === 'light' ? 'text-red-500' :
        theme === 'dark' ? 'text-red-400' :
        'text-red-600'
      }`}>
        Erro ao carregar os dados.
      </div>
    );
  }

  const currentSpecimen = specimensData[selectedSpecimen];

  return (
    <div className={`flex shadow flex-col h-screen ${
      theme === 'light' ? 'bg-gray-50' :
      theme === 'dark' ? 'bg-gray-900' :
      'bg-black'
    }`}>
      <header className={`p-4 ${
        theme === 'light' ? 'bg-white' :
        theme === 'dark' ? 'bg-gray-900' :
        'bg-black'
      }`}>
        <div className="flex justify-between items-center">
          <h1 className={`text-xl font-bold ${
            theme === 'light' ? 'text-gray-800' :
            theme === 'dark' ? 'text-white' :
            'text-yellow-400'
          }`}>
            Laboratório Virtual de Invertebrados
          </h1>
          <div className="flex space-x-2">
            <select
              value={selectedSpecimen}
              onChange={(e) => {
                setSelectedSpecimen(e.target.value as keyof typeof specimenNames);
                setSelectedImageIndex(0);
              }}
              className={`px-2 py-2 rounded-md ${
                theme === 'light' ? 'border-gray-300 bg-white' :
                theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' :
                'border-amber-300 bg-black text-amber-300'
              } border`}
            >
              {Object.entries(specimenNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
            <button
              onClick={() => setIsPranchaVisible(!isPranchaVisible)}
              className={`px-4 py-2 rounded-md ${
                theme === 'light' ? 'bg-green-600 hover:bg-green-700 text-white' :
                theme === 'dark' ? 'bg-green-700 hover:bg-green-800 text-white' :
                'bg-amber-400 hover:bg-amber-500'
              } text-black`}
            >
              {isPranchaVisible ? 'Ocultar Prancha' : 'Mostrar Prancha'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className={`${isPranchaVisible ? 'w-2/3' : 'w-full'} p-4 overflow-auto`}>
          <LaminaInterativa
            imageSrc={currentSpecimen.laminas[selectedImageIndex].url}
          />
        </div>

        {isPranchaVisible && (
          <div className={`w-1/3 border-l p-4 overflow-y-auto ${
            theme === 'light' ? 'bg-white border-gray-200' :
            theme === 'dark' ? 'bg-gray-800 border-gray-700' :
            'bg-black border-amber-400 text-amber-400'
          }`}>
            <PranchaInformativa
              specimenData={currentSpecimen}
              laminas={currentSpecimen.laminas}
              onImageChange={handleImageChange}
              selectedImageIndex={selectedImageIndex}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default LaboratorioLayout;