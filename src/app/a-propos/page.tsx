import type { Metadata } from "next";
import { Target, Eye, Heart, BookOpen, Users, Globe, Zap, ArrowRight, Sparkles, BadgePercent, Shield, Smartphone } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "A Propos",
  description: "Decouvrez Papers, la plateforme camerounaise de livres numeriques creee par Seed Soft Engine.",
};

const values = [
  {
    icon: Target,
    title: "Notre Mission",
    desc: "Democratiser l'acces a la litterature africaine en proposant une plateforme adaptee aux realites du continent : paiement mobile, lecture hors-ligne, remuneration juste des auteurs.",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/15 text-primary",
  },
  {
    icon: Eye,
    title: "Notre Vision",
    desc: "Devenir la reference du livre numerique en Afrique francophone, en connectant auteurs et lecteurs a travers une technologie accessible a tous.",
    color: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/15 text-accent-700",
  },
  {
    icon: Heart,
    title: "Nos Valeurs",
    desc: "Accessibilite, equite, innovation et promotion de la culture africaine. Nous croyons que chaque histoire merite d'etre racontee et lue.",
    color: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/15 text-secondary",
  },
];

const milestones = [
  { year: "2024", title: "Naissance de Papers", desc: "Lancement de la plateforme par Seed Soft Engine avec une vision : rendre la lecture accessible a tous les Africains." },
  { year: "2024", title: "Premiere publication", desc: "Les premiers auteurs camerounais publient leurs oeuvres. Le catalogue commence a se diversifier." },
  { year: "2025", title: "Croissance rapide", desc: "Plus de 200 auteurs rejoignent la plateforme. Le catalogue depasse les 220 livres publies." },
  { year: "2025", title: "1500+ lecteurs", desc: "La communaute grandit avec des lecteurs dans plus de 10 pays africains. Le paiement Mobile Money est un succes." },
];

const keyNumbers = [
  { value: "1500+", label: "Lecteurs actifs", icon: Users },
  { value: "200+", label: "Auteurs publies", icon: BookOpen },
  { value: "220+", label: "Livres disponibles", icon: Globe },
  { value: "70%", label: "Revenus aux auteurs", icon: BadgePercent },
];

const whyDifferent = [
  { icon: Smartphone, title: "Mobile-first", desc: "Concue pour le smartphone, l'outil le plus repandu en Afrique." },
  { icon: BadgePercent, title: "Equite financiere", desc: "70% des revenus vont directement a l'auteur, le meilleur taux du marche." },
  { icon: Shield, title: "Protection DRM", desc: "Les oeuvres des auteurs sont protegees contre la copie non autorisee." },
  { icon: Zap, title: "Paiement Mobile Money", desc: "MTN et Orange Money integres nativement. Pas de carte bancaire requise." },
];

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-6 border border-white/10">
                <Sparkles className="w-4 h-4" />
                A Propos
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                L&apos;histoire derriere{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-400">
                  Papers
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Nee au Cameroun, Papers est la plateforme qui revolutionne l&apos;edition numerique
                en Afrique. Creee par {SITE_CONFIG.company}, pour les auteurs et lecteurs africains.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Key numbers */}
      <section className="relative -mt-10 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {keyNumbers.map((n) => (
                <div key={n.label} className="bg-white rounded-2xl border border-outline/50 p-5 text-center shadow-lg shadow-black/5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <n.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-display text-2xl font-bold text-on-surface">{n.value}</p>
                  <p className="text-xs text-on-surface-muted mt-0.5">{n.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                Ce qui nous guide
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-4">
                Mission, Vision & Valeurs
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
                Trois piliers qui definissent notre engagement envers la culture africaine.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <Card className="h-full group relative overflow-hidden">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", v.color)} />
                  <div className="relative">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5", v.iconBg)}>
                      <v.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-on-surface mb-3 text-xl">{v.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{v.desc}</p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Notre histoire - timeline */}
      <section className="py-24 bg-surface-dim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                Notre parcours
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-4">
                L&apos;histoire de Papers
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="relative pl-16">
                      <div className="absolute left-3.5 top-1 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-sm" />
                      <div className="bg-white rounded-2xl border border-outline/50 p-5">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{m.year}</span>
                        <h3 className="font-display font-bold text-on-surface mt-2 mb-1">{m.title}</h3>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce qui nous differencie */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                Notre difference
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-6">
                Pourquoi Papers est unique
              </h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Contrairement aux plateformes occidentales, Papers a ete pensee des le depart
                pour le contexte africain : paiement mobile, lecture offline, prix en FCFA,
                et une remuneration equitable pour les createurs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {whyDifferent.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-on-surface text-sm mb-0.5">{item.title}</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/10">
                  <div className="bg-white rounded-2xl shadow-sm border border-outline/50 overflow-hidden">
                    <div className="bg-surface-dim px-5 py-3 border-b border-outline/50">
                      <span className="text-xs font-medium text-on-surface">{SITE_CONFIG.company}</span>
                    </div>
                    <div className="p-6 space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg shadow-primary/25">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-on-surface text-lg">Papers</h3>
                          <p className="text-sm text-on-surface-muted">by {SITE_CONFIG.company}</p>
                        </div>
                      </div>
                      <div className="h-px bg-outline/50" />
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        Studio de developpement logiciel camerounais, passionne par la technologie
                        au service de la culture africaine. Notre equipe cree des solutions innovantes
                        pour connecter les auteurs et lecteurs du continent.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["EdTech", "Mobile", "Afrique", "E-books", "Cameroun"].map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -left-3 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-accent/10 rounded-full blur-xl" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 pattern-african opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-6">
              <BookOpen className="w-8 h-8 text-primary-200" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Rejoignez l&apos;aventure Papers
            </h2>
            <p className="text-primary-100/70 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Que vous soyez auteur ou lecteur, votre place est ici.
              Ensemble, construisons l&apos;avenir du livre en Afrique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lecteurs">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                  Espace lecteurs
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auteurs">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Espace auteurs
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
