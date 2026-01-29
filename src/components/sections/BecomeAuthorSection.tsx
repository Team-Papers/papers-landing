"use client";

import { ArrowRight, BadgePercent, BarChart3, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

const perks = [
  { icon: BadgePercent, text: "70% des revenus pour vous" },
  { icon: BarChart3, text: "Statistiques détaillées en temps réel" },
  { icon: Users, text: "Accès à des milliers de lecteurs" },
];

export default function BecomeAuthorSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <span className="text-primary-light text-sm font-semibold uppercase tracking-wider">
              Pour les auteurs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              Publiez vos oeuvres et gagnez 70% des revenus
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Rejoignez la communauté d&apos;auteurs Papers et faites découvrir vos
              livres à des milliers de lecteurs au Cameroun et en Afrique.
            </p>
            <ul className="space-y-4 mb-8">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{text}</span>
                </li>
              ))}
            </ul>
            <Link href="/auteurs">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                En savoir plus
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </FadeIn>

          <FadeIn direction="right">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
              <div className="text-6xl md:text-7xl font-bold mb-2">70/30</div>
              <p className="text-white/70 text-lg">Auteur / Plateforme</p>
              <div className="mt-6 w-full bg-white/20 rounded-full h-4 overflow-hidden">
                <div className="bg-white h-full rounded-full" style={{ width: "70%" }} />
              </div>
              <p className="mt-4 text-sm text-white/60">
                Le modèle de rémunération le plus avantageux pour les auteurs en Afrique
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
