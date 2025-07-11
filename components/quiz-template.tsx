"use client"

import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-context';
import useSound from 'use-sound';

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

// No arquivo onde está definido o tipo QuizTemplateProps (provavelmente em quiz-template.tsx)
type QuizTemplateProps = {
  questao: Questao;
  onResposta: (resultado: { correta: boolean; respostaDada: any }) => void;
  vidas: number; // Adicione esta linha
};

export default function QuizTemplate({ questao, onResposta }: QuizTemplateProps) {
  const { theme } = useTheme();
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correta: boolean; mensagem: string } | null>(null);
  const [vidas, setVidas] = useState(3);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  const [itensArrastados, setItensArrastados] = useState<{ id: string, areaId: string }[]>([]);

  const [playCorrect] = useSound('/correct.wav');
  const [playWrong] = useSound('/wrong.wav');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const themeStyles = {
    light: {
      background: 'bg-white',
      text: 'text-gray-800',
      card: 'bg-gray-50',
      border: 'border-gray-200',
      button: 'bg-green-600 hover:bg-green-700 text-white',
      buttonCorrect: 'bg-green-600 text-white',
      buttonWrong: 'bg-red-600 text-white',
      dropzone: 'bg-gray-100 border-gray-300',
      dropzoneCorrect: 'bg-green-100 border-green-500',
      dropzoneWrong: 'bg-red-100 border-red-500',
      feedbackCorrect: 'bg-green-100 text-green-800',
      feedbackWrong: 'bg-red-100 text-red-800',
      explanation: 'bg-white text-gray-800',
      imageBg: 'bg-gray-100',
      heartColor: 'text-red-500',
      heartEmptyColor: 'text-gray-300',
      draggable: 'bg-green-600 hover:bg-green-700 text-white border-green-700',
      draggableDisabled: 'bg-green-600/50 text-white/50 border-green-700/50',
      verifyButton: 'bg-green-500 text-primary-foreground border-green-600 border-b-4 hover:bg-green-600 hover:border-b-0',
    },
    dark: {
      background: 'bg-gray-900',
      text: 'text-gray-100',
      card: 'bg-gray-800',
      border: 'border-gray-700',
      button: 'bg-green-700 hover:bg-green-600 text-white',
      buttonCorrect: 'bg-green-700 text-white',
      buttonWrong: 'bg-red-700 text-white',
      dropzone: 'bg-gray-800 border-gray-600',
      dropzoneCorrect: 'bg-green-900/30 border-green-500',
      dropzoneWrong: 'bg-red-900/30 border-red-500',
      feedbackCorrect: 'bg-green-900/30 text-green-100',
      feedbackWrong: 'bg-red-900/30 text-red-100',
      explanation: 'bg-gray-800 text-gray-100',
      imageBg: 'bg-gray-800',
      heartColor: 'text-red-500',
      heartEmptyColor: 'text-gray-600',
      draggable: 'bg-green-700 hover:bg-green-600 text-white border-green-600',
      draggableDisabled: 'bg-green-700/50 text-white/50 border-green-600/50',
      verifyButton: 'bg-green-600 text-primary-foreground border-green-700 border-b-4 hover:bg-green-700 hover:border-b-0',
    },
    'high-contrast': {
      background: 'bg-black',
      text: 'text-white',
      card: 'bg-gray-900',
      border: 'border-yellow-500',
      button: 'bg-yellow-500 hover:bg-yellow-400 text-black',
      buttonCorrect: 'bg-green-500 text-black',
      buttonWrong: 'bg-red-500 text-black',
      dropzone: 'bg-black border-yellow-500',
      dropzoneCorrect: 'bg-black border-green-500',
      dropzoneWrong: 'bg-black border-red-500',
      feedbackCorrect: 'bg-green-900 text-white',
      feedbackWrong: 'bg-red-900 text-white',
      explanation: 'bg-gray-900 text-white',
      imageBg: 'bg-gray-900',
      heartColor: 'text-yellow-500',
      heartEmptyColor: 'text-gray-700',
      draggable: 'bg-yellow-500 hover:bg-yellow-400 text-black border-yellow-600',
      draggableDisabled: 'bg-yellow-500/50 text-black/50 border-yellow-600/50',
      verifyButton: 'bg-yellow-500 text-black border-yellow-600 border-b-4 hover:bg-yellow-400 hover:border-b-0',
    }
  };

  const currentTheme = themeStyles[theme];

  useEffect(() => {
    setRespostaSelecionada(null);
    setFeedback(null);
    setMostrarExplicacao(false);
    setItensArrastados([]);
    if (quizFinalizado) {
      setQuizFinalizado(true);
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

    correta ? playCorrect() : vidas > 1? playWrong() : console.log("nada");

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

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (questao.tipo === "drag_and_drop") {
      setItensArrastados(prev => {
        if (overId === 'itens-disponiveis') {
          return prev.filter(item => item.id !== activeId);
        }

        const itemExistente = prev.find(item => item.areaId === overId);
        const itemAtivo = prev.find(item => item.id === activeId);

        let novoState = [...prev];
        novoState = novoState.filter(item => item.id !== activeId);

        if (itemExistente && itemAtivo) {
          novoState = novoState.map(item =>
            item.id === itemExistente.id
              ? { ...item, areaId: itemAtivo.areaId }
              : item
          );
        }

        novoState.push({ id: activeId, areaId: overId });
        return novoState;
      });
    }
  };

  const recomecarQuiz = () => {
    setQuizFinalizado(false);
    setVidas(3);
  };

  function DraggableItem({ id, children, disabled }: { id: string; children: React.ReactNode; disabled?: boolean }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id,
      disabled: disabled || !!feedback
    });

    const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      zIndex: isDragging ? 1000 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`
          p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing transition-all
          ${disabled ? currentTheme.draggableDisabled : currentTheme.draggable}
          active:shadow-lg select-none min-w-[100px] text-center text-sm
          ${isDragging ? 'opacity-80 scale-105 shadow-xl' : ''}
          ${disabled ? 'cursor-not-allowed' : ''}
        `}
      >
        {children}
      </div>
    );
  }

  function ItensDisponiveisArea({ children }: { children: React.ReactNode }) {
    const { setNodeRef, isOver } = useDroppable({ id: 'itens-disponiveis' });

    return (
      <div
        ref={setNodeRef}
        className={`
          p-4 rounded-lg border-2 border-dashed transition-all duration-200
          ${isOver
            ? theme === 'high-contrast'
              ? 'bg-gray-900 border-yellow-400'
              : 'bg-green-100 dark:bg-green-900/20 border-green-400 dark:border-green-500'
            : `${currentTheme.dropzone} ${currentTheme.border}`
          }
        `}
      >
        <h3 className="font-medium text-sm mb-3">Itens disponíveis:</h3>
        <div className="flex flex-wrap gap-3 min-h-[60px]">
          {children}
        </div>
      </div>
    );
  }

  function DropZone({ id, label }: { id: string; label?: string }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const item = itensArrastados.find(item => item.areaId === id);
    const opcao = item ? questao.opcoes.find(o => o.id === item.id) : null;

    const isCorrect = feedback && item && questao.opcoes.some(o =>
      o.id === item.id && o.posicao?.areaId === id
    );

    const isWrong = feedback && item && !isCorrect;

    return (
      <div
        ref={setNodeRef}
        className={`
          p-4 rounded-lg border-2 transition-all duration-200 min-h-[120px] flex flex-col items-center justify-center
          ${isOver
            ? theme === 'high-contrast'
              ? 'bg-gray-900 border-yellow-400'
              : 'bg-green-100 dark:bg-green-900/50 border-green-400 dark:border-green-500'
            : item
              ? isCorrect
                ? currentTheme.dropzoneCorrect
                : isWrong
                  ? currentTheme.dropzoneWrong
                  : theme === 'high-contrast'
                    ? 'bg-black border-yellow-500'
                    : 'bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-500'
              : theme === 'high-contrast'
                ? 'border-dashed bg-black border-yellow-500'
                : `border-dashed ${currentTheme.dropzone} ${currentTheme.border}`
          }
        `}
      >
        {item ? (
          <DraggableItem id={item.id} disabled={!!feedback}>
            <div className="flex flex-col items-center gap-1">
              {opcao?.imagem && (
                <div className="relative w-6 h-6">
                  <Image
                    src={opcao.imagem}
                    alt={`Ícone ${opcao.texto}`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="font-medium leading-tight">
                {opcao?.texto}
              </span>
            </div>
          </DraggableItem>
        ) : (
          <span className={`text-sm ${theme === 'high-contrast' ? 'text-yellow-400' : 'text-gray-500 dark:text-gray-400'}`}>
            {label || `Arraste para cá`}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto p-4 ${currentTheme.background} ${currentTheme.text} rounded-lg shadow-lg`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 1 }}
              animate={{ scale: i < vidas ? 1 : 0.8 }}
              transition={{ type: 'spring', stiffness: 500 }}
              className={`relative w-8 h-8 ${i < vidas ? currentTheme.heartColor : currentTheme.heartEmptyColor}`}
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
          <div className="space-y-4">
            {questao.tipo === "drag_and_drop" ? (
              <div className="flex flex-col gap-6">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className={`relative w-full md:w-1/2 aspect-[4/3] ${currentTheme.imageBg} rounded-lg overflow-hidden`}>
                      <Image
                        src={questao.imagem}
                        alt="Ilustração da pergunta"
                        fill
                        className="object-contain p-4"
                        priority={false}
                      />
                    </div>

                    <div className="w-full md:w-1/2">
                      <div className="grid grid-cols-2 gap-4">
                        {questao.opcoes.map((opcao) => (
                          <DropZone
                            key={`dropzone-${opcao.posicao?.areaId || opcao.id}`}
                            id={opcao.posicao?.areaId || `area-${opcao.id}`}
                            label={`Área ${opcao.posicao?.areaId || opcao.id}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <ItensDisponiveisArea>
                    {questao.opcoes
                      .filter(opcao => !itensArrastados.some(item => item.id === opcao.id))
                      .map((opcao) => (
                        <DraggableItem key={opcao.id} id={opcao.id}>
                          <div className="flex flex-col items-center gap-1">
                            {opcao.imagem && (
                              <div className="relative w-6 h-6">
                                <Image
                                  src={opcao.imagem}
                                  alt={`Ícone ${opcao.texto}`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            <span className="font-medium leading-tight">
                              {opcao.texto}
                            </span>
                          </div>
                        </DraggableItem>
                      ))}
                  </ItensDisponiveisArea>
                </DndContext>
              </div>
            ) : (
              <div className={`relative w-full md:w-1/2 aspect-[4/3] ${currentTheme.imageBg} rounded-lg overflow-hidden`}>
                <Image
                  src={questao.imagem}
                  alt="Ilustração da pergunta"
                  fill
                  className="object-contain p-4"
                  priority={false}
                />
              </div>
            )}
          </div>
        )}
      </motion.div>

      {quizFinalizado && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 mb-6 rounded-lg ${currentTheme.card} ${currentTheme.border} border`}
        >
          <h3 className="text-lg font-bold mb-2">Quiz finalizado!</h3>
          <p className="mb-4">Você perdeu todas as vidas. Deseja tentar novamente?</p>
          <Button
            onClick={recomecarQuiz}
            className={`${currentTheme.button} w-full`}
          >
            Recomeçar Quiz
          </Button>
        </motion.div>
      )}

      {!quizFinalizado && (
        <>
          {questao.tipo === "multipla_escolha" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
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
                    className={`p-3 rounded-lg flex flex-col items-center justify-between transition ${currentTheme.border} border ${feedback
                      ? opcao.correta
                        ? `${currentTheme.buttonCorrect}`
                        : opcao.id === respostaSelecionada
                          ? `${currentTheme.buttonWrong}`
                          : `${currentTheme.card} opacity-70`
                      : `${currentTheme.card} hover:bg-opacity-80 cursor-pointer`
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
            </motion.div>
          )}

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-4 p-3 rounded-lg ${feedback.correta ? currentTheme.feedbackCorrect : currentTheme.feedbackWrong}`}
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
                        className={`mt-1 p-2 ${currentTheme.explanation} rounded-lg text-xs`}
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
                className={`${currentTheme.verifyButton} w-full text-base py-3 transition-all duration-200`}
              >
                {itensArrastados.length === questao.opcoes.length
                  ? 'Verificar Resposta'
                  : `Preencha mais ${questao.opcoes.length - itensArrastados.length} ${questao.opcoes.length - itensArrastados.length === 1 ? 'item' : 'itens'}`}
              </Button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

export type { Questao, Opcao };