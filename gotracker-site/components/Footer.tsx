import React from "react";
import { Instagram, Facebook, Linkedin, MapPin } from "lucide-react";
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
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="px-6 py-12 border-t border-slate-200 dark:border-white/5 relative bg-white dark:bg-[#0B122E] z-10 transition-colors duration-300"
    >
      <motion.div
        variants={containerVariants}
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8"
      >
        {/* Logo + Localização */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center md:items-start gap-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-[120px] md:w-[200px] h-10 md:h-12 flex items-center cursor-pointer"
          >
            <Image
              src="/assets/img/gotracker-logo.png"
              alt="Logo GoTracker"
              width={180}
              height={60}
              className="object-contain drop-shadow-md w-[140px] md:w-[180px] h-auto"
              priority
            />
          </motion.div>

          <p className="text-slate-500 dark:text-white/40 text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F48120]" />
            Empresa de Hortolândia-SP
          </p>
        </motion.div>

        {/* Redes Sociais */}
        <motion.div
          variants={fadeUp}
          className="flex gap-6"
        >
          {[Instagram, Facebook, Linkedin].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ y: -6, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-3 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-[#F48120]/20 text-slate-400 dark:text-white/60 hover:text-[#F48120] transition-colors shadow-sm"
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={fadeUp}
          className="text-slate-400 dark:text-white/30 text-sm text-center md:text-right"
        >
          <p>© {currentYear} GoTracker - Todos os direitos reservados.</p>
          <p className="mt-1">
            Tecnologia de rastreamento veicular de ponta.
          </p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
