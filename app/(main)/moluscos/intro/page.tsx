
/* futuramente jogar o conteúdo em um json separado*/

"use client";

import Link from "next/link";
import { useTheme } from "@/components/theme-context";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
  loading: () => null
});

export default function Introducao() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const [playSuccess] = useSound('/success.mp3');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const themeStyles = {
    light: {
      bg: "bg-white",
      text: "text-gray-800",
      border: "border-gray-200",
      buttonEnabled: "bg-green-600 hover:bg-green-700 text-white",
      buttonDisabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
      accent: "text-green-600",
      progress: "bg-green-200",
      progressActive: "bg-green-600",
      divider: "bg-green-600",
      cardBg: "bg-white",
      cardBorder: "border-gray-200",
      highlight: "bg-green-50 border-l-4 border-green-500",
      caption: "text-gray-500",
      curiosity: "bg-green-50 border-l-4 border-green-500"
    },
    dark: {
      bg: "bg-gray-900",
      text: "text-gray-100",
      border: "border-gray-700",
      buttonEnabled: "bg-green-600 hover:bg-green-500 text-white",
      buttonDisabled: "bg-gray-700 text-gray-400 cursor-not-allowed",
      accent: "text-green-600",
      progress: "bg-gray-600",
      progressActive: "bg-green-600",
      divider: "bg-green-600",
      cardBg: "bg-gray-900",
      cardBorder: "border-gray-700",
      highlight: "bg-gray-800 border-l-4 border-gray-700",
      caption: "text-gray-400",
      curiosity: "bg-gray-800 border-l-4 border-gray-700"
    },
    "high-contrast": {
      bg: "bg-black",
      text: "text-white",
      border: "border-yellow-500",
      buttonEnabled: "bg-yellow-500 hover:bg-yellow-400 text-black",
      buttonDisabled: "bg-gray-800 text-gray-300 cursor-not-allowed",
      accent: "text-yellow-400",
      progress: "bg-gray-800",
      progressActive: "bg-yellow-500",
      divider: "bg-yellow-500",
      cardBg: "bg-black",
      cardBorder: "border-yellow-500",
      highlight: "bg-black border-1 border-yellow-500",
      caption: "text-yellow-400",
      curiosity: "bg-black border-1 border-yellow-500"
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (currentPage === 5) {
      setShowConfetti(true);
      playSuccess();

      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 10000);

      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [currentPage, playSuccess]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getFeedbackConfig = () => {
    return {
      emoji: '⭐',
      mensagem: 'Excelente! Você conhece bem os moluscos!',
      cor: theme === 'high-contrast' ? 'text-yellow-400' : theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
    };
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <section className={`mb-16 p-8 rounded-lg ${currentTheme.border} border ${currentTheme.cardBg}`}>
            <div className="prose max-w-none">
              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                Os moluscos estão entre os invertebrados mais conhecidos do planeta — quem nunca viu um caracol, uma lesma, uma ostra, uma lula ou um polvo? Mas o que nem todo mundo sabe é que esses animais fazem parte de um grupo extremamente diverso e com uma longa história de relação com os seres humanos.
              </p>

              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                Desde os tempos antigos, suas conchas foram usadas como ferramentas, recipientes, instrumentos musicais, moedas, ornamentos e até símbolos religiosos. Alguns pigmentos famosos, como a púrpura real e o azul citado na Bíblia, eram extraídos de certas lesmas marinhas. Povos aborígenes também usavam moluscos como alimento essencial e como instrumentos do dia a dia.
              </p>

              <div className="my-8 flex flex-col items-center">
                <img
                  src="/molusco-classes.png"
                  alt="Diversidade de moluscos"
                  className="rounded-lg shadow-lg max-w-full h-auto mb-2"
                />
                <span className={`text-sm italic ${currentTheme.caption}`}>
                  Figura 1 – Moluscos: Diversidade do Filo Mollusca. Fonte: TIMELINES ALIVE (2025): Unleashing Life: The Cambrian Explosion and the Birth of Modern Animal Kingdoms.
                </span>
              </div>

              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                Atualmente, milhões de toneladas de moluscos são coletadas todos os anos nos litorais ao redor do mundo. Já foram descritas cerca de 80.000 espécies vivas, e esse número pode ser o dobro, considerando as muitas que ainda não foram nomeadas.

                O filo Mollusca é formado por oito classes:
              </p>

              <ul className={`list-disc pl-12 mb-6 space-y-2 text-lg ${currentTheme.text}`}>
                <li>Bivalvia (mariscos e ostras)</li>
                <li>Gastropoda (caracóis e lesmas)</li>
                <li>Cephalopoda (lulas e polvos)</li>
                <li>Polyplacophora (quítons)</li>
                <li>Scaphopoda (dentálios)</li>
                <li>Monoplacophora (como a Neopilina)</li>
                <li>Caudofoveata e Solenogastres (dois grupos de moluscos vermiformes que vivem enterrados e possuem escleritos no lugar de conchas).</li>
              </ul>

              <p className={`mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                Apesar das diferenças externas entre esses grupos, todos compartilham um plano corporal básico que os define como moluscos. Entender essa diversidade é o primeiro passo para mergulhar no estudo dos invertebrados marinhos!
              </p>

              <div className={`mt-8 p-4 rounded-lg text-sm ${currentTheme.highlight}`}>
                <h4 className="font-semibold mb-2">Referência:</h4>
                <p> Invertebrados — Richard C. Brusca, Wendy Moore, Stephen M. Shuster, Gary J. — 3ª edição, 2018 — Editora Guanabara Koogan Ltda, p. 554.</p>
              </div>
            </div>
          </section>
        );
      case 2:
        return (
          <section className={`mb-16 p-8 rounded-lg ${currentTheme.border} border ${currentTheme.cardBg}`}>
            <div className="prose max-w-none">
              <h2 className={`text-2xl font-semibold mb-6 ${currentTheme.accent}`}>História da Classificação dos Moluscos</h2>

              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                Vamos entender a história e a classificação dos moluscos?
              </p>

              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                A história da classificação dos moluscos é longa, cheia de reviravoltas e mudanças de nomes ao longo dos séculos. Desde a Antiguidade, esses animais despertaram o interesse de estudiosos. Aristóteles, por exemplo, já os agrupava em dois grandes grupos: os Malachia (cefalópodes) e os Ostrachodermata (animais com conchas). No século XVII, o termo Mollusca foi usado por Joannes Jonston, mas só ganhou força quando Lineu o incorporou à sua classificação — mesmo misturando ali moluscos com medusas, anêmonas e até equinodermos!
              </p>

              <div className="my-8 flex flex-col items-center">
                <img
                  src="/linha-do-tempo.png"
                  alt="Linha do tempo da classificação dos moluscos"
                  className="rounded-lg shadow-lg max-w-full h-auto mb-2"
                />
                <span className={`text-sm italic ${currentTheme.caption}`}>
                  Figura 2: Evolução da classificação dos moluscos. Fonte: Autores, adaptado de Brusca et al., 2018.
                </span>
              </div>

              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                Foi apenas no final do século XIX que o grupo Mollusca começou a ser "limpo" de animais que, na verdade, pertenciam a outros filos. Cirrípides (como as cracas), tunicados e braquiópodes foram, aos poucos, sendo corretamente reposicionados. Descobertas importantes também marcaram esse período, como os primeiros aplacóforos vermiformes (como os Caudofoveata e os Solenogastres), que ajudaram a moldar a ideia atual da diversidade do filo.
              </p>

              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                A proposta de Amélie Scheltema, conhecida como hipótese Aculifera, uniu os moluscos com escleritos (estruturas rígidas como escamas e espículas), agrupando os quítons (Polyplacophora) com os aplacóforos. Você também pode encontrar nomes como Amphineura para se referir a esses grupos, embora esse termo nem sempre tenha o mesmo significado.
              </p>

              <div className={`p-4 rounded-lg mb-6 ${currentTheme.curiosity}`}>
                <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Curiosidade:</h3>
                <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                  A classe Gastropoda, uma das mais diversas do filo, passou por várias classificações ao longo da história. No século XIX, Henri Milne-Edwards dividiu os gastrópodes com base nos órgãos respiratórios em Pulmonata, Opisthobranchia e Prosobranchia. Já J. W. Spengel preferiu usar o sistema nervoso como critério, agrupando-os em Streptoneura e Euthyneura.
                </p>
              </div>

              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                Os bivalves também passaram por diferentes nomes: Bivalvia, Pelecypoda e Lamellibranchiata — todos referindo-se ao mesmo grupo. Nos últimos anos, análises moleculares, anatômicas e ultraestruturais têm ajudado a refinar a classificação dos moluscos de forma mais precisa e científica.
              </p>

              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                No entanto, a tarefa de classificar esses animais ainda é desafiadora. Muitas espécies, especialmente de gastrópodes e bivalves, são conhecidas apenas por suas conchas, o que dificulta uma identificação confiável. A história dos colecionadores europeus do século XVII, com suas coleções de conchas, ajudou a aumentar o número de nomes e sinônimos para as mesmas espécies, gerando confusão até hoje.
              </p>

              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                Agora, a classificação moderna dos moluscos se baseia na combinação de diferentes dados: morfologia, anatomia e genética. Mesmo assim, muita coisa ainda está em constante atualização — o que torna o estudo da malacologia um campo sempre vivo e cheio de descobertas!
              </p>

              <div className={`mt-8 p-4 rounded-lg text-sm ${currentTheme.highlight}`}>
                <h4 className="font-semibold mb-2">Referência:</h4>
                <p>Invertebrados — Richard C. Brusca, Wendy Moore, Stephen M. Shuster, Gary J. — 3ª edição, 2018 — Editora Guanabara Koogan Ltda, p. 555.</p>
              </div>
            </div>
          </section>
        );
      case 3:
        return (
          <section className={`mb-16 rounded-lg ${currentTheme.border} border overflow-hidden ${currentTheme.cardBg}`}>
            <div className="flex flex-col lg:flex-row">
              <div className="p-6">
                <h2 className={`text-2xl font-semibold mb-6 ${currentTheme.accent}`}>Classes de Moluscos</h2>

                <div className="space-y-6">
                  {/* Caudofoveata */}
                  <div className={`p-6 rounded-lg shadow-md ${currentTheme.cardBg} ${currentTheme.border} border`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src="/caudofoveata-rotate.jpg"
                          alt="Caudofoveata"
                          className="rounded-lg shadow-md w-full h-auto"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>Caudofoveata (= Chaetodermomorpha)</h3>
                        <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                          São moluscos em forma de "vermes" marinhos, bentônicos e escavadores, que vivem enterrados em sedimentos lamacentos. O corpo é vermiforme, cilíndrico, sem pés, olhos, tentáculos ou concha, mas coberto por uma cutícula quitinosa com escleritos calcários aragoníticos imbricados.
                        </p>
                        <p className={`text-lg leading-relaxed mt-2 ${currentTheme.text}`}>
                          Possuem escudo oral, rádula, uma pequena cavidade do manto com um par de ctenídios bipectinados, e reprodução gonocorística. Alimentam-se de microrganismos como foraminíferos.
                        </p>
                        <p className={`text-sm mt-2 font-medium ${currentTheme.text}`}>
                          🔍 Cerca de 120 espécies, como <i>Chaetoderma</i> e <i>Falcidens</i>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Solenogastres */}
                  <div className={`p-6 rounded-lg shadow-md ${currentTheme.cardBg} ${currentTheme.border} border`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src="/Solenogastres-rotate.jpg"
                          alt="Solenogastres"
                          className="rounded-lg shadow-md w-full h-auto"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>Solenogastres (= Neomeniomorpha)</h3>
                        <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                          Parecidos com os Caudofoveata, também são vermiformes e espiculados, mas apresentam vestíbulo sensorial anterior à boca, parede corporal com escleritos (espinhos ou escamas) e glândulas pedais associadas a um sulco ciliar.
                        </p>
                        <p className={`text-lg leading-relaxed mt-2 ${currentTheme.text}`}>
                          Possuem ou não rádula, e são hermafroditas. Vivem sobre cnidários e outros invertebrados, dos quais se alimentam. Não têm ctenídios, mas geralmente apresentam pregas respiratórias.
                        </p>
                        <p className={`text-sm mt-2 font-medium ${currentTheme.text}`}>
                          🔍 Cerca de 260 espécies descritas, como <i>Epimenia</i> e <i>Neomenia</i>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Monoplacophora */}
                  <div className={`p-6 rounded-lg shadow-md ${currentTheme.cardBg} ${currentTheme.border} border`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src="/monoplacophora-intro.jpg"
                          alt="Monoplacophora"
                          className="rounded-lg shadow-md w-full h-auto"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>Monoplacophora</h3>
                        <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                          São moluscos com uma concha única em forma de capuz, com anatomia interna que exibe múltiplas estruturas repetidas em série (3 a 6 pares de ctenídios, 2 pares de gônadas, 3 a 7 pares de nefrídios etc.).
                        </p>
                        <p className={`text-lg leading-relaxed mt-2 ${currentTheme.text}`}>
                          A cabeça é reduzida, com tentáculos orais, rádula, estatocistos e ânus posterior. São gonocorísticos e vivem em águas profundas.
                        </p>
                        <p className={`text-sm mt-2 font-medium ${currentTheme.text}`}>
                          🔍 Apenas cerca de 30 espécies vivas, como <i>Neopilina</i>, descobertas somente em 1952.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Polyplacophora */}
                  <div className={`p-6 rounded-lg shadow-md ${currentTheme.cardBg} ${currentTheme.border} border`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src="/poliplacoforo-intro.jpg"
                          alt="Polyplacophora"
                          className="rounded-lg shadow-md w-full h-auto"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>Polyplacophora</h3>
                        <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                          Os famosos quítons têm corpo achatado e oito placas dorsais de concha (valvas), envoltas por um cinturão espesso com espinhos ou escamas. O pé é ventral e largo, com rádula bem desenvolvida.
                        </p>
                        <p className={`text-lg leading-relaxed mt-2 ${currentTheme.text}`}>
                          Vivem fixos em substratos rochosos, da zona entremarés até regiões abissais. A cavidade do manto pode conter de 6 até mais de 80 pares de ctenídios.
                        </p>
                        <p className={`text-sm mt-2 font-medium ${currentTheme.text}`}>
                          🔍 Mais de 850 espécies descritas, como <i>Acanthopleura</i>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Gastropoda */}
                  <div className={`p-6 rounded-lg shadow-md ${currentTheme.cardBg} ${currentTheme.border} border`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src="/gastropoda.jpg"
                          alt="Gastropoda"
                          className="rounded-lg shadow-md w-full h-auto"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>Gastropoda</h3>
                        <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                          O grupo mais diverso de moluscos inclui caracóis, lesmas e lapas. A maioria possui concha espiralada, mas ela pode ser reduzida ou ausente. O corpo passa por torção durante o desenvolvimento, resultando na rotação dos sistemas interno e nervoso.
                        </p>
                        <p className={`text-lg leading-relaxed mt-2 ${currentTheme.text}`}>
                          A cabeça é bem definida, com tentáculos, olhos e rádula. O pé é muscular e rastejante, com opérculo em muitas espécies. Vivem em ambientes marinhos, dulcícolas e terrestres.
                        </p>
                        <p className={`text-sm mt-2 font-medium ${currentTheme.text}`}>
                          🔍 Mais de 70.000 espécies vivas, divididas tradicionalmente em Prosobranchia, Opisthobranchia e Pulmonata (essa divisão, porém, é desatualizada segundo estudos modernos).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bivalvia */}
                  <div className={`p-6 rounded-lg shadow-md ${currentTheme.cardBg} ${currentTheme.border} border`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src="/bivalvia.png"
                          alt="Bivalvia"
                          className="rounded-lg shadow-md w-full h-auto"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>Bivalvia (= Pelecypoda = Lamellibranchiata)</h3>
                        <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                          Inclui mariscos, ostras, mexilhões e vieiras. O corpo é lateralmente comprimido, com duas valvas articuladas. Não possuem cabeça ou rádula. A alimentação é feita por filtração com ajuda de grandes ctenídios bipectinados.
                        </p>
                        <p className={`text-lg leading-relaxed mt-2 ${currentTheme.text}`}>
                          O pé é geralmente estreito e adaptado à escavação. O sistema nervoso é simples, com gânglios distintos. O manto pode formar sifões.
                        </p>
                        <p className={`text-sm mt-2 font-medium ${currentTheme.text}`}>
                          🔍 Cerca de 9.200 espécies. A classificação moderna se baseia em características da concha, órgãos internos e dados moleculares.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scaphopoda */}
                  <div className={`p-6 rounded-lg shadow-md ${currentTheme.cardBg} ${currentTheme.border} border`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src="/Scaphopoda.jpg"
                          alt="Scaphopoda"
                          className="rounded-lg shadow-md w-full h-auto"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>Scaphopoda</h3>
                        <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                          Conhecidos como dentálios ou "conchas dente-de-elefante", possuem concha tubular aberta nas duas extremidades. Não têm olhos nem ctenídios, mas apresentam uma rádula longa e um focinho com captáculos — tentáculos longos e contráteis usados para capturar pequenas presas no sedimento.
                        </p>
                        <p className={`text-lg leading-relaxed mt-2 ${currentTheme.text}`}>
                          São animais marinhos e escavadores.
                        </p>
                        <p className={`text-sm mt-2 font-medium ${currentTheme.text}`}>
                          🔍 Mais de 500 espécies, como <i>Dentalium</i>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cephalopoda */}
                  <div className={`p-6 rounded-lg shadow-md ${currentTheme.cardBg} ${currentTheme.border} border`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src="/cephalopoda.png"
                          alt="Cephalopoda"
                          className="rounded-lg shadow-md w-full h-auto"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className={`text-xl font-bold mb-3 ${currentTheme.accent}`}>Cephalopoda</h3>
                        <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                          Inclui polvos, lulas, náutilos e sibas — os moluscos mais avançados. Possuem cabeça grande com olhos complexos, bico, rádula e tentáculos preênseis ao redor da boca.
                        </p>
                        <p className={`text-lg leading-relaxed mt-2 ${currentTheme.text}`}>
                          Têm um sistema circulatório quase completamente fechado, um sifão para locomoção por propulsão a jato e grande capacidade cognitiva. A concha pode estar presente (Nautilus), interna (lulas) ou ausente (polvos).
                        </p>
                        <p className={`text-sm mt-2 font-medium ${currentTheme.text}`}>
                          🔍 Cerca de 700 espécies vivas, todas marinhas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Referência */}
                  <div className={`mt-8 p-4 rounded-lg text-sm ${currentTheme.highlight}`}>
                    <h4 className="font-semibold mb-2">Referência:</h4>
                    <p>Invertebrados — Richard C. Brusca, Wendy Moore, Stephen M. Shuster, Gary J. — 3ª edição, 2018 — Editora Guanabara Koogan Ltda, p. 559-575.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case 4:
        return (
          <section className={`mb-16 p-8 rounded-lg ${currentTheme.border} border ${currentTheme.cardBg}`}>
            <div className="prose max-w-none">
              <h2 className={`text-2xl font-semibold mb-6 ${currentTheme.accent}`}>Plano corporal básico</h2>

              <p className={`indent-12 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                Os moluscos apresentam uma das maiores diversidades morfológicas do reino animal, variando desde espécies microscópicas até gigantes como lulas e polvos. Apesar dessa variedade, todos compartilham um plano corporal básico que os define como moluscos:
              </p>

              <div className="space-y-8">
                {/* Corpo dividido em três regiões */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <img
                      src="/anatomia-basica-molusco.jpg"
                      alt="Anatomia básica dos moluscos"
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Corpo dividido em três regiões</h3>
                    <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                      <strong>Cabeça</strong> (com órgãos sensoriais), <strong>pé muscular</strong> (para locomoção) e <strong>massa visceral</strong> (contendo órgãos internos). Esta organização básica varia entre as classes, sendo mais evidente em gastrópodes e cefalópodes.
                    </p>
                  </div>
                </div>

                {/* Manto */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <img
                      src="/manto-molusco.png"
                      alt="Manto dos moluscos"
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Manto</h3>
                    <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                      Dobra de tecido que envolve a massa visceral e secreta a concha (quando presente). O manto é responsável pela formação da concha em espécies que a possuem e cria a cavidade do manto, um espaço importante para trocas gasosas e excreção.
                    </p>
                  </div>
                </div>

                {/* Cavidade do manto */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <img
                      src="/cavidade-manto.jpg"
                      alt="Cavidade do manto"
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Cavidade do manto</h3>
                    <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                      Espaço que abriga as brânquias (ctenídios) e as aberturas dos sistemas digestivo, excretor e reprodutor. Em moluscos aquáticos, a água circula através desta cavidade, permitindo respiração, alimentação e liberação de gametas.
                    </p>
                  </div>
                </div>

                {/* Rádula */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <img
                      src="/radula.jpg"
                      alt="Rádula dos moluscos"
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Rádula</h3>
                    <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                      Estrutura raspadora de alimento (ausente nos bivalves). A rádula é uma faixa quitinosa com fileiras de dentículos que funciona como uma "língua raspadora". Sua forma varia conforme a dieta, sendo mais complexa em espécies herbívoras e mais simples em carnívoras.
                    </p>
                  </div>
                </div>

                {/* Sistema circulatório */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <img
                      src="/sistema-circulatorio.jpg"
                      alt="Sistema circulatório dos moluscos" 
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Sistema circulatório aberto</h3>
                    <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                      (Exceto em cefalópodes) com hemocele como cavidade principal. O sangue (hemolinfa) é bombeado pelo coração através de artérias para espaços tissulares (hemocele), onde banha os tecidos diretamente antes de retornar ao coração via sistema venoso.
                    </p>
                  </div>
                </div>

                {/* Celoma reduzido */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <img
                      src="/celoma.jpg"
                      alt="Celoma dos moluscos"
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Celoma reduzido</h3>
                    <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                      Às cavidades ao redor do coração, gônadas e rins. Diferente de outros protostômios, o celoma nos moluscos é bastante reduzido, sendo a hemocele o principal espaço corporal. O celoma persiste apenas como pericárdio e cavidades das gônadas e nefrídios.
                    </p>
                  </div>
                </div>

                {/* Desenvolvimento */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <img
                      src="/moluscos-larva.jpg"
                      alt="Desenvolvimento dos moluscos"
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Desenvolvimento</h3>
                    <p className={`text-lg leading-relaxed ${currentTheme.text}`}>
                      Com larva trocófora e, em muitos casos, véliger. A maioria dos moluscos marinhos apresenta desenvolvimento indireto, começando como larva trocófora (similar à dos anelídeos) que depois se transforma em véliger, uma larva especializada com pé, concha primitiva e véu larval para natação.
                    </p>
                  </div>
                </div>
              </div>

              <p className={`indent-12 mt-8 mb-6 text-lg leading-relaxed ${currentTheme.text}`}>
                Este plano básico sofreu diversas adaptações evolutivas. Os gastrópodes desenvolveram torção corporal, os bivalves perderam a cabeça e a rádula para se especializar em filtragem, enquanto os cefalópodes evoluíram sistemas nervosos complexos e circulação fechada. Apesar dessas variações, a estrutura fundamental mantém a homologia entre todos os moluscos.
              </p>

              <div className={`mt-8 p-4 rounded-lg text-sm ${currentTheme.highlight}`}>
                <h4 className="font-semibold mb-2">Referência:</h4>
                <p>Invertebrados — Richard C. Brusca, Wendy Moore, Stephen M. Shuster, Gary J. — 3ª edição, 2018 — Editora Guanabara Koogan Ltda, p. 576-598.</p>
              </div>
            </div>
          </section>
        );
      case 5:
        const feedback = getFeedbackConfig();
        return (
          <>
            {showConfetti && (
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={500}
              />
            )}

            <section className={`mb-16 p-8 rounded-lg ${currentTheme.border} border text-center ${currentTheme.cardBg}`}>
              <div className="prose max-w-none mx-auto">
                <div className="text-6xl mb-4">{feedback.emoji}</div>
                <h2 className={`text-3xl font-bold mb-6 ${feedback.cor}`}>{feedback.mensagem}</h2>

                <p className={`mb-8 text-lg leading-relaxed ${currentTheme.text}`}>
                  Você completou o módulo introdutório sobre moluscos. Agora você está preparado para explorar mais detalhes sobre cada grupo!
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/moluscos"
                    className={`px-8 py-3 rounded-lg font-medium text-lg ${currentTheme.buttonEnabled}`}
                  >
                    Ir para módulos
                  </Link>

                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`px-8 py-3 rounded-lg font-medium text-lg ${currentTheme.buttonEnabled}`}
                  >
                    Ler novamente
                  </button>
                </div>
              </div>
            </section>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} py-12 px-4 sm:px-8`}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className={`text-4xl font-bold mb-4 ${currentTheme.accent}`}>Introdução aos Moluscos</h1>
          <div className={`h-1 w-24 mx-auto ${currentTheme.divider}`}></div>

          {currentPage < totalPages && (
            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span className={currentTheme.text}>Progresso</span>
                <span className={currentTheme.text}>{currentPage}/{totalPages}</span>
              </div>
              <div className={`w-full h-2 rounded-full ${currentTheme.progress}`}>
                <div
                  className={`h-full rounded-full ${currentTheme.progressActive}`}
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </header>

        {renderPage()}

        {currentPage < totalPages && (
          <div className={`flex justify-between items-center mt-12 pt-8 border-t ${currentTheme.border}`}>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-8 py-3 rounded-lg font-medium text-lg ${currentPage === 1 ? currentTheme.buttonDisabled : currentTheme.buttonEnabled}`}
            >
              Anterior
            </button>

            <button
              onClick={handleNext}
              className={`px-8 py-3 rounded-lg font-medium text-lg ${currentTheme.buttonEnabled}`}
            >
              {currentPage === totalPages - 1 ? 'Finalizar' : 'Próximo'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}