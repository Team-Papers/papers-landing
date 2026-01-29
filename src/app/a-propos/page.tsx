import type { Metadata } from "next";
import { Target, Eye, Heart, BookOpen } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "À Propos",
  description: "Découvrez Papers, la plateforme camerounaise de livres numériques créée par Seed Soft Engine.",
};

const values = [
  { icon: Target, title: "Notre Mission", desc: "Démocratiser l'accès à la littérature africaine en proposant une plateforme adaptée aux réalités du continent : paiement mobile, lecture hors-ligne, rémunération juste des auteurs." },
  { icon: Eye, title: "Notre Vision", desc: "Devenir la référence du livre numérique en Afrique francophone, en connectant auteurs et lecteurs à travers une technologie accessible à tous." },
  { icon: Heart, title: "Nos Valeurs", desc: "Accessibilité, équité, innovation et promotion de la culture africaine. Nous croyons que chaque histoire mérite d'être racontée et lue." },
];

export default function AProposPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              À Propos de <span className="text-primary">Papers</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {SITE_CONFIG.name} est une plateforme créée par {SITE_CONFIG.company},
              un studio camerounais passionné par la technologie au service de la culture africaine.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.15}>
                <Card className="h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{v.title}</h3>
                  <p className="text-text-secondary text-sm">{v.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Notre Équipe" subtitle="Les personnes derrière Papers" />
          <FadeIn>
            <Card className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-1">{SITE_CONFIG.company}</h3>
              <p className="text-text-muted text-sm mb-3">Fondateur & Développeur</p>
              <p className="text-text-secondary text-sm">
                Studio de développement logiciel camerounais, passionné par la technologie
                au service de la culture africaine.
              </p>
            </Card>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
