"use client"

import { useState, useEffect } from 'react';
import LaminaInterativa from '@/components/lamina-interativa';
import PranchaInformativa from '@/components/prancha-interativa';
import { Specimens, SpecimenData, PranchaInformativaProps } from '@/interfaces/types';


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
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600">Carregando dados...</p>
      </div>
    );
  }
  

  if (!specimensData) {
    return <div className="flex items-center justify-center h-screen text-red-500">Erro ao carregar os dados.</div>;
  }

  const currentSpecimen = specimensData[selectedSpecimen];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Laboratório Virtual de Invertebrados</h1>
          <div className="flex space-x-2">
            <select
              value={selectedSpecimen}
              onChange={(e) => {
                setSelectedSpecimen(e.target.value as keyof typeof specimenNames);
                setSelectedImageIndex(0);
              }}
              className="px-4 py-2 border rounded-md"
            >
              {Object.entries(specimenNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
            <button
              onClick={() => setIsPranchaVisible(!isPranchaVisible)}
              className="px-1 py-2 bg-blue-600 text-white rounded-md"
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
          <div className="w-1/3 border-l p-4 overflow-y-auto bg-white">
            <PranchaInformativa
              specimenData={currentSpecimen}
              laminas={currentSpecimen.laminas}
              onImageChange={handleImageChange} // Adicione esta linha
              selectedImageIndex={selectedImageIndex}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default LaboratorioLayout;