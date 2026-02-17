import React from "react";
import { Layout, Monitor } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

interface HeaderProps {
  isScrolled: boolean;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, theme, toggleTheme }) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-[#0B122E]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-3" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="relative w-[120px] md:w-[200px] h-10 md:h-12 flex items-center">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-50 group cursor-pointer">
            <Image
              src="/assets/img/gotracker-logo.png"
              alt="Logo GoTracker"
              // No mobile fica com 140px, no desktop sobe para 180px
              width={180}
              height={60}
              className="object-contain drop-shadow-md w-[140px] md:w-[180px] h-auto"
              priority
            />
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          <a
            href="https://gotracker.seeflex.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full border-2 border-[#0B122E]/10 dark:border-white/20 text-[#0B122E] dark:text-white font-semibold hover:bg-[#0B122E]/5 dark:hover:bg-white/10 hover:border-[#0B122E]/20 dark:hover:border-white/40 transition-all text-xs md:text-base"
          >
            <Monitor className="w-4 h-4 hidden sm:block" />
            <span>
              💻 <span className="hidden sm:inline">Acessar</span> Sistema
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
