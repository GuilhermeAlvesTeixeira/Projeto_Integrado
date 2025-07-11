"use client"

import QuizTemplate from '@/components/quiz-template';
import type { Questao } from '@/components/quiz-template';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Confetti from 'react-confetti';
import useSound from 'use-sound';

const MoluscoAnatomia = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [playSuccess] = useSound('/success.mp3');
  const [playNotBad] = useSound('/not-bad.wav');
  const [playGameOver] = useSound('/game-over.mp3');

  // Estados do quiz
  const [respostas, setRespostas] = useState<Array<{correta: boolean | null}>>(Array(2).fill({correta: null}));
  const [indiceQuestao, setIndiceQuestao] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [questoesRespondidas, setQuestoesRespondidas] = useState<Array<{
    questao: Questao;
    respostaUsuario: any;
    correta: boolean;
  }>>([]);
  const [vidas, setVidas] = useState(3); // Adicionando estado de vidas

  // Questões do quiz
  const questaoMultiplaEscolha: Questao = {
    tipo: "multipla_escolha",
    pergunta: "Qual desses animais pertence ao Filo Mollusca?",
    opcoes: [
      { id: "1", texto: "Estrela-do-mar", imagem: "/estrela-do-mar.png", correta: false },
      { id: "2", texto: "Polvo", imagem: "/polvo.png", correta: true },
      { id: "3", texto: "Água-viva", imagem: "/jellyfish.svg", correta: false },
      { id: "4", texto: "Esponja", imagem: "/esponja.png", correta: false },
    ],
    explicacao: "O polvo é um molusco cefalópode, enquanto os outros pertencem a filos diferentes."
  };

  const [questaoAtual, setQuestaoAtual] = useState<Questao>(questaoMultiplaEscolha);

  const questaoDragDrop: Questao = {
    tipo: "drag_and_drop",
    pergunta: "Arraste os nomes para as partes corretas do polvo:",
    opcoes: [
      { id: "1", texto: "Tentáculo", posicao: { areaId: "area1", x: -100, y: 30 } },
      { id: "2", texto: "Olho", posicao: { areaId: "area2", x: -10, y: 0 } },
      { id: "3", texto: "Cabeça", posicao: { areaId: "area3", x: 120, y: -10 } },
      { id: "4", texto: "Sifão", posicao: { areaId: "area4", x: 270, y: 0 } },
      { id: "5", texto: "Abertura do Sifão", posicao: { areaId: "area5", x: 280, y: 60 } }
    ],
    imagem: "/polvo-anatomia.png",
    explicacao: "Partes básicas de um molusco cefalópode: tentáculos (locomoção e captura), olhos (visão), cabeça (contém os órgãos principais), sifão (propulsão) e abertura do sifão (expulsão de água)."
  };

  const todasQuestoes: Questao[] = [questaoMultiplaEscolha, questaoDragDrop];

  const handleResposta = (resultado: { correta: boolean; respostaDada: any }, index: number) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = {correta: resultado.correta};
    setRespostas(novasRespostas);

    const novasQuestoesRespondidas = [...questoesRespondidas];
    novasQuestoesRespondidas[index] = {
      questao: questaoAtual,
      respostaUsuario: resultado.respostaDada,
      correta: resultado.correta
    };
    setQuestoesRespondidas(novasQuestoesRespondidas);

    // Reduz vidas se a resposta estiver errada
    if (!resultado.correta) {
      const novasVidas = vidas - 1;
      setVidas(novasVidas);
      
      // Verifica se perdeu todas as vidas
      if (novasVidas <= 0) {
        setQuizFinalizado(true);
      }
    }
  };

  const proximaQuestao = () => {
    if (indiceQuestao < todasQuestoes.length - 1) {
      const novoIndice = indiceQuestao + 1;
      setIndiceQuestao(novoIndice);
      setQuestaoAtual(todasQuestoes[novoIndice]);
    }
  };

  const questaoAnterior = () => {
    if (indiceQuestao > 0) {
      const novoIndice = indiceQuestao - 1;
      setIndiceQuestao(novoIndice);
      setQuestaoAtual(todasQuestoes[novoIndice]);
    }
  };

  const finalizarQuiz = () => {
    setQuizFinalizado(true);
  };

  // Funções da tela de finalização
  const refazerQuiz = () => {
    setQuizFinalizado(false);
    setIndiceQuestao(0);
    setQuestaoAtual(todasQuestoes[0]);
    setRespostas(Array(2).fill({correta: null}));
    setQuestoesRespondidas([]);
    setShowConfetti(false);
    setVidas(3); // Resetar vidas
  };

  const reverErros = () => {
    const primeiraErrada = respostas.findIndex(r => r.correta === false);
    if (primeiraErrada >= 0) {
      setQuizFinalizado(false);
      setIndiceQuestao(primeiraErrada);
      setQuestaoAtual(todasQuestoes[primeiraErrada]);
      setVidas(3); // Resetar vidas
    }
  };

  const proximoModulo = () => {
    router.push('/homepage');
  };

  // Estilos baseados no tema
  const themeStyles = {
    light: {
      background: 'bg-white',
      text: 'text-gray-800',
      card: 'bg-gray-50',
      border: 'border-gray-200',
      buttonPrimary: 'bg-green-600 hover:bg-green-700 text-white',
      buttonSecondary: 'bg-blue-500 hover:bg-blue-600 text-white',
      buttonTertiary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      buttonEnabled: 'bg-blue-500 text-white hover:bg-blue-600',
      buttonDisabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
      buttonFinalizar: 'bg-purple-600 hover:bg-purple-700 text-white'
    },
    dark: {
      background: 'bg-gray-900',
      text: 'text-gray-100',
      card: 'bg-gray-800',
      border: 'border-gray-700',
      buttonPrimary: 'bg-green-700 hover:bg-green-600 text-white',
      buttonSecondary: 'bg-blue-600 hover:bg-blue-500 text-white',
      buttonTertiary: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
      buttonEnabled: 'bg-blue-600 text-white hover:bg-blue-700',
      buttonDisabled: 'bg-gray-700 text-gray-400 cursor-not-allowed',
      buttonFinalizar: 'bg-purple-700 hover:bg-purple-600 text-white'
    },
    'high-contrast': {
      background: 'bg-black',
      text: 'text-white',
      card: 'bg-gray-900',
      border: 'border-yellow-500',
      buttonPrimary: 'bg-yellow-500 hover:bg-yellow-400 text-black',
      buttonSecondary: 'bg-green-500 hover:bg-green-400 text-black',
      buttonTertiary: 'bg-gray-700 hover:bg-gray-600 text-white',
      buttonEnabled: 'bg-yellow-500 text-black hover:bg-yellow-400',
      buttonDisabled: 'bg-gray-700 text-gray-300 cursor-not-allowed',
      buttonFinalizar: 'bg-purple-500 hover:bg-purple-400 text-black'
    }
  };

  const currentTheme = themeStyles[theme];

  // Efeitos para feedback visual
  useEffect(() => {
    if (quizFinalizado) {
      const acertos = respostas.filter(r => r.correta).length;
      const percentual = (acertos / respostas.length) * 100;
      
      if (percentual >= 70) {
        setShowConfetti(true);
        playSuccess();
      } else if (percentual > 0) {
        playNotBad();
      } else if(percentual == 0){
        playGameOver();
      }
    }
  }, [quizFinalizado, respostas, playSuccess, playNotBad]);

  // Componente de Finalização incorporado
  const TelaFinalizacao = () => {
    const acertos = respostas.filter(r => r.correta).length;
    const total = respostas.length;
    const percentual = Math.round((acertos / total) * 100);

    const getFeedbackConfig = () => {
      if (percentual >= 80) return { emoji: '⭐', mensagem: 'Excelente! Você conhece bem os moluscos!', cor: 'text-green-500' };
      if (percentual >= 50) return { emoji: '👍', mensagem: 'Bom trabalho! Algumas partes ainda podem ser revisadas.', cor: 'text-yellow-500' };
      return {emoji: '💔',mensagem: 'Você perdeu todas as vidas, mas não se preocupe você está no caminho certo!', cor: 'text-red-500' };
    };

    const feedback = getFeedbackConfig();

    return (
      <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} p-6`}>
        {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
        
        <div className="max-w-4xl mx-auto">
          <div className={`text-center p-6 rounded-lg ${currentTheme.card} ${currentTheme.border} border mb-8`}>
            <div className="text-6xl mb-4">{feedback.emoji}</div>
            <h1 className="text-3xl font-bold mb-2">Quiz Concluído!</h1>
            <p className={`text-xl mb-6 ${feedback.cor}`}>{feedback.mensagem}</p>
            
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold">{acertos}/{total}</div>
                <div className="text-sm">questões corretas</div>
              </div>
              
              <div className="h-16 w-1 bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="text-center">
                <div className="text-4xl font-bold">{percentual}%</div>
                <div className="text-sm">de acerto</div>
              </div>
            </div>
          </div>

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
                      
                      {!item.correta && (
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
              disabled={acertos === total}
            >
              Rever Erros
            </button>
            
            <button
              onClick={proximoModulo}
              className={`px-6 py-3 rounded-lg font-medium ${currentTheme.buttonPrimary} transition-colors`}
            >
              Próximo Módulo
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderização principal
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {quizFinalizado ? (
        <TelaFinalizacao />
      ) : (
        <>
          <QuizTemplate 
            questao={questaoAtual} 
            onResposta={(resultado) => {
              handleResposta(resultado, indiceQuestao);
            }}
            vidas={vidas} // Passando o estado de vidas para o QuizTemplate
          />
          
          <div className="flex justify-between mt-6 items-center">
            <button 
              onClick={questaoAnterior}
              className={`px-4 py-2 rounded-md transition-colors ${
                indiceQuestao === 0 
                  ? currentTheme.buttonDisabled 
                  : currentTheme.buttonEnabled
              }`}
              disabled={indiceQuestao === 0}
            >
              Anterior
            </button>
            
            <div className="flex gap-2">
              {todasQuestoes.map((_, index) => {
                let circleColor = 'bg-gray-300';
                if (respostas[index]?.correta === true) circleColor = 'bg-green-500';
                else if (respostas[index]?.correta === false) circleColor = 'bg-red-500';
                else if (index === indiceQuestao) circleColor = theme === 'high-contrast' ? 'bg-yellow-500' : 'bg-blue-500';

                return (
                  <div 
                    key={index}
                    className={`w-4 h-4 rounded-full ${circleColor} ${
                      index === indiceQuestao ? 'ring-2 ring-offset-2 ' + 
                      (theme === 'high-contrast' ? 'ring-yellow-500' : 'ring-blue-500') : ''
                    }`}
                    onClick={() => {
                      setIndiceQuestao(index);
                      setQuestaoAtual(todasQuestoes[index]);
                    }}
                  />
                );
              })}
            </div>
            
            {indiceQuestao === todasQuestoes.length - 1 ? (
              <button 
                onClick={finalizarQuiz}
                className={`px-4 py-2 rounded-md transition-colors ${currentTheme.buttonFinalizar}`}
              >
                Finalizar
              </button>
            ) : (
              <button 
                onClick={proximaQuestao}
                className={`px-4 py-2 rounded-md transition-colors ${currentTheme.buttonEnabled}`}
              >
                Próxima
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MoluscoAnatomia;