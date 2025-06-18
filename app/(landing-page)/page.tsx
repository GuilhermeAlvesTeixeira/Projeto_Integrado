import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

    <div className="flex flex-col w-full min-h-screen">
      <div className="mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-8 lg:p-15 lg:mt-20 mt-15 gap-8 bg-[linear-gradient(270deg,#F3FFFD_0%,#F5FFE8_49.8%,#F3FFFD_100%)]">

        <div className="relative w-[308px] h-[251px] lg:w-[508px] lg:h-[411px] mb-0 lg:mb-0">
          <Image src="/ameba.png" sizes="(max-width: 768px) 100vw, 50vw"
            className="w-auto h-auto max-w-full" fill alt="Ameba" />
        </div>

        <div className="flex flex-col items-center gap-y-8 max-w-[400px] w-full">
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 text-center">
            Aprenda, visualize e exercite com <span className="text-green-600">Biolhar</span>
          </h1>

          <div className="w-full flex flex-col gap-y-3 max-w-[380px]">
            <ClerkLoading>
              <Loader className="h-5 w-95 text-muted-foreground animate-spin" />
            </ClerkLoading>

            <ClerkLoaded>
              <SignedOut>
                <SignUpButton
                  mode="modal"
                  fallbackRedirectUrl="/learn"
                  signInFallbackRedirectUrl="/learn"
                >
                  <Button size="bordaFina" variant="secondary" className="w-full">
                    Comece já a explorar os filos
                  </Button>
                </SignUpButton>

                <SignInButton
                  mode="modal"
                  forceRedirectUrl="/learn"
                >
                  <Button size="lg" variant="alreadyAccount" className="w-full">
                    Eu já tenho uma conta
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Button size="lg" variant="secondary" className="w-full" asChild>
                  <Link href="/learn">
                    Continue a aprender
                  </Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </div>

      <div className="hidden lg:block h-15 w-full p-2" style={{
        borderTop: '1px solid #3BBD57',
        background: 'linear-gradient(295.36deg, rgba(0, 217, 0, 0) -262.38%, rgba(0, 68, 0, 0.15) 195.96%)'
      }}>

        <div className="pl-10 max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
          <Button size="lg" variant="ghost" >
            <Image
              src="/esponja.png"
              alt="esponja"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            <span className="-translate-x-2">Poríferos</span>
          </Button>

          <Button size="lg" variant="ghost">
            <Image
              src="/jellyfish.svg"
              alt="jellyfish"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            <span className="-translate-x-2">Cnidários</span>
          </Button>

          <Button size="lg" variant="ghost">
            <Image
              src="/planaria.png"
              alt="planaria"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            <span className="-translate-x-2">Platelmintos</span>
          </Button>

          <Button size="lg" variant="ghost" >
            <Image
              src="/nemertea.png"
              alt="nemertea"
              height={30}
              width={38}
              className="mr-4 rounded-md"
            />
            <span className="-translate-x-2">Nemerteas</span>
          </Button>

          <Button size="lg" variant="ghost" >
            <Image
              src="/polvo.png"
              alt="polvo"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            <span className="-translate-x-2 text">Moluscos</span>
          </Button>
        </div>
      </div>

{/* Nova seção responsiva */}
<div className="w-full flex bg-[linear-gradient(185.82deg,#3BBD57_4.63%,#1B5728_314.98%)]">
  {/* Container com alinhamento responsivo */}
  <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row h-full px-4 lg:px-20">
    
    {/* Seção da imagem - Móvel (acima) e Desktop (direita) */}
    <div className="lg:order-2 relative w-full h-[40vh] min-h-[300px] lg:h-[70vh] lg:min-h-[500px] lg:flex-1 flex items-center justify-center">
      <Image
        src="/filos.png"
        fill
        alt="Filos"
        className="object-contain mx-auto"
        sizes="(max-width: 900px) 100vw, 50vw"
        priority
      />
    </div>

    {/* Seção de texto - Móvel (abaixo) e Desktop (esquerda) */}
    <div className="lg:order-1 lg:flex-1 flex flex-col justify-center items-center lg:items-start py-8 lg:py-24 text-white lg:mr-10 xl:mr-20">
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 text-center lg:text-left">
        Mais de <span className="text-green-200">10 filos</span> para você visualizar e interagir!
      </h1>
      <p className="text-center lg:text-left mb-8 max-w-[600px]">
        Explore o fascinante mundo dos invertebrados de uma forma totalmente nova e interativa! Nosso serviço oferece imagens esquemáticas detalhadas de diversos grupos, permitindo que você visualize a complexidade das estruturas de cada organismo.
      </p>
      <Button className="bg-white text-green-600 hover:bg-gray-100 px-8">
        Comece agora
      </Button>
    </div>
  </div>
</div>
        
      </div>



  )
}
