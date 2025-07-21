// (main)/intro/layout.tsx
"use client"

import { ThemeProvider, useTheme } from '@/components/theme-context';
import { ClerkProvider } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

const IntroLayoutContent = ({ children }: Props) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-white'
        : theme === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-black'
    }`}>
      <main className=" px-5">
        <div className="max-w-[1200px] mx-auto pt-4 h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

const IntroLayout = ({ children }: Props) => {
  return (

      <ClerkProvider afterSignOutUrl="/">
        <IntroLayoutContent>
          {children}
        </IntroLayoutContent>
      </ClerkProvider>

  );
};

export default IntroLayout;