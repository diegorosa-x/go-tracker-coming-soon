"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Assistant from "@/components/Assistant";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sincroniza o tema com a classe no elemento HTML
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B122E] transition-colors duration-300">
      <Header isScrolled={isScrolled} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
      <Assistant />
    </div>
  );
}
