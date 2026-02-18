import React from "react";
import { Lock, ShieldAlert, Navigation } from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = [
  {
    icon: <Navigation className="w-8 h-8 text-[#F48120]" />,
    title: "Rastreamento em Tempo Real",
    description:
      "Visualize a localização exata do seu veículo a qualquer momento, de qualquer lugar, com precisão via GPS.",
  },
  {
    icon: <Lock className="w-8 h-8 text-[#F48120]" />,
    title: "Bloqueio Remoto via App",
    description:
      "Segurança total na palma da mão. Em caso de emergência, bloqueie o motor instantaneamente pelo smartphone.",
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-[#F48120]" />,
    title: "Assistência 24h",
    description:
      "Equipe de pronto atendimento sempre disponível para garantir suporte técnico e apoio em sinistros.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Features: React.FC = () => {
  return (
    <section className="px-6 py-24 bg-slate-100 dark:bg-white/[0.02] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16 space-y-4"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-[#0B122E] dark:text-white font-montserrat"
          >
            Por que escolher a GoTracker?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-slate-500 dark:text-white/40 max-w-xl mx-auto"
          >
            Tecnologia avançada para quem não abre mão da segurança do seu patrimônio.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group p-8 rounded-3xl bg-white dark:bg-[#0B122E] border border-slate-200 dark:border-white/5 hover:border-[#F48120]/30 transition-all duration-300 shadow-sm dark:shadow-none"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 inline-block group-hover:bg-[#F48120]/10 transition-colors"
              >
                {feat.icon}
              </motion.div>

              <h3 className="text-2xl font-bold text-[#0B122E] dark:text-white mb-4 font-montserrat">
                {feat.title}
              </h3>

              <p className="text-slate-500 dark:text-white/50 leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
