import Image from "next/image";

type Props = {
    title: string,
    description: string,
    imgSrc: string,
};

export const FiloSection = ({imgSrc, title, description}:Props) => {
    return(

        <div className="mb-5 mt-5 p-5 flex item-center bg-amber-100">
            
            <Image
                src = {imgSrc}
                alt = {title}
                className = "mr-5 mt-5"
                height = {100}
                width = {100} 
            />

            <div className="pr-3 mt-2.5 flex flex-col lg:flex-row md:flex-row:items-center">
                
                <h1 className="lg:pt-11 pt-3 text-2xl font-bold ">
                    {title}
                </h1>

                <p className="text-neutral-700 lg:pl-8 lg:mt-11.5 md:mt-0 text-lg">
                    {description}
                </p>
            </div>  
        </div>
    );
};

