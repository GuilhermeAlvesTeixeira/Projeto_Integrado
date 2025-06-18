import {Button} from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-green-500 mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2 bg-[linear-gradient(270deg,#F3FFFD_0%,#F5FFE8_49.8%,#F3FFFD_100%)]">
  <div className="relative w-[308px] h-[251px] lg:w-[508px] lg:h-[411px] mb-0 lg:mb-0">
    <Image src="/ameba.png" fill alt="Plankton"/>
  </div>
  
  <div className="flex flex-col items-center gap-y-8 max-w-[400px] w-full">
    <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 text-center"> 
      Aprenda, visualize e exercite com <span className="text-green-600">Biolhar</span>
    </h1>
 
    <div className="w-full flex flex-col gap-y-3 max-w-[380px]">
      <ClerkLoading>
        <Loader className="h-5 w-95 text-muted-foreground animate-spin"/>
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

    
  )
}
