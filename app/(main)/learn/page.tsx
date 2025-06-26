import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { FiloSection } from "@/components/filo-section";

const LearnPage = () => {
    return (
        <div className="">
            <div>
                <h1 className="text-3xl font-bold text"> Learning Paths</h1>
                <h2 className="text-lg pt-0.5 text-neutral-700"> Step-by-step paths to mastery</h2>
                <FiloSection
                    imgSrc={"/esponja.png"}
                    title="Poríferos"
                    description="Explore os seres mais simples do reino animal que filtram água para viver."
                    cards={[
                        {
                            title: "Introdução",
                            content: "Leitura",
                            imageSrc: "/learn.svg",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-introducao",
                        },
                        {
                            title: "Anatomia",
                            content: "Prática com esquemáticos",
                            imageSrc: "/porifero-anatomia-1.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-anatomia",
                        },

                        {
                            title: "Ciclo de Vida",
                            content: "Prática com esquemáticos",
                            imageSrc: "/ciclo-porifera.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-ciclo",
                        },

                        {
                            title: "Laboratório",
                            content: "Prática com imagens reais",
                            imageSrc: "/default_logo.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-lab",
                        },

                    ]}
                />

                <FiloSection
                    imgSrc={"/jellyfish.svg"}
                    title="Cnidários"
                    description="Descubra os animais aquáticos com tentáculos e defesa eletrizante."
                    cards={[
                        {
                            title: "Introdução",
                            content: "Leitura",
                            imageSrc: "/learn.svg",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-introducao",
                        },
                        {
                            title: "Anatomia",
                            content: "Prática com esquemáticos",
                            imageSrc: "/cnidario-anatomia-1.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-anatomia",
                        },

                        {
                            title: "Ciclo de Vida",
                            content: "Soluções criativas",
                            imageSrc: "/ciclo-porifera.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-ciclo",
                        },

                        {
                            title: "Laboratório",
                            content: "Soluções criativas",
                            imageSrc: "/default_logo.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-lab",
                        },

                    ]}
                />

<FiloSection
                    imgSrc={"/planaria.png"}
                    title="Platelmintos"
                    description="Descubra os animais aquáticos com tentáculos e defesa eletrizante."
                    cards={[
                        {
                            title: "Introdução",
                            content: "Leitura",
                            imageSrc: "/learn.svg",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-introducao",
                        },
                        {
                            title: "Anatomia",
                            content: "Prática com esquemáticos",
                            imageSrc: "/cnidario-anatomia-1.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-anatomia",
                        },

                        {
                            title: "Ciclo de Vida",
                            content: "Soluções criativas",
                            imageSrc: "/ciclo-porifera.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-ciclo",
                        },

                        {
                            title: "Laboratório",
                            content: "Soluções criativas",
                            imageSrc: "/default_logo.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-lab",
                        },

                    ]}
                />

<FiloSection
                    imgSrc={"/nemertea.png"}
                    title="Nemerteas"
                    description="Descubra os animais aquáticos com tentáculos e defesa eletrizante."
                    cards={[
                        {
                            title: "Introdução",
                            content: "Leitura",
                            imageSrc: "/learn.svg",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-introducao",
                        },
                        {
                            title: "Anatomia",
                            content: "Prática com esquemáticos",
                            imageSrc: "/cnidario-anatomia-1.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-anatomia",
                        },

                        {
                            title: "Ciclo de Vida",
                            content: "Soluções criativas",
                            imageSrc: "/ciclo-porifera.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-ciclo",
                        },

                        {
                            title: "Laboratório",
                            content: "Soluções criativas",
                            imageSrc: "/default_logo.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-lab",
                        },

                    ]}
                />

<FiloSection
                    imgSrc={"/polvo.png"}
                    title="Moluscos"
                    description="Descubra os animais aquáticos com tentáculos e defesa eletrizante."
                    cards={[
                        {
                            title: "Introdução",
                            content: "Leitura",
                            imageSrc: "/learn.svg",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-introducao",
                        },
                        {
                            title: "Anatomia",
                            content: "Prática com esquemáticos",
                            imageSrc: "/cnidario-anatomia-1.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-anatomia",
                        },

                        {
                            title: "Ciclo de Vida",
                            content: "Soluções criativas",
                            imageSrc: "/ciclo-porifera.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-ciclo",
                        },

                        {
                            title: "Laboratório",
                            content: "Soluções criativas",
                            imageSrc: "/default_logo.png",
                            imageAlt: "Equipe de design trabalhando",
                            href: "/porifero-lab",
                        },

                    ]}
                />

            </div>
        </div>
    );
}

export default LearnPage;


/*
                <StickyWrapper>
                <UserProgress
                    activeCourse = {{ title: "Mollusca", imageSrc: "/polvo.png"}}
                    hearts = {5}
                />
            </StickyWrapper>



            <FeedWrapper>
                <Header title="Filo Mollusca" />
            </FeedWrapper>
*/