"use client";

import styles from "./introducao.module.css";
import Link from "next/link";
import { useTheme } from "@/components/theme-context";

export default function introducao() {
  const { theme } = useTheme();

  const themeStyles = {
    light: {
      buttonEnabled: "bg-blue-500 text-white hover:bg-blue-600",
      buttonDisabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    dark: {
      buttonEnabled: "bg-blue-600 text-white hover:bg-blue-700",
      buttonDisabled: "bg-gray-700 text-gray-400 cursor-not-allowed",
    },
    "high-contrast": {
      buttonEnabled: "bg-yellow-500 text-black hover:bg-yellow-400",
      buttonDisabled: "bg-gray-700 text-gray-300 cursor-not-allowed",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <>
     
      <main className={styles.container} style={{ marginTop: 50 }}>
        {/* Seção Introdução */}
        <div className={styles.introBox}>
          <h1 className={styles.introTitle}>Introdução</h1>
        </div>

        {/* Seção 1 */}
        <div className={styles.compartiment}>
          <h2 className={styles.title}>Título da Seção 1</h2>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at quam id turpis porttitor volutpat.
            Cras nec velit at quam hendrerit bibendum. Integer ac arcu sit amet est dignissim iaculis nec sed nulla.
            Donec commodo lectus a libero convallis, nec pulvinar orci porta. Aliquam erat volutpat. Fusce vel sapien
            sit amet justo ornare cursus.
          </p>
          <img src="/img render rap 2.png" alt="Imagem Horizontal" className={styles.imageHorizontal} />
        </div>

        {/* Seção 2 */}
        <div className={styles.compartiment}>
          <img src="/img render rap.png" alt="Imagem Vertical" className={styles.imageVertical} />
          <div className={styles.textRight}>
            <h2 className={styles.title}>Título da Seção 2</h2>
            <p className={styles.text}>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              Aenean commodo urna vitae velit finibus, eget vestibulum augue semper. Nunc quis lectus sit amet
              nisl luctus bibendum. Vivamus dignissim tellus non velit malesuada, a interdum nunc sollicitudin.
            </p>
          </div>
        </div>

        {/* Botões de navegação */}
        <div className={styles.navigationButtons}>
          <button
            disabled
            className={`px-6 py-3 rounded-md transition-colors ${currentTheme.buttonDisabled}`}
          >
            Anterior
          </button>

          <Link
            href="/introducao/pagina-2"
            className={`px-6 py-3 rounded-md transition-colors ${currentTheme.buttonEnabled}`}
          >
            Próximo
          </Link>
        </div>
      </main>
    </>
  );
}