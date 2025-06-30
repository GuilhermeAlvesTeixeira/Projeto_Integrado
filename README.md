# Repositório da Equipe: Austrália Renascentista

## Palavras-chave

Educação, Biologia, Zoologia, Node, React, JavaScript, HTML, CSS.

## Índice

- [Sobre](#sobre)
- [Equipe](#equipe)
- [Tecnologias](#tecnologias)
- [Como Rodar](#como-rodar)
- [Licença](#licença)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos Não-Funcionais](#requisitos-não-funcionais)

## Sobre

Este projeto consiste no desenvolvimento de um aplicativo móvel educativo, voltado para alunos da disciplina Invertebrados I da Universidade Federal do Ceará (UFC). O principal objetivo é auxiliar no reforço do conteúdo teórico-prático da disciplina, com foco na visualização das estruturas anatômicas dos invertebrados.

O aplicativo será altamente imagético e interativo, oferecendo aos alunos recursos que estimulem a memorização e o reconhecimento das principais características morfológicas dos diferentes filos de invertebrados.

Todo o conteúdo será disponibilizado localmente no próprio aplicativo, não exigindo conexão com a internet para funcionamento.


## Equipe

| Nome              | Função                     |
|-------------------|----------------------------|
| Aldair Gomes      | Desenvolvedor Backend      |
| Felipe Moreira    | Gerente de Projetos        |
| Gabriel Gois      | Ilustrador/Designer        |
| Guilherme Alves   | Desenvolvedor FrontEnd     |
| João Lucas        | Designer de UI/UX          |


## Tecnologias

## Frontend
- **Framework:** [Next.js](https://nextjs.org/)
- **Linguagens:** JavaScript e TypeScript
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/), CSS
- **Componentes e UI:**
  - [ShadCN UI](https://ui.shadcn.dev/): Biblioteca de componentes acessíveis e personalizados com Tailwind
  - [Radix UI](https://www.radix-ui.com/): Base para componentes acessíveis como diálogos, popovers e menus
  - [Heroicons](https://heroicons.com/): Ícones SVG otimizados para interfaces minimalistas
  - [Lucide](https://lucide.dev/): Ícones modernos e personalizáveis baseados no Feather

## Autenticação
- **[Clerk](https://clerk.com/):** Autenticação com login por e-mail, senha e redes sociais, integrada ao Next.js

## Banco de Dados
- **[Supabase](https://supabase.com/):** Backend-as-a-Service com autenticação, API e banco de dados em tempo real
- **PostgreSQL:** Banco de dados relacional utilizado via Supabase

## Outros
- **Controle de versão:** Git e GitHub
- **Qualidade de código:** ESLint
- **Gerenciamento de dependências:** npm

## Como Rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/GuilhermeAlvesTeixeira/Projeto_Integrado

## Licença

Este projeto está sob a GNU GPLv3.

## Link para o Quadro Kanban
https://github.com/users/GuilhermeAlvesTeixeira/projects/3/views/1

## Legenda de Codificação

| Tipo de item                 | Nome comum              | Código          | 
| ---------------------------- | ----------------------- | --------------- |
| ✅ Requisitos funcionais     | Requisito Funcional     | **RF00N**       | 
| 📘 Requisitos não funcionais | Requisito Não Funcional | **RNF00N**      | 
| ⚙️ Tarefa técnica            | Tarefa de Implementação | **TI00N**       |
| 🎨 Design / UI               | Tarefa de Design        | **TD00N**       |

### Sufixos
|Sufixo| Significado|
|------|------------|
|_F    |Frontend    |
|_B    |BackEnd     |

Ex: RF00N_F (Requisito funcional relacionado com o FrontEnd).


##  Requisitos Funcionais

| Código  | Descrição | Front End | Back End | Prioridade |
|---------|-----------|-----------|-----------|-----------|
| **RF001** | Autenticar usuário por meio de login e senha. |Disponibilizar botões que forneçam uma tela de criação de conta ou login quando pressionados.|Enviar os emails e senhas fornecidos ao banco de dados para armazená-los.|Alta|
| **RF002** | Navegar pelos filos de invertebrados por meio de um menu organizado. |Exibir tela principal que mostre todos os filos disponíveis.|Direcionar o usuário ao filo selecionado.|Alta|
| **RF003** | Exibir imagens ilustrativas de diferentes grupos de invertebrados. |Fornecer imagens necessárias para estudos.|Puxar imagens do banco de dados.|Alta|
| **RF004** | Ampliar imagens para visualizar detalhes anatômicos. |Exibir opção para ampliar a imagem.|Ativar uma função que amplia a imagemm.|Média|
| **RF005** | Oferecer textos explicativos sobre cada filo abordado. |Exibir conteúdo expositivo sobre o filo e tema selecionados.|Fornecer os conteúdos carregados do banco de dados.|Alta|
| **RF006** | Disponibilizar uma trilha de conteúdos práticos organizados por filo. |Exibir temas selecionáveis em ordem compreensiva.|Levar os usuários aos conteúdos e laboratórios selecionados.|Alta|
| **RF007** | Permitir que o aluno realize atividades de identificação de estruturas em imagens. |Mostrar imagens ilustrativas e reais dos seres sendo estudados.|Garantir a interação e responsividade dos quizzes e laboratórios.|Alta|
| **RF008** | Fornecer feedback imediato sobre a resposta do aluno em atividades de identificação. |Exibir resultados dos quizzes e laboratórios.|Armazenar as respostas dos alunos e compará-las com as respostas do banco de dados para retorná-las como certas ou erradas.|Alta|
| **RF009** | Marcar conteúdos como “vistos” ou “para revisar”. |Exibir a opção de marcar conteúdos e automaticamente marcar conteúdos acessados.|Armazenar conteúdos acessados e conteúdos marcados para revisão para acompanhar o progresso e torná-los de fácil acesso depois.|Média|
| **RF010** | Permitir a visualização das estruturas com destaque ao tocar nas imagens (ex: realce de partes). |Exibir as partes selecionadas em destaque para permitir um estudo detalhado.|Tornar interagível todos os componentes individuais de uma imagem para permitir o destaque.|Média|
| **RF011** | Manter o progresso local do aluno, como lições visualizadas e acertos em atividades. |Mostrar respostas certas dos quizzes e laboratórios e mostrar o progresso do aluno na homepage.|Armazenar as respostas e conteúdos vistos para disponibilizá-los depois.|Alta|
| **RF012** | Oferecer opções de acessibilidade, como contraste visual e aumento da fonte. |Exibir botões em todas as páginas que permitem ao usuário mudar o contraste das cores e o tamnho da fonte.|Trocar o esquema de cores e tamanho da fonte no caso de ativação das funções.|Média|


##  Requisitos Não-Funcionais

| Código  | Descrição | Prioridade |
|---------|-----------|-----------|
|RNF001| Garantir o mínimo de segurança dos dados dos usuários.|Alta|
|RNF002| Adaptar o layout da tela a diferentes tipos de dispositivos.|Alta|
|RNF003| Garantir integridade dos dados.|Alta|
|RNF004| Estar preparado para operar em redes lentas.|Média|
|RNF005| Responder em 3 segundos ou menos.|Alta|
|RNF006| Carregar todo o conteúdo de leitura quando selecionado para que possa ser lido offline.|Média|
|RNF007| Comprimir imagens para minimizar tempo de carregamento.|Média|
|RNF008| Guardar memória no cachê do navegador para minimizar tempo de carregamento.|Média|