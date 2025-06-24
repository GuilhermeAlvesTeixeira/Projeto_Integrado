import { SideBar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { ClerkProvider } from "@clerk/nextjs";

type Props = {
    children: React.ReactNode;
};


const MainLayout = ({ children, }: Props) => {
    return (

        <div className="">
            <ClerkProvider afterSignOutUrl="/">
                <>
                    <MobileHeader />
                    <SideBar className="hidden" />
                    <main className="pt-28 pl-5">
                        <div className="max-w-[1056px] mx-auto pt-6 h-full">
                            {children}
                        </div>
                    </main>
                </>

            </ClerkProvider>
        </div>
    );
};

export default MainLayout;