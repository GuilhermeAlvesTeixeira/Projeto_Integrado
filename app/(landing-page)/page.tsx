import {Button} from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
  <div className="relative w-[220px] h-[147px] lg:w-[440px] lg:h-[294px] mb-8 lg:mb-0">
    <Image src="/hopper.png" fill alt="Plankton"/>
  </div>
  
  <div className="flex flex-col items-center gap-y-8 max-w-[400px] w-full">
    <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 text-center"> 
      Aprenda, visualize e exercite com InverteLab
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
            <Button size="lg" variant="secondary" className="w-full"> 
              Comece a Usar
            </Button>
          </SignUpButton>

          <SignInButton
            mode="modal"
            forceRedirectUrl="/learn"
          >
            <Button size="lg" variant="primaryOutline" className="w-full"> 
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
