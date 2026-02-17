
import React from 'react';
import { Instagram, Facebook, Linkedin, MapPin } from 'lucide-react';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 border-t border-slate-200 dark:border-white/5 relative bg-white dark:bg-[#0B122E] z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-2">
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
          <p className="text-slate-500 dark:text-white/40 text-sm flex items-center gap-2 transition-colors">
            <MapPin className="w-4 h-4 text-[#F48120]" />
            Empresa de Hortolândia-SP
          </p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="p-3 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-[#F48120]/20 text-slate-400 dark:text-white/60 hover:text-[#F48120] transition-all">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="p-3 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-[#F48120]/20 text-slate-400 dark:text-white/60 hover:text-[#F48120] transition-all">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="p-3 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-[#F48120]/20 text-slate-400 dark:text-white/60 hover:text-[#F48120] transition-all">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>

        <div className="text-slate-400 dark:text-white/30 text-sm text-center md:text-right transition-colors">
          <p>© {currentYear} GoTracker - Todos os direitos reservados.</p>
          <p className="mt-1">Tecnologia de rastreamento veicular de ponta.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
