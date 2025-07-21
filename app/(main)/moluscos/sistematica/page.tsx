"use client"

import QuizTemplate from '@/components/quiz-template';
import type { Questao } from '@/components/quiz-template';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Confetti from 'react-confetti';
import useSound from 'use-sound';

type RespostaUsuario = {
  correta: boolean | null;
};

type QuestaoRespondida = {
  questao: Questao;
  respostaUsuario: any;
  correta: boolean;
};

const MoluscoSistematica = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [playSuccess] = useSound('/success.mp3');
  const [playNotBad] = useSound('/not-bad.wav');
  const [playGameOver] = useSound('/game-over.mp3');

  // Estados do quiz
  const [todasQuestoes, setTodasQuestoes] = useState<Questao[]>([]);
  const [respostas, setRespostas] = useState<RespostaUsuario[]>([]);
  const [indiceQuestao, setIndiceQuestao] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [questoesRespondidas, setQuestoesRespondidas] = useState<QuestaoRespondida[]>([]);
  const initialVidas = 5;
  const [vidas, setVidas] = useState(initialVidas);
  const [carregando, setCarregando] = useState(true);

  // Questão atual
  const [questaoAtual, setQuestaoAtual] = useState<Questao | null>(null);

  // Carregar estado salvo do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('moluscos-quiz-state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Verificar se as questões salvas são as mesmas que serão carregadas
        if (parsedState.todasQuestoes) {
          // Se já tivermos carregado as questões, verificar se são iguais
          if (todasQuestoes.length > 0 && JSON.stringify(parsedState.todasQuestoes) === JSON.stringify(todasQuestoes)) {
            setRespostas(parsedState.respostas || Array(todasQuestoes.length).fill({ correta: null }));
            setQuestoesRespondidas(parsedState.questoesRespondidas || []);
            setIndiceQuestao(parsedState.indiceQuestao || 0);
            setVidas(parsedState.vidas || initialVidas);
            setQuizFinalizado(parsedState.quizFinalizado || false);
          }
          // Se não tivermos carregado ainda, vamos esperar pelo fetch
        } else {
          // Estado antigo sem as questões, vamos resetar
          resetarEstadoQuiz();
        }
      }
    }
  }, [todasQuestoes]);

  // Salvar estado no localStorage quando mudar
  useEffect(() => {
    if (typeof window !== 'undefined' && todasQuestoes.length > 0) {
      const stateToSave = {
        respostas,
        questoesRespondidas,
        indiceQuestao,
        vidas,
        quizFinalizado,
        todasQuestoes // Agora salvamos também as questões para verificar depois
      };
      localStorage.setItem('moluscos-quiz-state', JSON.stringify(stateToSave));
    }
  }, [respostas, questoesRespondidas, indiceQuestao, vidas, quizFinalizado, todasQuestoes]);

  // Carregar questões do JSON
  useEffect(() => {
    const fetchQuestoes = async () => {
      try {
        const res = await fetch('../data/sistematica-quiz/sistematica.json');
        const data = await res.json();
        setTodasQuestoes(data);
        
        // Verificar se há estado salvo compatível
        const savedState = localStorage.getItem('moluscos-quiz-state');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          if (parsedState.todasQuestoes && JSON.stringify(parsedState.todasQuestoes) === JSON.stringify(data)) {
            // Estado compatível, usar os dados salvos
            setRespostas(parsedState.respostas || Array(data.length).fill({ correta: null }));
            setQuestoesRespondidas(parsedState.questoesRespondidas || []);
            setIndiceQuestao(parsedState.indiceQuestao || 0);
            setVidas(parsedState.vidas || initialVidas);
            setQuizFinalizado(parsedState.quizFinalizado || false);
            setQuestaoAtual(data[parsedState.indiceQuestao || 0]);
          } else {
            // Estado incompatível, resetar
            resetarEstadoQuiz(data);
          }
        } else {
          // Nenhum estado salvo, iniciar novo quiz
          resetarEstadoQuiz(data);
        }
        
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao carregar questões:', error);
        setCarregando(false);
      }
    };

    const resetarEstadoQuiz = (questoes?: Questao[]) => {
      const q = questoes || todasQuestoes;
      setRespostas(Array(q.length).fill({ correta: null }));
      setQuestoesRespondidas([]);
      setIndiceQuestao(0);
      setVidas(initialVidas);
      setQuizFinalizado(false);
      if (q.length > 0) {
        setQuestaoAtual(q[0]);
      }
    };

    fetchQuestoes();
  }, []);

  const handleResposta = (resultado: { correta: boolean; respostaDada: any }, index: number) => {
    if (!questaoAtual) return;

    const novasRespostas = [...respostas];
    novasRespostas[index] = { correta: resultado.correta };
    setRespostas(novasRespostas);

    const novasQuestoesRespondidas = [...questoesRespondidas];
    novasQuestoesRespondidas[index] = {
      questao: questaoAtual,
      respostaUsuario: resultado.respostaDada,
      correta: resultado.correta
    };
    setQuestoesRespondidas(novasQuestoesRespondidas);

    if (!resultado.correta) {
      const novasVidas = vidas - 1;
      setVidas(novasVidas);
      
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

  const limparTodoEstado = () => {
    localStorage.removeItem('moluscos-quiz-state');
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('quiz-resposta-')) {
        localStorage.removeItem(key);
      }
    });
  };

  const limparQuestoesErradas = () => {
    const novasRespostas = [...respostas];
    const novasQuestoesRespondidas = [...questoesRespondidas];
    
    respostas.forEach((resposta, index) => {
      if (resposta.correta === false) {
        novasRespostas[index] = { correta: null };
        novasQuestoesRespondidas[index] = undefined as any;
        
        const questao = todasQuestoes[index];
        if (questao) {
          localStorage.removeItem(`quiz-resposta-${questao.pergunta}`);
        }
      }
    });
    
    setRespostas(novasRespostas.filter(r => r !== undefined));
    setQuestoesRespondidas(novasQuestoesRespondidas.filter(q => q !== undefined));
  };

  // Funções da tela de finalização
  const refazerQuiz = () => {
    limparTodoEstado();
    setRespostas(Array(todasQuestoes.length).fill({ correta: null }));
    setQuestoesRespondidas([]);
    setIndiceQuestao(0);
    setQuestaoAtual(todasQuestoes[0]);
    setQuizFinalizado(false);
    setShowConfetti(false);
    setVidas(initialVidas);
  };
  
  const reverErros = () => {
    limparQuestoesErradas();
    const primeiraErrada = respostas.findIndex(r => r.correta === false);
    if (primeiraErrada >= 0) {
      setQuizFinalizado(false);
      setIndiceQuestao(primeiraErrada);
      setQuestaoAtual(todasQuestoes[primeiraErrada]);
      setVidas(initialVidas);
    }
  };

  const proximoModulo = () => {
    router.push('/moluscos');
  };

  // Estilos baseados no tema
  const themeStyles = {
    light: {
      background: 'bg-white',
      text: 'text-gray-800',
      card: 'bg-gray-50',
      border: 'border-gray-200',
      buttonPrimary: 'bg-green-600 hover:bg-green-700 text-white',
      buttonSecondary: 'bg-green-500 hover:bg-green-600 text-white',
      buttonTertiary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      buttonEnabled: 'bg-blue-500 text-white hover:bg-blue-600',
      buttonDisabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
      buttonFinalizar: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
    dark: {
      background: 'bg-gray-900',
      text: 'text-gray-100',
      card: 'bg-gray-800',
      border: 'border-gray-700',
      buttonPrimary: 'bg-green-700 hover:bg-green-600 text-white',
      buttonSecondary: 'bg-green-600 hover:bg-green-500 text-white',
      buttonTertiary: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
      buttonEnabled: 'bg-blue-600 text-white hover:bg-blue-700',
      buttonDisabled: 'bg-gray-700 text-gray-400 cursor-not-allowed',
      buttonFinalizar: 'bg-purple-700 hover:bg-purple-600 text-white',
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
      buttonFinalizar: 'bg-purple-500 hover:bg-purple-400 text-black',
    }
  };

  const currentTheme = themeStyles[theme];

  // Efeitos para feedback visual
  useEffect(() => {
    if (quizFinalizado) {
      const acertos = respostas.filter(r => r.correta).length;
      const total = respostas.length;
      const percentual = total > 0 ? (acertos / total) * 100 : 0;
      
      if (percentual >= 70) {
        setShowConfetti(true);
        playSuccess();
      } else if (percentual >= 30) {
        playNotBad();
      } else {
        playGameOver();
      }
    }
  }, [quizFinalizado, respostas, playSuccess, playNotBad, playGameOver]);

  // Componente de Finalização incorporado
  const TelaFinalizacao = () => {
    const acertos = respostas.filter(r => r.correta).length;
    const total = respostas.length;
    const percentual = total > 0 ? Math.round((acertos / total) * 100) : 0;

    const getFeedbackConfig = () => {
      if (percentual >= 70) return { emoji: '⭐', mensagem: 'Excelente! Você conhece bem os moluscos!', cor: 'text-green-500' };
      if (percentual >= 50) return { emoji: '👍', mensagem: 'Bom trabalho! Algumas partes ainda podem ser revisadas.', cor: 'text-yellow-500' };
      return {emoji: '💔',mensagem: 'Você perdeu todas as vidas, mas não se preocupe você pode tentar de novo!', cor: 'text-red-500' };
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
                item && (
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
                )
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

  if (carregando) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${currentTheme.background}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className={`mt-4 ${currentTheme.text}`}>Carregando questões...</p>
        </div>
      </div>
    );
  }

  if (!questaoAtual) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${currentTheme.background}`}>
        <div className="text-center">
          <p className={`text-xl ${currentTheme.text}`}>Não foi possível carregar as questões.</p>
          <button
            onClick={() => window.location.reload()}
            className={`mt-4 px-4 py-2 rounded-md ${currentTheme.buttonSecondary}`}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Verifica se todas as questões foram respondidas (acertadas ou erradas)
  const todasRespondidas = respostas.every(r => r?.correta !== null);

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
            vidas={vidas}
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
                    } cursor-pointer`}
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
                className={`px-4 py-2 rounded-md transition-colors ${
                  todasRespondidas
                    ? currentTheme.buttonFinalizar 
                    : currentTheme.buttonDisabled
                }`}
                disabled={!todasRespondidas}
              >
                Finalizar
              </button>
            ) : (
              <button 
                onClick={proximaQuestao}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentTheme.buttonEnabled
                }`}
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

export default MoluscoSistematica;

function resetarEstadoQuiz() {
  throw new Error('Function not implemented.');
}
