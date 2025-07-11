"use client"

import { useTheme } from '@/components/theme-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Confetti from 'react-confetti';
import useSound from 'use-sound';

type QuestaoComResposta = {
  questao: {
    pergunta: string;
    tipo: string;
    imagem?: string;
    explicacao?: string;
  };
  respostaUsuario: any;
  correta: boolean;
};

interface FinalizacaoQuizProps {
  questoesRespondidas: QuestaoComResposta[];
  moduloAtual: string;
  basePath?: string;
  proximoModuloPath?: string;
  tituloFeedback?: string;
  mensagensFeedback?: {
    excelente: string;
    bom: string;
    ruim: string;
  };
}

const FinalizacaoQuiz = ({ 
  questoesRespondidas,
  moduloAtual,
  basePath = '/',
  proximoModuloPath = '/homepage',
  tituloFeedback = 'Quiz Concluído!',
  mensagensFeedback = {
    excelente: 'Excelente! Você dominou este conteúdo!',
    bom: 'Bom trabalho! Alguns pontos podem ser revisados.',
    ruim: 'Você pode melhorar, continue praticando!'
  }
}: FinalizacaoQuizProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [playSuccess] = useSound('/success.mp3');
  const [playNotBad] = useSound('/not-bad.wav');
  const [playGameOver] = useSound('/game-over.mp3');

  const totalQuestoes = questoesRespondidas.length;
  const acertos = questoesRespondidas.filter(q => q.correta).length;
  const percentualAcerto = Math.round((acertos / totalQuestoes) * 100);

  // Efeitos para feedback visual e sonoro
  useEffect(() => {
    if (percentualAcerto >= 70) {
      setShowConfetti(true);
      playSuccess();
    } else if (percentualAcerto >= 40) {
      playNotBad();
    } else {
      playGameOver();
    }
  }, [percentualAcerto, playSuccess, playNotBad, playGameOver]);

  // Configurações baseadas no desempenho
  const getFeedbackConfig = () => {
    if (percentualAcerto >= 80) {
      return {
        emoji: '⭐',
        mensagem: mensagensFeedback.excelente,
        cor: 'text-green-500'
      };
    } else if (percentualAcerto >= 50) {
      return {
        emoji: '👍',
        mensagem: mensagensFeedback.bom,
        cor: 'text-yellow-500'
      };
    } else {
      return {
        emoji: '💔',
        mensagem: mensagensFeedback.ruim,
        cor: 'text-red-500'
      };
    }
  };

  const feedback = getFeedbackConfig();

  // Estilos baseados no tema
  const themeStyles = {
    light: {
      background: 'bg-white',
      text: 'text-gray-800',
      card: 'bg-gray-50',
      border: 'border-gray-200',
      buttonPrimary: 'bg-green-600 hover:bg-green-700 text-white',
      buttonSecondary: 'bg-blue-500 hover:bg-blue-600 text-white',
      buttonTertiary: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
    },
    dark: {
      background: 'bg-gray-900',
      text: 'text-gray-100',
      card: 'bg-gray-800',
      border: 'border-gray-700',
      buttonPrimary: 'bg-green-700 hover:bg-green-600 text-white',
      buttonSecondary: 'bg-blue-600 hover:bg-blue-500 text-white',
      buttonTertiary: 'bg-gray-700 hover:bg-gray-600 text-gray-100'
    },
    'high-contrast': {
      background: 'bg-black',
      text: 'text-white',
      card: 'bg-gray-900',
      border: 'border-yellow-500',
      buttonPrimary: 'bg-yellow-500 hover:bg-yellow-400 text-black',
      buttonSecondary: 'bg-green-500 hover:bg-green-400 text-black',
      buttonTertiary: 'bg-gray-700 hover:bg-gray-600 text-white'
    }
  };

  const currentTheme = themeStyles[theme];

  // Funções de navegação dinâmicas
  const refazerQuiz = () => {
    router.push(`${basePath}${moduloAtual}/quiz`);
  };

  const reverErros = () => {
    const primeiraErrada = questoesRespondidas.findIndex(q => !q.correta);
    if (primeiraErrada >= 0) {
      router.push(`${basePath}${moduloAtual}/quiz?questao=${primeiraErrada}`);
    }
  };

  const proximoModulo = () => {
    router.push(proximoModuloPath);
  };

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} p-6`}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho com resultados */}
        <div className={`text-center p-6 rounded-lg ${currentTheme.card} ${currentTheme.border} border mb-8`}>
          <div className="text-6xl mb-4">{feedback.emoji}</div>
          <h1 className="text-3xl font-bold mb-2">{tituloFeedback}</h1>
          <p className={`text-xl mb-6 ${feedback.cor}`}>{feedback.mensagem}</p>
          
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold">{acertos}/{totalQuestoes}</div>
              <div className="text-sm">questões corretas</div>
            </div>
            
            <div className="h-16 w-1 bg-gray-300 dark:bg-gray-600"></div>
            
            <div className="text-center">
              <div className="text-4xl font-bold">{percentualAcerto}%</div>
              <div className="text-sm">de acerto</div>
            </div>
          </div>
        </div>

        {/* Lista de questões */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Detalhes das questões:</h2>
          
          <div className="space-y-4">
            {questoesRespondidas.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg ${currentTheme.card} ${currentTheme.border} border`}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-xl ${item.correta ? 'text-green-500' : 'text-red-500'}`}>
                    {item.correta ? '✅' : '❌'}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">
                      Questão {index + 1}: {item.questao.pergunta}
                    </h3>
                    
                    {!item.correta && item.questao.explicacao && (
                      <div className="mt-3 space-y-2">
                        <div className="text-sm">
                          <span className="font-semibold">Resposta correta:</span> {item.questao.explicacao}
                        </div>
                      </div>
                    )}
                    
                    {item.questao.imagem && (
                      <div className="mt-3 relative w-full h-32">
                        <Image
                          src={item.questao.imagem}
                          alt="Ilustração da questão"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={refazerQuiz}
            className={`px-6 py-3 rounded-lg font-medium ${currentTheme.buttonTertiary} transition-colors`}
          >
            Refazer Quiz
          </button>
          
          <button
            onClick={reverErros}
            className={`px-6 py-3 rounded-lg font-medium ${currentTheme.buttonSecondary} transition-colors`}
            disabled={acertos === totalQuestoes}
          >
            Rever Erros
          </button>
          
          <button
            onClick={proximoModulo}
            className={`px-6 py-3 rounded-lg font-medium ${currentTheme.buttonPrimary} transition-colors`}
          >
            {proximoModuloPath === '/homepage' ? 'Página Inicial' : 'Próximo Módulo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalizacaoQuiz;