"use client";

import { useEffect, useRef, useState } from 'react';
import { Circle, Square, Type, FileX2Icon, Save, Minus, Pencil, Trash2, MousePointer2, Move, ZoomIn, ZoomOut } from 'lucide-react';
import { fabric } from 'fabric';

interface LaminaInterativaProps {
  imageSrc: string;
}

const LaminaInterativa: React.FC<LaminaInterativaProps> = ({ imageSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [textBgColor, setTextBgColor] = useState<string>('transparent');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [objectColor, setObjectColor] = useState<string>('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPanning, setIsPanning] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<fabric.Image | null>(null);
  const [showFreehandPanel, setShowFreehandPanel] = useState(false);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  // Inicialização do canvas
  useEffect(() => {
    if (!canvasRef.current || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: false,
      backgroundColor: '#f8fafc',
      width: container.clientWidth,
      height: container.clientHeight,
    });

    // Event listeners for object selection
    initCanvas.on('selection:created', (e) => {
      if (e.selected && e.selected.length === 1) {
        const obj = e.selected[0];
        setSelectedObject(obj);
        if (obj instanceof fabric.Textbox) {
          setObjectColor(obj.fill as string || '#000000');
          setTextBgColor(obj.backgroundColor as string || 'transparent');
        } else {
          setObjectColor(obj.stroke as string || '#000000');
          setStrokeWidth(obj.strokeWidth as number || 2);
        }
      }
    });

    initCanvas.on('selection:updated', (e) => {
      if (e.selected && e.selected.length === 1) {
        const obj = e.selected[0];
        setSelectedObject(obj);
        if (obj instanceof fabric.Textbox) {
          setObjectColor(obj.fill as string || '#000000');
          setTextBgColor(obj.backgroundColor as string || 'transparent');
        } else {
          setObjectColor(obj.stroke as string || '#000000');
          setStrokeWidth(obj.strokeWidth as number || 2);
        }
      }
    });

    initCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    setCanvas(initCanvas);

    return () => {
      initCanvas.dispose();
    };
  }, []);

  // Configuração do panning
  useEffect(() => {
    if (!canvas) return;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (options: fabric.IEvent) => {
      if (isPanning && options.e) {
        const mouseEvent = options.e as MouseEvent;
        isDragging = true;
        lastX = mouseEvent.clientX;
        lastY = mouseEvent.clientY;
        canvas.selection = false;
        canvas.defaultCursor = 'grabbing';
        canvas.renderAll();
      }
    };

    const handleMouseMove = (options: fabric.IEvent) => {
      if (isPanning && isDragging && options.e) {
        const mouseEvent = options.e as MouseEvent;
        const deltaX = mouseEvent.clientX - lastX;
        const deltaY = mouseEvent.clientY - lastY;
        
        canvas.relativePan(new fabric.Point(deltaX, deltaY));
        
        lastX = mouseEvent.clientX;
        lastY = mouseEvent.clientY;
      }
    };

    const handleMouseUp = () => {
      if (isPanning) {
        isDragging = false;
        canvas.selection = true;
        canvas.defaultCursor = 'default';
        canvas.renderAll();
      }
    };

    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [canvas, isPanning]);

  // Desativa o panning quando outra ferramenta é selecionada
  useEffect(() => {
    if (activeTool && activeTool !== 'pan') {
      setIsPanning(false);
    }
  }, [activeTool]);

  // Carregamento da imagem
  useEffect(() => {
    if (!canvas) return;

    fabric.Image.fromURL(imageSrc, (img) => {
      try {
        const scale = Math.min(
          (canvas.width! * 0.9) / img.width!,
          (canvas.height! * 0.9) / img.height!
        );

        img.set({
          scaleX: scale,
          scaleY: scale,
          left: (canvas.width! - img.width! * scale) / 2,
          top: (canvas.height! - img.height! * scale) / 2,
          originX: 'left',
          originY: 'top',
          selectable: false,
          hasControls: false,
          hasBorders: false
        });

        canvas.clear();
        canvas.add(img);
        canvas.renderAll();
        setIsImageLoaded(true);
        setBackgroundImage(img);
      } catch (error) {
        console.error('Erro ao carregar imagem:', error);
        const text = new fabric.Text('Imagem não carregada', {
          left: 100,
          top: 100,
          fontSize: 20,
          fill: 'red'
        });
        canvas.add(text);
        canvas.renderAll();
      }
    }, {
      crossOrigin: 'anonymous'
    });
  }, [canvas, imageSrc]);

  // Criação automática de formas quando a ferramenta é ativada
  useEffect(() => {
    if (!canvas || !isImageLoaded || !activeTool) return;

    if (activeTool !== 'freehand') {
      canvas.isDrawingMode = false;
      setShowFreehandPanel(false);
    }

    if (['text', 'select', 'pan', 'zoom'].includes(activeTool)) return;

    const centerX = canvas.width! / 2;
    const centerY = canvas.height! / 2;

    let newObject: fabric.Object;

    switch (activeTool) {
      case 'arrow':
        newObject = new fabric.Line(
          [centerX - 50, centerY, centerX + 50, centerY],
          {
            stroke: objectColor,
            strokeWidth: strokeWidth,
            fill: objectColor,
            strokeLineCap: 'round',
            originX: 'center',
            originY: 'center',
            selectable: true,
            hasControls: true,
          }
        );
        break;
      
      case 'circle':
        newObject = new fabric.Circle({
          left: centerX,
          top: centerY,
          radius: 30,
          fill: 'transparent',
          stroke: objectColor,
          strokeWidth: strokeWidth,
          selectable: true,
          originX: 'center',
          originY: 'center',
        });
        break;
      
      case 'rectangle':
        newObject = new fabric.Rect({
          left: centerX,
          top: centerY,
          width: 60,
          height: 40,
          fill: 'transparent',
          stroke: objectColor,
          strokeWidth: strokeWidth,
          selectable: true,
          originX: 'center',
          originY: 'center',
        });
        break;
      
      default:
        return;
    }

    canvas.add(newObject);
    canvas.setActiveObject(newObject);
    canvas.renderAll();
    setActiveTool(null);
  }, [activeTool, canvas, isImageLoaded, objectColor, strokeWidth]);

  // Configuração das ferramentas (apenas para texto e desenho livre)
  useEffect(() => {
    if (!canvas || !isImageLoaded) return;

    const handleMouseDown = (e: fabric.IEvent) => {
      if (!activeTool || !e.pointer) return;

      const pointer = e.pointer;
      
      if (activeTool === 'text') {
        const text = new fabric.Textbox(textInput || 'Texto', {
          left: pointer.x,
          top: pointer.y,
          fontSize: 16,
          fill: textColor,
          backgroundColor: textBgColor === 'transparent' ? '' : textBgColor,
          width: 150,
          selectable: true,
          hasControls: true,
        });
        canvas.add(text);
        setTextInput('');
        setActiveTool(null);
        canvas.renderAll();
      }
    };

    canvas.on('mouse:down', handleMouseDown);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
    };
  }, [activeTool, canvas, textInput, isImageLoaded, textColor, textBgColor]);

  // Ativa/desativa o modo de desenho livre
  useEffect(() => {
    if (!canvas) return;
    
    if (activeTool === 'freehand') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = objectColor;
      canvas.freeDrawingBrush.width = strokeWidth;
      setShowFreehandPanel(true);
    } else {
      canvas.isDrawingMode = false;
      setShowFreehandPanel(false);
    }
  }, [activeTool, canvas, objectColor, strokeWidth]);

  // Update object properties when they change
  useEffect(() => {
    if (!canvas || !selectedObject) return;

    const updateObject = () => {
      if (selectedObject instanceof fabric.Textbox) {
        selectedObject.set({
          fill: objectColor,
          backgroundColor: textBgColor === 'transparent' ? '' : textBgColor
        });
      } else {
        selectedObject.set({
          stroke: objectColor,
          strokeWidth: strokeWidth
        });
      }
      canvas.renderAll();
    };

    updateObject();
  }, [objectColor, strokeWidth, textBgColor, canvas, selectedObject]);

  // Handle zoom
  const handleZoom = (direction: 'in' | 'out') => {
    if (!canvas || !backgroundImage) return;
    
    const zoomFactor = direction === 'in' ? 1.2 : 0.8;
    const newZoom = zoomLevel * zoomFactor;
    
    if (newZoom < 0.1 || newZoom > 5) return;
    
    setZoomLevel(newZoom);
    canvas.setZoom(newZoom);
    canvas.renderAll();
  };

  // Handle pan tool activation
  const handlePanTool = () => {
    setIsPanning(!isPanning);
    setActiveTool(isPanning ? null : 'pan');
  };

  // Handle select tool
  const handleSelectTool = () => {
    setIsPanning(false);
    setActiveTool('select');
    if (canvas) {
      canvas.selection = true;
      canvas.defaultCursor = 'default';
      canvas.renderAll();
    }
  };

  const handleFreehandTool = () => {
    setActiveTool(activeTool === 'freehand' ? null : 'freehand');
  };

  const handleDeleteObject = () => {
    if (!canvas || !selectedObject) return;
    canvas.remove(selectedObject);
    setSelectedObject(null);
    canvas.renderAll();
  };

  const handleExport = () => {
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });
    
    const link = document.createElement('a');
    link.download = 'lamina-anotada.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearCanvas = () => {
    if (!canvas) return;
    
    const objects = canvas.getObjects();
    if (objects.length > 1) {
      objects.slice(1).forEach(obj => canvas.remove(obj));
      canvas.renderAll();
    }
    setSelectedObject(null);
    setShowClearConfirmation(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Modal de confirmação para apagar anotações */}
      {showClearConfirmation && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md z-55">
            <h3 className="text-lg font-medium mb-4">Você deseja apagar todas as anotações?</h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowClearConfirmation(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer"
              >
                Não
              </button>
              <button
                onClick={clearCanvas}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
              >
                Sim, apagar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 relative">
        {/* Barra de ferramentas vertical */}
        <div className="flex flex-col gap-2 p-2 bg-gray-100 rounded w-12">
          <button
            onClick={handleSelectTool}
            className={`p-2 rounded flex items-center justify-center hover:cursor-pointer ${activeTool === 'select' ? 'bg-blue-200' : 'bg-white'}`}
            title="Selecionar"
            disabled={!isImageLoaded}
          >
            <MousePointer2 size={20} />
          </button>
          <button
            onClick={() => { setActiveTool('arrow'); setIsPanning(false); }}
            className={`p-2 rounded flex items-center justify-center hover:cursor-pointer ${activeTool === 'arrow' ? 'bg-blue-200' : 'bg-white'}`}
            title="Linha"
            disabled={!isImageLoaded}
          >
            <Minus size={20} />
          </button>
          <button
            onClick={() => { setActiveTool('circle'); setIsPanning(false); }}
            className={`p-2 rounded flex items-center justify-center hover:cursor-pointer ${activeTool === 'circle' ? 'bg-blue-200' : 'bg-white'}`}
            title="Círculo"
            disabled={!isImageLoaded}
          >
            <Circle size={20} />
          </button>
          <button
            onClick={() => { setActiveTool('rectangle'); setIsPanning(false); }}
            className={`p-2 rounded flex items-center justify-center hover:cursor-pointer ${activeTool === 'rectangle' ? 'bg-blue-200' : 'bg-white'}`}
            title="Retângulo"
            disabled={!isImageLoaded}
          >
            <Square size={20} />
          </button>
          <button
            onClick={() => { handleFreehandTool(); setIsPanning(false); }}
            className={`p-2 rounded flex items-center justify-center hover:cursor-pointer ${activeTool === 'freehand' ? 'bg-blue-200' : 'bg-white'}`}
            title="Desenho livre"
            disabled={!isImageLoaded}
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => { setActiveTool('text'); setIsPanning(false); }}
            className={`p-2 rounded flex items-center justify-center hover:cursor-pointer ${activeTool === 'text' ? 'bg-blue-200' : 'bg-white'}`}
            title="Texto"
            disabled={!isImageLoaded}
          >
            <Type size={20} />
          </button>
          <button
            onClick={() => setShowClearConfirmation(true)}
            className="p-2 bg-white rounded text-red-600 flex items-center justify-center hover:cursor-pointer group relative"
            disabled={!isImageLoaded}
            title="Apagar Anotações"
          >
            <FileX2Icon size={20} />
          </button>
          <button
            onClick={handleExport}
            className="p-2 bg-green-600 text-white rounded flex items-center justify-center mt-auto hover:cursor-pointer group relative"
            disabled={!isImageLoaded}
            title="Salvar Lâmina"
          >
            <Save size={20} />
          </button>
        </div>

        {/* Canvas container */}
        <div className="flex-1 relative bg-black">
          {/* Painel de propriedades (posicionado absolutamente) */}
          {selectedObject && (
            <div className="absolute top-0 left-0 right-0 z-10 mb-4 p-3 bg-gray-100 rounded-lg flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <span className="mr-2 text-sm">Cor:</span>
                <input
                  type="color"
                  value={objectColor}
                  onChange={(e) => setObjectColor(e.target.value)}
                  className="w-8 h-8 cursor-pointer"
                />
              </div>
              
              {!(selectedObject instanceof fabric.Textbox) && (
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Espessura:</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-24 cursor-pointer"
                  />
                  <span className="ml-2 text-sm w-4">{strokeWidth}</span>
                </div>
              )}
              
              {selectedObject instanceof fabric.Textbox && (
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Fundo:</span>
                  <input
                    type="color"
                    value={textBgColor === 'transparent' ? '#ffffff' : textBgColor}
                    onChange={(e) => setTextBgColor(e.target.value)}
                    className="w-8 h-8 cursor-pointer"
                  />
                  <button
                    onClick={() => setTextBgColor('transparent')}
                    className="ml-1 p-1 text-xs border rounded hover:cursor-pointer"
                    title="Remover fundo"
                  >
                    X
                  </button>
                </div>
              )}
              
              <button
                onClick={handleDeleteObject}
                className="ml-auto p-2 bg-red-100 text-red-600 rounded flex items-center hover:cursor-pointer"
                title="Deletar objeto"
              >
                <Trash2 size={16} className="mr-1" />
                <span className="text-sm">Deletar</span>
              </button>
            </div>
          )}

          {/* Painel de navegação (posicionado absolutamente) */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
            <button
              onClick={handlePanTool}
              className={`p-2 rounded-full shadow flex items-center justify-center hover:cursor-pointer ${isPanning ? 'bg-blue-200' : 'bg-white'}`}
              title="Mover"
              disabled={!isImageLoaded}
            >
              <Move size={20} />
            </button>
            <button
              onClick={() => handleZoom('in')}
              className="p-2 bg-white rounded-full shadow flex items-center justify-center hover:cursor-pointer"
              title="Ampliar"
              disabled={!isImageLoaded}
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="p-2 bg-white rounded-full shadow flex items-center justify-center hover:cursor-pointer"
              title="Reduzir"
              disabled={!isImageLoaded}
            >
              <ZoomOut size={20} />
            </button>
            <div className="text-center text-white text-sm bg-black bg-opacity-50 rounded px-2 py-1">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>

          {/* Painel de propriedades do desenho livre */}
          {showFreehandPanel && (
            <div className="absolute top-4 right-4 z-10 p-3 bg-gray-100 rounded-lg flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <span className="mr-2 text-sm">Cor:</span>
                <input
                  type="color"
                  value={objectColor}
                  onChange={(e) => {
                    setObjectColor(e.target.value);
                    if (canvas) {
                      canvas.freeDrawingBrush.color = e.target.value;
                    }
                  }}
                  className="w-8 h-8 cursor-pointer"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-sm">Espessura:</span>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={strokeWidth}
                  onChange={(e) => {
                    const newWidth = Number(e.target.value);
                    setStrokeWidth(newWidth);
                    if (canvas) {
                      canvas.freeDrawingBrush.width = newWidth;
                    }
                  }}
                  className="w-24 cursor-pointer"
                />
                <span className="ml-2 text-sm w-4">{strokeWidth}</span>
              </div>
            </div>
          )}

          {/* Canvas para a lâmina */}
          <div 
            ref={canvasContainerRef}
            className="border rounded overflow-hidden"
            style={{ height: '600px', width: '100%' }}
          >
            <canvas ref={canvasRef} />
            {!isImageLoaded && (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <p className="text-gray-500">Carregando imagem...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaminaInterativa;