
import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-[#0B122E] dark:text-white hover:bg-slate-300 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center group"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
      ) : (
        <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
