"use client";

import { useEffect, useState } from "react";
import { BookOpen, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import PhoneMockup from "@/components/ui/PhoneMockup";
import Link from "next/link";
import { fetchBooks, type ApiBook } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function HeroSection() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchBooks({ limit: 8 }).then((res) => setBooks(res.books));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 pattern-african" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />
      <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-primary-400/30 animate-float" />
      <div className="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-accent-400/30 animate-float-slow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-6 border border-white/10">
                <Sparkles className="w-4 h-4" />
                La 1re plateforme de livres numeriques au Cameroun
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Lisez, Publiez,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-400">
                Inspirez
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/70 max-w-lg mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Decouvrez des milliers de livres d&apos;auteurs camerounais et africains.
              Payez avec Mobile Money, lisez partout, meme hors-ligne.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href={user ? "/catalogue" : "/connexion"}>
                <Button size="lg" className="glow-primary">
                  <BookOpen className="w-5 h-5" />
                  {user ? "Explorer le catalogue" : "Commencer a lire"}
                </Button>
              </Link>
              <Link href="#telecharger">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  <Download className="w-5 h-5" />
                  Telecharger l&apos;app
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex -space-x-2">
                {["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-surface-dark flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {["S", "J", "A", "P"][i]}
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/60">
                <span className="text-white font-semibold">500+</span> lecteurs nous font confiance
              </div>
            </motion.div>
          </div>

          {/* Right - Phone mockup */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="animate-float">
              <PhoneMockup books={books} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
