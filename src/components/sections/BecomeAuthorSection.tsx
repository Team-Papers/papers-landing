"use client";

import { ArrowRight, BadgePercent, BarChart3, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

const perks = [
  { icon: BadgePercent, text: "70% des revenus pour vous" },
  { icon: BarChart3, text: "Statistiques detaillees en temps reel" },
  { icon: Users, text: "Acces a des milliers de lecteurs" },
];

function DonutChart() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * 0.3;

  return (
    <div className="relative flex items-center justify-center">
      <svg ref={ref} width="220" height="220" viewBox="0 0 200 200" className="-rotate-90">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(0,180,216,0.15)" strokeWidth="20" />
        <motion.circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke="url(#donutGradient)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#48CAE4" />
            <stop offset="100%" stopColor="#F5A623" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-5xl font-display font-extrabold text-white">70%</div>
        <div className="text-sm text-primary-200 font-medium">pour vous</div>
      </div>
    </div>
  );
}

export default function BecomeAuthorSection() {
  return (
    <section className="py-24 bg-primary-900 relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 pattern-african opacity-50" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <span className="inline-block text-primary-200 text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/20 px-3 py-1 rounded-full">
              Pour les auteurs
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
              Publiez et gagnez{" "}
              <span className="text-accent-400">
                70% des revenus
              </span>
            </h2>
            <p className="text-primary-100/80 mb-8 text-lg leading-relaxed">
              Rejoignez la communaute d&apos;auteurs Papers et faites decouvrir vos
              livres a des milliers de lecteurs au Cameroun et partout en Afrique.
            </p>
            <ul className="space-y-4 mb-10">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center border border-primary/40">
                    <Icon className="w-5 h-5 text-primary-200" />
                  </div>
                  <span className="font-medium text-white">{text}</span>
                </li>
              ))}
            </ul>
            <a href="https://author.papers237.duckdns.org/register">
              <Button size="lg" className="bg-accent hover:bg-accent-700 text-white shadow-lg shadow-accent/20">
                Devenir auteur
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </FadeIn>

          <FadeIn direction="right">
            <div className="flex flex-col items-center">
              <DonutChart />
              <div className="mt-8 text-center max-w-xs">
                <p className="text-primary-200/70 text-sm">
                  Le modele de remuneration le plus avantageux pour les auteurs en Afrique
                </p>
              </div>
              {/* Mini testimonial */}
              <div className="mt-6 bg-primary/20 backdrop-blur-sm rounded-xl p-5 border border-primary/30 max-w-sm">
                <p className="text-white/90 text-sm italic mb-3 leading-relaxed">
                  &ldquo;Grace a Papers, j&apos;ai pu publier mon premier roman et toucher des lecteurs dans tout le Cameroun et au-dela. L&apos;interface est intuitive et le paiement mobile rend tout tellement simple !&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-white">S</div>
                  <span className="text-sm text-primary-100">Sandrine M., Auteure</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
