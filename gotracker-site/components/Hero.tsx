import React from "react";
import { MessageCircle, ShieldCheck, MapPin } from "lucide-react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className="relative px-6 pt-16 pb-24 md:pt-32 md:pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">
        {/* Text Content */}
        <div className="space-y-8 text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B122E]/5 dark:bg-white/5 border border-[#0B122E]/10 dark:border-white/10 text-[#F48120] text-sm font-semibold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            Lançamento em breve
          </div>

          <h1 className="text-2xl md:text-7xl lg:text-7xl font-extrabold leading-tight text-[#0B122E] dark:text-white font-montserrat transition-colors duration-300">
            O Controle Total<br className="hidden md:block pr-2" />
            <span className="pl-2">do</span> Seu Veículo está 
            <span className="text-transparent pl-2 md:pl-5 bg-clip-text bg-gradient-to-r from-[#F48120] to-orange-400">
               chegando.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-white/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light transition-colors duration-300">
            Estamos preparando uma nova experiência digital para você proteger
            seu patrimônio com tecnologia de ponta, inteligência artificial e
            monitoramento em tempo real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="https://wa.me/5519995778009?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20planos%20de%20rastreamento%20da%20GoTracker.%20Vim%20pelo%20site%20e%20gostaria%20de%20um%20orçamento."
              target="_blank"
              className="bg-[#F48120] hover:bg-[#d96e1a] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-900/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Falar com um Consultor
            </a>

            <div className="flex items-center gap-3 px-6 py-4 text-slate-400 dark:text-white/40 justify-center transition-colors">
              <MapPin className="w-5 h-5 text-[#F48120]" />
              <span>Hortolândia / SP</span>
            </div>
          </div>
        </div>

        {/* Visual Element (Mockup/Graphic) */}
        <div className="relative order-first lg:order-last">
          <div className="relative z-10 bg-gradient-to-br from-white/10 to-transparent dark:from-white/10 dark:to-transparent p-1 rounded-[2.5rem] backdrop-blur-sm border border-[#0B122E]/10 dark:border-white/10 shadow-2xl">
            <Image
              src="/assets/img/tracking-image.png"
              alt="Plataforma GoTracker"
              width={800} // Defina a largura base
              height={450} // Defina a altura base para manter o aspect-ratio
              priority // Adicione isso porque a imagem está no topo (Hero)
              className="rounded-[2.3rem] w-full object-cover aspect-video lg:aspect-auto"
            />
            {/* Pulsing Dot Effect */}
            <div className="absolute top-1/4 right-1/4">
              <span className="flex h-6 w-6 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F48120] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-[#F48120]"></span>
              </span>
            </div>
          </div>
          {/* Background shapes behind image */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#F48120]/5 dark:bg-[#F48120]/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
