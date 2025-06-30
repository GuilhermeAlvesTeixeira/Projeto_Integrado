"use client"
import { FiloSection } from "@/components/filo-section";
import { useTheme } from "@/components/theme-context";

const LearnPage = () => {
    const { theme } = useTheme();

    return (
        <div className="pb-10">
            <div className="px-5 sm:px-6">
                <h1 className={`text-3xl font-bold ${
                    theme === 'high-contrast' ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                    Learning Paths
                </h1>
                <h2 className={`text-lg pt-0.5 ${
                    theme === 'light' 
                        ? 'text-neutral-700' 
                        : theme === 'dark' 
                        ? 'text-gray-300' 
                        : 'text-gray-200'
                }`}>
                    Step-by-step paths to mastery
                </h2>
                
                <FiloSection
                    imgSrc="/esponja.png"
                    title="Poríferos"
                    description="Animais filtradores sem tecidos verdadeiros."
                    horizontalScroll={true} 
                    cards={[
                        {
                            title: "Introdução",
                            content: "Leitura", 
                            imageSrc: `${theme === "high-contrast" ? "/learn.svg" : "/learn.svg"}`, // mudar depois
                            imageAlt: "Ícone de aprendizado",
                            href: "/porifero-introducao",
                        },
                        {
                            title: "Anatomia",
                            content: "Prática com esquemáticos",
                            imageSrc: "/porifero-anatomia-1.png",
                            imageAlt: "Anatomia de porífero",
                            href: "/porifero-anatomia",
                        },
                        {
                            title: "Ciclo de Vida",
                            content: "Prática com esquemáticos",
                            imageSrc: "/ciclo-porifera.png",
                            imageAlt: "Ciclo de vida de porífero",
                            href: "/porifero-ciclo",
                        },
                        {
                            title: "Laboratório",
                            content: "Prática com imagens reais",
                            imageSrc: `${theme === "high-contrast" ? "/default_logo_contrast.png" : "/default_logo.png"}`, // mudar a logo depois
                            imageAlt: "Laboratório virtual",
                            href: "/porifero-lab",
                        },
                    ]}
                />

                <FiloSection
                    imgSrc="/jellyfish.svg"
                    title="Cnidários"
                    description="Animais com cnidócitos e simetria radial."
                    cards={[
                        {
                            title: "Introdução",
                            content: "Leitura",
                            imageSrc: "/learn.svg",
                            imageAlt: "Ícone de aprendizado",
                            href: "/cnidario-introducao",
                        },
                        {
                            title: "Anatomia",
                            content: "Prática com esquemáticos",
                            imageSrc: "/cnidario-anatomia-1.png",
                            imageAlt: "Anatomia de cnidário",
                            href: "/cnidario-anatomia",
                        },
                        {
                            title: "Ciclo de Vida",
                            content: "Soluções criativas",
                            imageSrc: "/cnidario-ciclo.png",
                            imageAlt: "Ciclo de vida de cnidário",
                            href: "/cnidario-ciclo",
                        },
                        {
                            title: "Laboratório",
                            content: "Soluções criativas",
                            imageSrc: "/default_logo.png",
                            imageAlt: "Laboratório virtual",
                            href: "/cnidario-lab",
                        },
                    ]}
                />

                <FiloSection
                    imgSrc="/planaria.png"
                    title="Platelmintos"
                    description="Vermes achatados com simetria bilateral."
                    cards={[
                        {
                            title: "Introdução",
                            content: "Leitura",
                            imageSrc: "/learn.svg",
                            imageAlt: "Ícone de aprendizado",
                            href: "/platelminto-introducao",
                        },
                        {
                            title: "Anatomia",
                            content: "Prática com esquemáticos",
                            imageSrc: "/platelminto-anatomia.png",
                            imageAlt: "Anatomia de platelminto",
                            href: "/platelminto-anatomia",
                        },
                        {
                            title: "Ciclo de Vida",
                            content: "Soluções criativas",
                            imageSrc: "/ciclo-platelminto.png",
                            imageAlt: "Ciclo de vida de platelminto",
                            href: "/platelminto-ciclo",
                        },
                        {
                            title: "Laboratório",
                            content: "Soluções criativas",
                            imageSrc: "/default_logo.png",
                            imageAlt: "Laboratório virtual",
                            href: "/platelminto-lab",
                        },
                    ]}
                />

                <FiloSection
                    imgSrc="/nemertea.png"
                    title="Nemerteas"
                    description="Vermes proboscídeos com sistema circulatório."
                    cards={[
                        {
                            title: "Introdução",
                            content: "Leitura",
                            imageSrc: "/learn.svg",
                            imageAlt: "Ícone de aprendizado",
                            href: "/nemertea-introducao",
                        },
                        {
                            title: "Anatomia",
                            content: "Prática com esquemáticos",
                            imageSrc: "/nemertea-anatomia.png",
                            imageAlt: "Anatomia de nemertea",
                            href: "/nemertea-anatomia",
                        },
                        {
                            title: "Ciclo de Vida",
                            content: "Soluções criativas",
                            imageSrc: "/ciclo-nemertea.png",
                            imageAlt: "Ciclo de vida de nemertea",
                            href: "/nemertea-ciclo",
                        },
                        {
                            title: "Laboratório",
                            content: "Soluções criativas",
                            imageSrc: "/default_logo.png",
                            imageAlt: "Laboratório virtual",
                            href: "/nemertea-lab",
                        },
                    ]}
                />

                <FiloSection
                    imgSrc="/polvo.png"
                    title="Moluscos"
                    description="Animais de corpo mole com concha (ou não)."
                    cards={[
                        {
                            title: "Introdução",
                            content: "Leitura",
                            imageSrc: "/learn.svg",
                            imageAlt: "Ícone de aprendizado",
                            href: "/molusco-introducao",
                        },
                        {
                            title: "Anatomia",
                            content: "Prática com esquemáticos",
                            imageSrc: "/molusco-anatomia.png",
                            imageAlt: "Anatomia de molusco",
                            href: "/molusco-anatomia",
                        },
                        {
                            title: "Ciclo de Vida",
                            content: "Soluções criativas",
                            imageSrc: "/ciclo-molusco.png",
                            imageAlt: "Ciclo de vida de molusco",
                            href: "/molusco-ciclo",
                        },
                        {
                            title: "Laboratório",
                            content: "Soluções criativas",
                            imageSrc: "/default_logo.png",
                            imageAlt: "Laboratório virtual",
                            href: "/molusco-lab",
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default LearnPage;