
import React from 'react';
import { Lock, ShieldAlert, Navigation } from 'lucide-react';

const features = [
  {
    icon: <Navigation className="w-8 h-8 text-[#F48120]" />,
    title: "Rastreamento em Tempo Real",
    description: "Visualize a localização exata do seu veículo a qualquer momento, de qualquer lugar, com precisão via GPS."
  },
  {
    icon: <Lock className="w-8 h-8 text-[#F48120]" />,
    title: "Bloqueio Remoto via App",
    description: "Segurança total na palma da mão. Em caso de emergência, bloqueie o motor instantaneamente pelo smartphone."
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-[#F48120]" />,
    title: "Assistência 24h",
    description: "Equipe de pronto atendimento sempre disponível para garantir suporte técnico e apoio em sinistros."
  }
];

const Features: React.FC = () => {
  return (
    <section className="px-6 py-24 bg-slate-100 dark:bg-white/[0.02] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B122E] dark:text-white font-montserrat transition-colors">Por que escolher a GoTracker?</h2>
          <p className="text-slate-500 dark:text-white/40 max-w-xl mx-auto transition-colors">Tecnologia avançada para quem não abre mão da segurança do seu patrimônio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-3xl bg-white dark:bg-[#0B122E] border border-slate-200 dark:border-white/5 hover:border-[#F48120]/30 transition-all duration-300 transform hover:-translate-y-2 shadow-sm dark:shadow-none"
            >
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 inline-block group-hover:bg-[#F48120]/10 transition-colors">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#0B122E] dark:text-white mb-4 font-montserrat transition-colors">{feat.title}</h3>
              <p className="text-slate-500 dark:text-white/50 leading-relaxed transition-colors">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
