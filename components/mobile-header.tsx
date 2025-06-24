import { MobileSideBar } from "./mobile-sidebar";
import { UserButton } from "@clerk/nextjs";

export const MobileHeader = () => {
    return (
        <nav className="px-4 h-[50px] flex items-center bg-green-500 border-b fixed top-0 w-full z-50">
            <MobileSideBar />
            <h1 className="text-white text-lg font-bold ml-4">BioOlhar</h1>
            <div className="ml-auto flex items-center gap-x-3">
                
                <span className="text-white text-sm">Bem-vindo</span>
                {/* Botão de usuário */}
                <UserButton afterSignOutUrl="/" />
            </div>
        </nav>
    );
};
