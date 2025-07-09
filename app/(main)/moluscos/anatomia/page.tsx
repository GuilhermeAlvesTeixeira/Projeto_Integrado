"use client"

import QuizTemplate from '@/components/quiz-template';
import type { Questao } from '@/components/quiz-template';
import { useState } from 'react';

const MoluscoAnatomia = () => {
  // Questão de múltipla escolha
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

  // Questão drag and drop com posições atualizadas
  const questaoDragDrop: Questao = {
    tipo: "drag_and_drop",
    pergunta: "Arraste os nomes para as partes corretas do polvo:",
    opcoes: [
      { 
        id: "1", 
        texto: "Tentáculo", 
        posicao: { areaId: "area1", x: -100, y: 30 } // Valores reduzidos pela metade
      },
      { 
        id: "2", 
        texto: "Olho", 
        posicao: { areaId: "area2", x: -10, y: 0 } 
      },
      { 
        id: "3", 
        texto: "Cabeça", 
        posicao: { areaId: "area3", x: 120, y: -10 }
      },
      { 
        id: "4", 
        texto: "Sifão", 
        posicao: { areaId: "area4", x: 270, y: 0 }
      },
      { 
        id: "5", 
        texto: "Abertura do Sifão", 
        posicao: { areaId: "area5", x: 280, y: 60 }
      }
    ],
    imagem: "/polvo-anatomia.png",
    explicacao: "Partes básicas de um molusco cefalópode: tentáculos (locomoção e captura), olhos (visão), cabeça (contém os órgãos principais), sifão (propulsão) e abertura do sifão (expulsão de água)."
  };

  const handleResposta = (resultado: { correta: boolean; respostaDada: any }) => {
    console.log('Resposta:', resultado);
    // Adicione aqui qualquer lógica adicional de manipulação de resposta
  };

  // Estado para controlar qual questão está sendo exibida
  const [questaoAtual, setQuestaoAtual] = useState<Questao>(questaoMultiplaEscolha);
  const [indiceQuestao, setIndiceQuestao] = useState(0);

  // Array com todas as questões
  const todasQuestoes: Questao[] = [
    questaoMultiplaEscolha,
    questaoDragDrop
  ];

  // Função para avançar para a próxima questão
  const proximaQuestao = () => {
    if (indiceQuestao < todasQuestoes.length - 1) {
      const novoIndice = indiceQuestao + 1;
      setIndiceQuestao(novoIndice);
      setQuestaoAtual(todasQuestoes[novoIndice]);
    } else {
      console.log("Fim do quiz!");
      // Adicione aqui lógica para finalizar o quiz
    }
  };

  // Função para voltar para a questão anterior
  const questaoAnterior = () => {
    if (indiceQuestao > 0) {
      const novoIndice = indiceQuestao - 1;
      setIndiceQuestao(novoIndice);
      setQuestaoAtual(todasQuestoes[novoIndice]);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <QuizTemplate 
        questao={questaoAtual} 
        onResposta={(resultado) => {
          handleResposta(resultado);
          // Avança automaticamente para próxima questão se a resposta estiver correta
          if (resultado.correta && indiceQuestao < todasQuestoes.length - 1) {
            setTimeout(proximaQuestao, 1500); // Delay para mostrar feedback
          }
        }} 
      />
      
      {/* Controle de navegação entre questões */}
      <div className="flex justify-between mt-6">
        <button 
          onClick={questaoAnterior}
          className={`px-4 py-2 rounded-md ${indiceQuestao === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          disabled={indiceQuestao === 0}
        >
          Anterior
        </button>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
          Questão {indiceQuestao + 1} de {todasQuestoes.length}
        </div>
        
        <button 
          onClick={proximaQuestao}
          className={`px-4 py-2 rounded-md ${indiceQuestao === todasQuestoes.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          disabled={indiceQuestao === todasQuestoes.length - 1}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default MoluscoAnatomia;