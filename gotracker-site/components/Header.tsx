import React from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

interface HeaderProps {
  isScrolled: boolean;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isScrolled,
  theme,
  toggleTheme,
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-[#0B122E]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-[120px] md:w-[200px] h-10 md:h-12 flex items-center cursor-pointer"
        >
          <Image
            src="/assets/img/gotracker-logo.png"
            alt="Logo GoTracker"
            width={100}
            height={100}
            className="object-contain drop-shadow-md w-[200px] md:w-[180px] h-auto"
            priority
          />
        </motion.div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          <motion.a
            href="https://gotracker.seeflex.com.br"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="flex items-center mt-2 gap-1.5 xs:gap-2 px-3 xs:px-4 md:px-5 py-2 md:py-2.5 rounded-full border-2 border-brand-navy/10 dark:border-white/20 text-brand-navy dark:text-white font-bold hover:bg-brand-navy/5 dark:hover:bg-white/10 hover:border-brand-navy/20 dark:hover:border-white/40 transition-all text-[10px] xs:text-xs md:text-sm whitespace-nowrap flex-shrink-0 shadow-sm"
          >
            <span>💻</span>
            <span>Área do cliente</span>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
