/*
   COMPONENTE (NÃO SERÁ UTILIZADO NO PROJETO FINAL)
   
   Gerado por Deepseek para fins de TESTES.
*/

import { useState } from 'react';

type Module = {
  id: string;
  title: string;
  level: number;
  icon: string;
  duration: number;
  completed: boolean;
};

type Phylum = {
  name: string;
  modules: Module[];
};

interface FiloTemplateProps {
  phylum: Phylum;
}

export default function FiloTemplate({ phylum }: FiloTemplateProps) {
  const [selectedModule, setSelectedModule] = useState<Module>(phylum.modules[0]);
  const [progress] = useState(25); // Progresso em porcentagem (pode vir de props)

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
  };

  return (
    <div className="flex flex-1 bg-gray-50">
      {/* Painel esquerdo - Progresso */}
      <div className="w-64 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Seu Progresso</h2>
        
        {/* Círculo de progresso */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray={`${progress * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">{progress}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Módulos completos</span>
            <span>
              {phylum.modules.filter(m => m.completed).length}/{phylum.modules.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{
                width: `${(phylum.modules.filter(m => m.completed).length / phylum.modules.length * 100)}%`
              }}
            ></div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-gray-700 mb-3">Filos estudados</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-gray-700">{phylum.name}</span>
            </li>
            {/* Outros filos podem ser adicionados aqui */}
          </ul>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {/* Card central */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-2">
                    NÍVEL {selectedModule.level}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedModule.title}</h1>
                  <p className="text-gray-600 mt-1">{phylum.name}</p>
                </div>
                <div className="text-5xl">{selectedModule.icon}</div>
              </div>

              <div className="flex items-center text-gray-600 mb-8">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{selectedModule.duration} min</span>
              </div>

              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-200">
                Começar
              </button>
            </div>
          </div>

          {/* Barra de módulos */}
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {phylum.modules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className={`flex flex-col items-center p-4 rounded-lg min-w-[120px] transition ${selectedModule.id === module.id ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white border border-gray-200 hover:border-blue-300'}`}
              >
                <span className="text-2xl mb-2">{module.icon}</span>
                <span className={`text-sm font-medium ${selectedModule.id === module.id ? 'text-blue-700' : 'text-gray-700'}`}>
                  {module.title}
                </span>
                {module.completed && (
                  <span className="mt-1 text-xs text-green-600">✓ Completo</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}