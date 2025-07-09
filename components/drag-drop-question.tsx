"use client"

import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { Opcao } from './quiz-template'
import { useState } from 'react'

type DragDropQuestionProps = {
  opcoes: Opcao[]
  onAnswer: (itensArrastados: {id: string, areaId: string}[]) => void
}

export function DragDropQuestion({ opcoes, onAnswer }: DragDropQuestionProps) {
  const [itensArrastados, setItensArrastados] = useState<{id: string, areaId: string}[]>([])
  
  const areasAlvo = [
    { id: 'area1', titulo: 'Cabeça' },
    { id: 'area2', titulo: 'Pé muscular' },
    { id: 'area3', titulo: 'Concha' }
  ]

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    
    if (over) {
      const novoEstado = itensArrastados.some(item => item.id === active.id)
        ? itensArrastados.map(item => 
            item.id === active.id ? { ...item, areaId: over.id } : item
          )
        : [...itensArrastados, { id: active.id, areaId: over.id }]
      
      setItensArrastados(novoEstado)
      onAnswer(novoEstado)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Itens para arrastar</h3>
          {opcoes.map((opcao) => (
            <DraggableItem key={opcao.id} id={opcao.id}>
              {opcao.texto}
            </DraggableItem>
          ))}
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Áreas de destino</h3>
          {areasAlvo.map((area) => (
            <DroppableArea 
              key={area.id} 
              id={area.id}
              item={itensArrastados.find(item => item.areaId === area.id)}
              opcoes={opcoes}
            >
              <span className="font-semibold">{area.titulo}</span>
            </DroppableArea>
          ))}
        </div>
      </div>
    </DndContext>
  )
}

function DraggableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  
  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-md cursor-grab active:cursor-grabbing"
    >
      {children}
    </div>
  )
}

function DroppableArea({ 
  id, 
  children, 
  item,
  opcoes 
}: { 
  id: string
  children: React.ReactNode
  item?: {id: string}
  opcoes: Opcao[]
}) {
  const { setNodeRef } = useDroppable({ id })
  const textoItem = item ? opcoes.find(o => o.id === item.id)?.texto : null

  return (
    <div
      ref={setNodeRef}
      className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg min-h-20 flex flex-col"
    >
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        {children}
      </div>
      {textoItem && (
        <div className="mt-2 p-2 bg-green-100 dark:bg-green-900 rounded">
          {textoItem}
        </div>
      )}
    </div>
  )
}