"use client"

import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-context';

type Opcao = {
  id: string;
  texto: string;
  imagem?: string;
  correta?: boolean;
  posicao?: { areaId: string; x: number; y: number };
};

type Questao = {
  tipo: "multipla_escolha" | "drag_and_drop";
  pergunta: string;
  opcoes: Opcao[];
  imagem?: string;
  explicacao?: string;
};

type QuizTemplateProps = {
  questao: Questao;
  onResposta: (resultado: { correta: boolean; respostaDada: any }) => void;
};

export default function QuizTemplate({ questao, onResposta }: QuizTemplateProps) {
  const { theme } = useTheme();
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correta: boolean; mensagem: string } | null>(null);
  const [vidas, setVidas] = useState(3);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  const [itensArrastados, setItensArrastados] = useState<{ id: string, areaId: string }[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    setRespostaSelecionada(null);
    setFeedback(null);
    setMostrarExplicacao(false);
    setItensArrastados([]);
    if (quizFinalizado) {
      setVidas(3);
      setQuizFinalizado(false);
    }
  }, [questao, quizFinalizado]);

  const handleResposta = (resposta: any) => {
    let correta = false;

    switch (questao.tipo) {
      case "multipla_escolha":
        const opcao = questao.opcoes.find(o => o.id === resposta);
        correta = !!opcao?.correta;
        break;
      case "drag_and_drop":
        if (itensArrastados.length !== questao.opcoes.length) {
          setFeedback({
            correta: false,
            mensagem: "Preencha todos os campos antes de verificar!"
          });
          return;
        }

        correta = itensArrastados.every(item => {
          const opcaoCorreta = questao.opcoes.find(o => o.id === item.id);
          return item.areaId === opcaoCorreta?.posicao?.areaId;
        });
        break;
    }

    if (!correta) {
      setVidas(prev => prev - 1);
      if (vidas - 1 <= 0) {
        setQuizFinalizado(true);
      }
    }

    setFeedback({
      correta,
      mensagem: correta ? "Resposta correta! 🎉" : "Resposta incorreta. Tente novamente!"
    });

    onResposta({ correta, respostaDada: resposta });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      if (questao.tipo === "drag_and_drop") {
        setItensArrastados(prev => {
          if (over.id === 'itens-disponiveis') {
            return prev.filter(item => item.id !== active.id);
          }

          const itemAtivo = prev.find(item => item.id === active.id);
          const itemExistente = prev.find(item => item.areaId === over.id);

          if (!itemAtivo) {
            return [...prev, { id: active.id as string, areaId: over.id as string }];
          }

          if (itemExistente) {
            return prev.map(item => {
              if (item.id === active.id) {
                return { ...item, areaId: over.id as string };
              }
              if (item.id === itemExistente.id) {
                return { ...item, areaId: itemAtivo.areaId };
              }
              return item;
            });
          }

          return prev.map(item =>
            item.id === active.id ? { ...item, areaId: over.id as string } : item
          );
        });
      }
    }
  };

  const recomecarQuiz = () => {
    setQuizFinalizado(false);
    setVidas(3);
  };

  const themeColors = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-800',
      card: 'bg-gray-50',
      button: 'bg-green-600 hover:bg-green-700 text-white',
      buttonCorrect: 'bg-green-600 hover:bg-green-700',
      buttonWrong: 'bg-red-600 hover:bg-red-700',
      border: 'border-gray-200',
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-gray-100',
      card: 'bg-gray-800',
      button: 'bg-green-700 hover:bg-green-600 text-white',
      buttonCorrect: 'bg-green-700 hover:bg-green-600',
      buttonWrong: 'bg-red-700 hover:bg-red-600',
      border: 'border-gray-700',
    },
    'high-contrast': {
      bg: 'bg-black',
      text: 'text-white',
      card: 'bg-gray-900',
      button: 'bg-green-500 hover:bg-green-400 text-black',
      buttonCorrect: 'bg-green-500 hover:bg-green-400',
      buttonWrong: 'bg-red-500 hover:bg-red-400',
      border: 'border-yellow-500',
    }
  };

  const colors = themeColors[theme];

  function DraggableItem({ id, children, disabled }: { id: string; children: React.ReactNode; disabled?: boolean }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`p-1.5 rounded-xl shadow-sm cursor-grab active:cursor-grabbing transition-all text-xs
          bg-green-500 text-primary-foreground hover:bg-green-500/90 border-green-600 border-b-2
          active:border-b-0 w-24 text-center ${disabled ? 'opacity-50' : ''}`}
      >
        {children}
      </div>
    );
  }

  function ItensDisponiveisArea({ children }: { children: React.ReactNode }) {
    const { setNodeRef } = useDroppable({ id: 'itens-disponiveis' });

    return (
      <div
        ref={setNodeRef}
        className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        {children}
      </div>
    );
  }

  function DroppableArea({
    id,
    item,
    opcoes,
  }: {
    id: string;
    item?: { id: string };
    opcoes: Opcao[];
  }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const textoItem = item ? opcoes.find(o => o.id === item.id)?.texto : null;

    return (
      <div
        ref={setNodeRef}
        className={`
          p-2 border-2 rounded-lg flex flex-col transition-colors min-h-[60px]
          ${isOver ? 'bg-green-100/70 dark:bg-green-900/50' : 'border-dashed border-gray-300 dark:border-gray-500'}
          ${item ? 'bg-green-100 dark:bg-green-900 border-solid' : ''}
        `}
      >
        {textoItem && (
          <div className="w-full h-full flex items-center justify-center rounded text-center overflow-hidden">
            <span className="truncate px-0.5 text-sm">
              {textoItem}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto p-4 ${colors.bg} ${colors.text} rounded-lg shadow-lg`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 1 }}
              animate={{ scale: i < vidas ? 1 : 0.8 }}
              transition={{ type: 'spring', stiffness: 500 }}
              className="relative w-8 h-8"
            >
              <Image
                src={i < vidas ? "/heart.svg" : "/heart-empty.svg"}
                alt={i < vidas ? "Vida disponível" : "Vida perdida"}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
        <div className="text-sm font-medium">
          {vidas} {vidas === 1 ? 'vida restante' : 'vidas restantes'}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-xl font-bold mb-4">{questao.pergunta}</h2>
        {questao.imagem && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-1/2 aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={questao.imagem}
                alt="Ilustração da pergunta"
                fill
                className="object-contain p-4"
                priority={false}
              />
            </div>

            {questao.tipo === "drag_and_drop" && (
              <div className="w-full md:w-1/2 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {questao.opcoes.map((opcao) => {
                    if (!opcao.posicao) return null;
                    return (
                      <div key={opcao.posicao.areaId} className="space-y-1">
                        <div className="text-sm font-medium">{opcao.posicao.areaId}</div>
                        <DroppableArea
                          id={opcao.posicao.areaId}
                          item={itensArrastados.find(item => item.areaId === opcao.posicao?.areaId)}
                          opcoes={questao.opcoes}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {quizFinalizado && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 mb-6 rounded-lg ${colors.card} ${colors.border} border`}
        >
          <h3 className="text-lg font-bold mb-2">Quiz finalizado!</h3>
          <p className="mb-4">Você perdeu todas as vidas. Deseja tentar novamente?</p>
          <Button
            onClick={recomecarQuiz}
            className={`${colors.button} w-full`}
          >
            Recomeçar Quiz
          </Button>
        </motion.div>
      )}

      {!quizFinalizado && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {questao.tipo === "multipla_escolha" && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {questao.opcoes.map((opcao) => (
                  <motion.button
                    key={opcao.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setRespostaSelecionada(opcao.id);
                      handleResposta(opcao.id);
                    }}
                    disabled={!!feedback}
                    className={`p-3 rounded-lg flex flex-col items-center justify-between transition ${colors.border} border ${feedback
                        ? opcao.correta
                          ? `${colors.buttonCorrect} text-white`
                          : opcao.id === respostaSelecionada
                            ? `${colors.buttonWrong} text-white`
                            : `${colors.card} opacity-70`
                        : `${colors.card} hover:bg-opacity-80 cursor-pointer`
                      } min-h-[120px] sm:min-h-[140px]`}
                  >
                    {opcao.imagem && (
                      <div className="relative w-12 h-16 sm:w-16 sm:h-20 flex-shrink-0">
                        <Image
                          src={opcao.imagem}
                          alt={`Ícone ${opcao.texto}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className="text-center text-sm sm:text-base font-medium mb-2 w-full">
                      {opcao.texto}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}

            {questao.tipo === "drag_and_drop" && (
              <div className="space-y-4">
                <ItensDisponiveisArea>
                  <h3 className="font-medium text-sm mb-3">Itens disponíveis:</h3>
                  <div className="flex flex-wrap gap-2">
                    {questao.opcoes
                      .filter(opcao => !itensArrastados.some(item => item.id === opcao.id))
                      .map((opcao) => (
                        <DraggableItem key={opcao.id} id={opcao.id}>
                          <div className="flex flex-col items-center">
                            {opcao.imagem && (
                              <div className="relative w-6 h-6 mb-1">
                                <Image
                                  src={opcao.imagem}
                                  alt={`Ícone ${opcao.texto}`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            <span>{opcao.texto}</span>
                          </div>
                        </DraggableItem>
                      ))}
                  </div>
                </ItensDisponiveisArea>
              </div>
            )}

            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-4 p-3 rounded-lg ${feedback.correta ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                    }`}
                >
                  <div className="font-bold mb-1 text-sm">
                    {feedback.correta ? '✅ Correto!' : '❌ Incorreto'}
                  </div>
                  <p className="text-sm">{feedback.mensagem}</p>

                  {questao.explicacao && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1 text-xs"
                        onClick={() => setMostrarExplicacao(!mostrarExplicacao)}
                      >
                        {mostrarExplicacao ? 'Ocultar explicação' : 'Mostrar explicação'}
                      </Button>

                      {mostrarExplicacao && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="mt-1 p-2 bg-white dark:bg-gray-800 rounded-lg text-xs"
                        >
                          <p>{questao.explicacao}</p>
                        </motion.div>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {questao.tipo === "drag_and_drop" && !feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <Button
                  onClick={() => handleResposta(itensArrastados)}
                  disabled={itensArrastados.length !== questao.opcoes.length}
                  className={`${colors.button} w-full text-sm py-2`}
                >
                  {itensArrastados.length === questao.opcoes.length
                    ? 'Verificar Resposta'
                    : `Preencha mais ${questao.opcoes.length - itensArrastados.length} itens`}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </DndContext>
      )}
    </div>
  );
}

export type { Questao, Opcao };