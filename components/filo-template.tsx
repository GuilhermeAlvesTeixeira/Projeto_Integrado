/*
   COMPONENTE (NÃO SERÁ UTILIZADO NO PROJETO FINAL)
   
   Gerado por Deepseek para fins de TESTES.
*/

import { useState } from 'react';
import { useTheme } from '@/components/theme-context';
import Link from "next/link";

type Module = {
  id: string;
  title: string;
  level: number;
  icon: string;
  duration: number;
  completed: boolean;
  link: string;
};

type Phylum = {
  name: string;
  modules: Module[];
};

interface FiloTemplateProps {
  phylum: Phylum;
}

export default function FiloTemplate({ phylum }: FiloTemplateProps) {
  const { theme } = useTheme();
  const [selectedModule, setSelectedModule] = useState<Module>(phylum.modules[0]);
  const progress = Math.round(
    (phylum.modules.filter(m => m.completed).length / phylum.modules.length) * 100
  );

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
  };

  // Cores baseadas no tema (agora com verdes)
  const themeColors = {
    light: {
      bg: 'bg-gray-50',
      cardBg: 'bg-white',
      text: 'text-gray-800',
      secondaryText: 'text-gray-600',
      progressBg: 'bg-green-500',
      progressTrack: 'bg-gray-200',
      moduleBg: 'bg-white',
      moduleBorder: 'border-gray-200 hover:border-green-300',
      selectedModuleBg: 'bg-green-100',
      selectedModuleBorder: 'border-green-500',
      buttonBg: 'bg-green-600 hover:bg-green-700',
    },
    dark: {
      bg: 'bg-gray-900',
      cardBg: 'bg-gray-800',
      text: 'text-gray-100',
      secondaryText: 'text-gray-300',
      progressBg: 'bg-green-500',
      progressTrack: 'bg-gray-600',
      moduleBg: 'bg-gray-700',
      moduleBorder: 'border-gray-600 hover:border-green-400',
      selectedModuleBg: 'bg-green-900',
      selectedModuleBorder: 'border-green-400',
      buttonBg: 'bg-green-700 hover:bg-green-600',
    },
    'high-contrast': {
      bg: 'bg-black',
      cardBg: 'bg-gray-900',
      text: 'text-white',
      secondaryText: 'text-gray-300',
      progressBg: 'bg-yellow-500',
      progressTrack: 'bg-gray-700',
      moduleBg: 'bg-gray-800',
      moduleBorder: 'border-yellow-500 hover:border-yellow-300',
      selectedModuleBg: 'bg-yellow-900',
      selectedModuleBorder: 'border-yellow-500',
      buttonBg: 'bg-yellow-500 hover:bg-yellow-400 text-black',
    }
  };

  const colors = themeColors[theme];

  return (
    <div className={`flex flex-col lg:flex-row flex-1 ${colors.bg}`}>
      {/* Painel esquerdo - Progresso */}
      <div className={`w-full lg:w-64 ${colors.cardBg} p-6 shadow-md`}>
        <h2 className={`text-xl font-bold ${colors.text} mb-6`}>Seu Progresso</h2>

        {/* Círculo de progresso */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke={theme === 'high-contrast' ? '#4d4d4d' : '#e5e7eb'} strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={theme === 'high-contrast' ? '#facc15' : '#10b981'}
              strokeWidth="8"
              strokeDasharray={`${progress * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${colors.text}`}>{progress}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className={`flex justify-between text-sm ${colors.secondaryText}`}>
            <span>Módulos completos</span>
            <span>
              {phylum.modules.filter(m => m.completed).length}/{phylum.modules.length}
            </span>
          </div>
          <div className={`h-2 ${colors.progressTrack} rounded-full`}>
            <div
              className={`h-full ${colors.progressBg} rounded-full`}
              style={{
                width: `${(phylum.modules.filter(m => m.completed).length / phylum.modules.length * 100)}%`
              }}
            ></div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className={`font-semibold ${colors.secondaryText} mb-3`}>Filos estudados</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className={`w-3 h-3 ${colors.progressBg} rounded-full mr-2`}></span>
              <span className={colors.text}>{phylum.name}</span>
            </li>
            {/* Outros filos podem ser adicionados aqui */}
          </ul>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Card central */}
          <div className={`${colors.cardBg} rounded-xl shadow-md overflow-hidden mb-6 lg:mb-8`}>
            <div className="p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <span className={`inline-block px-3 py-1 ${theme === 'high-contrast' ? 'bg-yellow-100 text-yellow-900' : 'bg-green-100 text-green-800'} text-xs font-semibold rounded-full mb-2`}>
                    NÍVEL {selectedModule.level}
                  </span>
                  <h1 className={`text-2xl lg:text-3xl font-bold ${colors.text}`}>{selectedModule.title}</h1>
                  <p className={`${colors.secondaryText} mt-1`}>{phylum.name}</p>
                </div>
                <div className={`text-4xl lg:text-5xl ${colors.text}`}>{selectedModule.icon}</div>
              </div>

              <div className={`flex items-center ${colors.secondaryText} mb-6 lg:mb-8`}>
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{selectedModule.duration} min</span>
              </div>

              <Link href={selectedModule.link} passHref>
                <button className={`w-full py-3 lg:py-4 ${colors.buttonBg} text-white font-bold rounded-lg shadow-md transition duration-200 cursor-pointer`}>
                  Começar
                </button>
              </Link>
            </div>
          </div>

          {/* Barra de módulos */}
          <div className="flex overflow-x-auto pb-2 lg:pb-4 gap-3 lg:gap-4">
            {phylum.modules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className={`flex flex-col items-center p-3 lg:p-4 rounded-lg min-w-[100px] lg:min-w-[120px] cursor-pointer transition ${selectedModule.id === module.id
                    ? `${colors.selectedModuleBg} border-2 ${colors.selectedModuleBorder}`
                    : `${colors.moduleBg} border ${colors.moduleBorder}`
                  }`}
              >
                <span className={`text-2xl mb-1 lg:mb-2 ${colors.text}`}>{module.icon}</span>
                <span className={`text-xs lg:text-sm font-medium text-center ${selectedModule.id === module.id
                    ? theme === 'high-contrast' ? 'text-yellow-500' : 'text-green-700'
                    : colors.text
                  }`}>
                  {module.title}
                </span>
                {module.completed && (
                  <span className={`mt-1 text-xs ${theme === 'high-contrast' ? 'text-yellow-400' : 'text-green-600'
                    }`}>✓ Completo</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}