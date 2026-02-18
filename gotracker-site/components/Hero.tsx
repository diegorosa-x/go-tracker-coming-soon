import React from "react";
import { MessageCircle, ShieldCheck, MapPin } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Hero: React.FC = () => {
  return (
    <section className="relative px-6 pt-16 pb-24 md:pt-32 md:pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">

        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8 text-center lg:text-left relative z-10"
        >
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B122E]/5 dark:bg-white/5 border border-[#0B122E]/10 dark:border-white/10 text-[#F48120] text-sm font-semibold uppercase tracking-widest"
          >
            <ShieldCheck className="w-4 h-4" />
            Lançamento em breve
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[2.25rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-navy dark:text-white font-montserrat tracking-tight"
          >
            O Controle Total <br className="hidden sm:block" />
            do Seu Veículo <br className="sm:hidden" />
            está{" "}
            <span className="text-[#F48120]">
              chegando.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light px-2 sm:px-0"
          >
            Estamos preparando uma nova experiência digital para você proteger
            seu patrimônio com tecnologia de ponta, IA e monitoramento em tempo
            real.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.a
              href="https://wa.me/5519995778009?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20planos%20de%20rastreamento%20da%20GoTracker.%20Vim%20pelo%20site%20e%20gostaria%20de%20um%20orçamento."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#F48120] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-900/20 transition-all flex items-center justify-center gap-3 group"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Falar com um Consultor
            </motion.a>

            <div className="flex items-center gap-3 px-6 py-4 text-slate-400 dark:text-white/40 justify-center">
              <MapPin className="w-5 h-5 text-[#F48120]" />
              <span>Hortolândia / SP</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual Element */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          className="
            relative order-first lg:order-last
            w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]
            sm:w-full sm:left-auto sm:right-auto sm:ml-0 sm:mr-0
          "
        >
          <motion.div
            {...floatingAnimation}
            animate="animate"
            className="relative z-10 bg-gradient-to-br from-white/10 to-transparent dark:from-white/10 dark:to-transparent p-0 sm:p-1 rounded-none sm:rounded-[2.5rem] backdrop-blur-sm border-y sm:border border-[#0B122E]/10 dark:border-white/10 shadow-2xl"
          >
            <div className="relative w-full aspect-video overflow-hidden rounded-none sm:rounded-[2.3rem]">
              <Image
                src="/assets/img/tracking.png"
                alt="Plataforma GoTracker"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Pulsing Dot */}
            <div className="absolute top-1/4 right-1/4">
              <span className="flex h-6 w-6 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F48120] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-[#F48120]"></span>
              </span>
            </div>
          </motion.div>

          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl hidden sm:block"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#F48120]/5 dark:bg-[#F48120]/10 rounded-full blur-3xl hidden sm:block"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
