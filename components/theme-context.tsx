"use client"


/*
    Adicionar ao README:

    funções

    - criação de context API para compartilhar o tema com toda a aplicação

        (ADICIONAR REFERÊNCIAS DEPOIS)
        -> React Context API : https://www.youtube.com/watch?v=znTVc2jDw3k
        -> https://uxdesign.cc/high-contrast-when-you-think-the-dark-mode-is-enough-d190218d4bba 

    - salvar a escolha do usuário no localStorage - "https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage"
  
    - aplicar as classes CSS:
        1) light
        2) dark
        3) hight-contrast 
    no <html> para estilização (permite tailwindcss tbm)

    --------------------------------------------------------------------------------

    hook useState -> armazenar o tema atual
    hook useEffect -> executar o código assim que o componente for montado
    localStorage -> armazena os dados entre visitas ao site
    document.document.classList -> altera <html> para o tailwind usar os estilos
    
*/


import {createContext, useContext, useState, useEffect, ReactNode} from 'react'

type Theme = "light" | "dark" | "high-contrast";

type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider ({children}: {children: ReactNode}){
    const [theme, setTheme] = useState<Theme>("light");

useEffect(() => {
    // Verificar tema salvo no localStorage ou preferência do sistema
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme == 'dark')
    document.documentElement.classList.toggle('high-contrast', initialTheme == 'high-contrast')
  }, [])


    const toggleTheme = () => {
        const newTheme = theme == 'light' ? 'dark' : theme == 'dark' ? 'high-contrast' : 'light';
        setTheme(newTheme);
        localStorage.setItem("theme" , newTheme)

        document.documentElement.classList.remove("light", "dark", "high-contrast") // remove tema anterior
        document.documentElement.classList.add(newTheme) //insere novo tema
        
    };

  const contextValue = {
    theme,
    toggleTheme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme)
      document.documentElement.classList.remove('light', 'dark', 'high-contrast')
      document.documentElement.classList.add(newTheme)
    }
  }

      return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
};

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context == undefined) {
        throw new Error('useTheme precisa ser usada dentro de ThemeProvider')
      }
    return context;
}
