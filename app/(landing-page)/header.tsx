import { ClerkLoaded, ClerkLoading, SignIn, SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Header = () => {
    return (

        <header className="absolute w-full h-20 left-0 top-0 border-b border-b-[#3BBD57] px-4" style={{
            borderTop: '1px solid #3BBD57',
            background: 'linear-gradient(295.36deg, rgba(0, 217, 0, 0) -262.38%, rgba(0, 68, 0, 0.15) 195.96%)'
          }}>
            <div className = "lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className = "pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    
                    <div className = "pt-8 pb-9 flex items-center gap-x-3">
                        <Image src = "/default_logo.png" height = {25} width = {25} alt="logo"/>
                    </div>
                    
                    <h1 className = "text-2xl font-extrabold text-black tracking-wide">
                        BiOlhar
                    </h1>
                </div>
               
                <div>
                 <ClerkLoading>
                        <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                 </ClerkLoading>

                 <ClerkLoaded>
                    <SignedIn>
                        <UserButton 

                            afterSwitchSessionUrl="/"
                            userProfileMode="modal"
                            showName={false}                           
                        />
                    </SignedIn>

                    <SignedOut>
                        
                        <SignInButton
                            mode = "modal"
                            fallbackRedirectUrl= "/homepage"
                            signUpFallbackRedirectUrl="/homepage"
                        >
                            <Button variant = "start" size = "rounded">
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                 </ClerkLoaded>
                </div>
            </div>
        </header>
    );
};