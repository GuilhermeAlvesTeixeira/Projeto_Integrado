# Repositório da Equipe: Austrália Renascentista

## Palavras-chave
Educação, Biologia, Zoologia, NextJS, React, JavaScript, Typescript

## Índice
- [Sobre](#sobre)
- [Equipe](#equipe)
- [Tecnologias](#tecnologias)
- [Como Rodar](#como-rodar)
- [Licença](#licença)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Protótipo](#protótipo)
- [Quadro Kanban](#link-para-o-quadro-kanban)

## Sobre
Este projeto consiste no desenvolvimento de um aplicativo móvel educativo, voltado para alunos da disciplina Invertebrados I da Universidade Federal do Ceará (UFC). O principal objetivo é auxiliar no reforço do conteúdo teórico-prático da disciplina, com foco na visualização das estruturas anatômicas dos invertebrados.

## Equipe
| Nome              | Função                     |
|-------------------|----------------------------|
| Aldair Gomes      | Desenvolvedor Backend      |
| Felipe Moreira    | Gerente de Projetos        |
| Gabriel Gois      | Ilustrador/Designer        |
| Guilherme Alves   | Desenvolvedor FrontEnd     |
| João Lucas        | Designer de UI/UX          |

## Tecnologias

### Core
- **Next.js 15.3.3** (com Turbopack)
- **React 19**
- **TypeScript 5**

### UI/Design
- **Tailwind CSS** (com plugins: tailwind-merge, tw-animate-css)
- **ShadCN UI** (componentes acessíveis)
- **Radix UI** (primitivos acessíveis)
- **Heroicons & Lucide** (bibliotecas de ícones)
- **Framer Motion 12** (animações)
- **React Confetti** (efeitos visuais)

### Interatividade
- **DnD Kit** (drag-and-drop para laboratório virtual)
- **Fabric.js 4.6** (manipulação de imagens/canvas)
- **use-sound** (efeitos sonoros)

### Autenticação & Dados
- **Clerk** (autenticação moderna)
- **Supabase** (banco de dados PostgreSQL + APIs)
  - @supabase/supabase-js

## Como Rodar
1. Clone o repositório:
  ```bash
    git clone https://github.com/GuilhermeAlvesTeixeira/Projeto_Integrado
    cd Projeto_Integrado
  ```

2.  instale as dependências:
  ```bash
    npm install next react react-dom
  ```
3. No terminal, digite:
  ```bash
    npm run dev
  ```

4. Acesse localhost:3000

## Protótipo

**Figma:** [Figma](https://www.figma.com/design/f8RxmlymAQIInzAciAjpTr/P1--Copy-?node-id=0-1&p=f&t=LGcWhqIifeYn0D11-0)

## Licença

Este projeto está sob a GNU GPLv3.

## Link para o Quadro Kanban
https://github.com/users/GuilhermeAlvesTeixeira/projects/3/views/1

## Legenda de Codificação

| Tipo de item                 | Nome comum              | Código          | 
| ---------------------------- | ----------------------- | --------------- |
| ✅ Requisitos funcionais     | Requisito Funcional     | **RF00N**       |  
| ⚙️ Tarefa técnica            | Tarefa de Implementação | **TI00N**       |
| 🎨 Design / UI               | Tarefa de Design        | **TD00N**       |

### Sufixos
|Sufixo| Significado|
|------|------------|
|_F    |Frontend    |
|_B    |BackEnd     |

Ex: RF00N_F (Requisito funcional relacionado com o FrontEnd).


##  Requisitos Funcionais

| Código  | Descrição | Front End | Back End | Prioridade | Link |
|---------|-----------|-----------|-----------|-----------|-----------|
| **RF001** | Autenticar usuário por meio de login e senha. |Disponibilizar botões que forneçam uma tela de criação de conta ou login quando pressionados.|Enviar os emails e senhas fornecidos ao banco de dados para armazená-los.|Alta|
| **RF002** | Navegar pelos filos de invertebrados por meio de um menu organizado. |Exibir tela principal que mostre todos os filos disponíveis.|Direcionar o usuário ao filo selecionado.|Alta|
| **RF003** | Exibir imagens ilustrativas dos invertebrados. |Fornecer imagens necessárias para estudos.|Puxar imagens do banco de dados.|Alta|
| **RF004** | Oferecer textos explicativos sobre o conteúdo abordado. |Exibir conteúdo expositivo sobre o filo e tema selecionados.|Fornecer os conteúdos carregados do código.|Alta|
| **RF005** | Disponibilizar uma trilha de conteúdos práticos organizados por filo. |Exibir temas selecionáveis em ordem compreensiva.|Levar os usuários aos conteúdos e laboratórios selecionados.|Alta|
| **RF006** | Permitir que o aluno realize atividades de identificação de estruturas em imagens. |Mostrar imagens ilustrativas e reais dos seres sendo estudados.|Garantir a interação e responsividade dos quizzes e laboratórios.|Alta|
| **RF007** | Fornecer feedback imediato sobre a resposta do aluno em atividades de identificação. |Exibir resultados dos quizzes e laboratórios.|Armazenar as respostas dos alunos e compará-las com as respostas do banco de dados para retorná-las como certas ou erradas.|Alta|
| **RF008** | Disponibilizar um laboratório virtual com exemplos visuais do conteúdo estudado. | Exibir um laboratório virtual para que o usuário escolha o espécime a ser estudado.|Usar uma biblioteca que permite a exibição de imagens reais dos animais estudados para auxiliar a identificação de estruturas anatômicas e ainteração com essas imagens.|Alta|
| **RF009** | Ampliar imagens para visualizar detalhes anatômicos no laboratório.|Exibir opção para ampliar a imagem no laboratório.|Ativar uma função que amplia a imagem por meio de biblioteca especial.|Média|
| **RF010** | Permitir a comparação entre imagens reais e imagens ilustrativas dos animais estudados. |Exibir imagens reais e imagens ilustrativas lado a lado para auxiliar os estudos dos alunos.|Buscar ambas as imagens reais e ilustrativas do código.|Alta|
| **RF011** | Permitir que o aluno faça suas próprias anotações no laboratório virtual. |Disponibilizar um botão com ícone de lápis que permita anotações e desenhos com o mouse.|Usar uma biblioteca especial para permitir a interação com imagens.|Alta|
| **RF012** | Permitir o download das imagens do laboratório virtual com as anotações dos alunos. |Disponibilizar botão de download no laboratório.|Uso de biblioteca especial que permita o download das imagens na máquina do usuário.|Alta|
| **RF013** | Oferecer opções de acessibilidade, como contraste visual e aumento da fonte. |Exibir botões em todas as páginas que permitem ao usuário mudar o contraste das cores e o tamnho da fonte.|Trocar o esquema de cores e tamanho da fonte no caso de ativação das funções.|Média|