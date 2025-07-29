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
        icon: '🐚', // Emoji para a barra de módulos
        image: '/molusco-intro.jpg', // Imagem para o card central
        duration: 5,
        completed: true,
        link: "/moluscos/intro",
      },
      {
        id: 'lab',
        title: 'Laboratório',
        level: 3,
        icon: '🧪', // Emoji para a barra de módulos
        image: '/molusco-lab.jpg', // Imagem para o card central
        duration: 10,
        completed: false,
        link: "/moluscos/laboratorio",
      },
      {
        id: 'anatomy',
        title: 'Anatomia',
        level: 1,
        icon: '🔍', // Emoji para a barra de módulos
        image: '/molusco-anatomy.jpeg', // Imagem para o card central
        duration: 8,
        completed: true,
        link: "/moluscos/anatomia",
      },
      {
        id: 'sistematica',
        title: 'Sistemática',
        level: 2,
        icon: '📊', // Emoji para a barra de módulos
        image: '/molusco-classes.png', // Imagem para o card central
        duration: 7,
        completed: false,
        link: "/moluscos/sistematica",
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