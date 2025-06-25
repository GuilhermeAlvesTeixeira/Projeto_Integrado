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
                    title="Porífero"
                    description="Explore os seres mais simples do reino animal que filtram água para viver."
                    cards={[
                        {
                            title: "Introdução",
                            content: "",
                            imageSrc: "/learn.svg",
                            imageAlt: "Equipe de design trabalhando",
                        },
                        {
                            title: "Anatomia",
                            content: "Soluções criativas",
                            imageSrc: "/porifero-anatomia-1.png",
                            imageAlt: "Equipe de design trabalhando",
                        },

                        {
                            title: "Ciclo de Vida",
                            content: "Soluções criativas",
                            imageSrc: "/ciclo-porifera.png",
                            imageAlt: "Equipe de design trabalhando",
                        },

                        {
                            title: "Laboratório",
                            content: "Soluções criativas",
                            imageSrc: "/default_logo.png",
                            imageAlt: "Equipe de design trabalhando",
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