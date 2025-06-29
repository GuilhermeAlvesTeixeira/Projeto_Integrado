"use client"

import { ThemeProvider, useTheme } from '@/components/theme-context';
import { SideBar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { ClerkProvider } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

const LayoutContent = ({ children }: Props) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-white' 
        : theme === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-black'
    }`}>
      <MobileHeader />
      <SideBar className="hidden" />
      <main className="pt-28 pl-5">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

const MainLayout = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <ClerkProvider afterSignOutUrl="/">
        <LayoutContent>
          {children}
        </LayoutContent>
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default MainLayout;