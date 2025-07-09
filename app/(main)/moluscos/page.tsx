"use client"

import FiloTemplate from '@/components/filo-template';

const MoluscosPage = () => {
 
  const moluscosData = {
    name: 'Moluscos',
    modules: [
      {
        id: 'intro',
        title: 'Introdução',
        level: 1,
        icon: '🐚',
        duration: 5,
        completed: true,
        link: "/moluscos/introdução",
      },
      {
        id: 'anatomy',
        title: 'Anatomia',
        level: 1,
        icon: '🔍',
        duration: 8,
        completed: true,
        link: "/moluscos/anatomia",
      },
      {
        id: 'lifecycle',
        title: 'Ciclo de Vida',
        level: 2,
        icon: '🔄',
        duration: 6,
        completed: false,
        link: "/moluscos/ciclo-de-vida",
      },
      {
        id: 'classes',
        title: 'Classes',
        level: 2,
        icon: '📊',
        duration: 7,
        completed: false,
        link: "/moluscos/classes",
      },
      {
        id: 'lab',
        title: 'Laboratório',
        level: 3,
        icon: '🧪',
        duration: 10,
        completed: false,
        link: "/moluscos/laboratorio",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <FiloTemplate phylum={moluscosData} />
    </div>
  );
};

export default MoluscosPage;