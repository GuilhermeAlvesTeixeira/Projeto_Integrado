export interface EstruturaItem {
  nome: string;
  descricao: string;
}

export interface Lamina {
  label: string;
  url: string;
  pranchaImage?: string;
  estrutura: {
    nome: string;
    itens: EstruturaItem[];
  };
}

export interface SpecimenData {
  nome: string;
  descricaoGeral: string;
  laminas: Lamina[];
}

export interface Specimens {
  [key: string]: SpecimenData;
}

export interface PranchaInformativaProps {
  specimenData: SpecimenData;
  laminas: Lamina[];
  onImageChange: (index: number) => void;
  selectedImageIndex: number;
}