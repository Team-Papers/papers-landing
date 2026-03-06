"use client";

import { BookOpen, WifiOff, RefreshCw, Smartphone, CreditCard, Heart, ArrowRight, Sparkles, Download, Star, Globe, Check } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: BookOpen,
    title: "Catalogue riche",
    desc: "Des milliers de livres dans tous les genres : romans, essais, BD, poesie, jeunesse... par des auteurs camerounais et africains.",
    iconBg: "bg-primary/15 text-primary",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: WifiOff,
    title: "Lecture hors-ligne",
    desc: "Telechargez vos livres et lisez-les meme sans connexion internet. Ideal pour les deplacements et les zones a faible couverture.",
    iconBg: "bg-accent/15 text-accent-700",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: RefreshCw,
    title: "Synchronisation auto",
    desc: "Votre progression de lecture, vos favoris et annotations sont automatiquement synchronises entre tous vos appareils.",
    iconBg: "bg-secondary/15 text-secondary",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Smartphone,
    title: "Multi-appareils",
    desc: "Lisez sur votre smartphone Android, tablette ou via le web. Commencez sur un appareil, continuez sur un autre.",
    iconBg: "bg-info/15 text-info",
    color: "from-info/20 to-info/5",
  },
  {
    icon: CreditCard,
    title: "Paiement Mobile Money",
    desc: "Payez instantanement avec MTN Mobile Money ou Orange Money. Pas de carte bancaire necessaire, simple et securise.",
    iconBg: "bg-primary/15 text-primary",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Heart,
    title: "Recommandations",
    desc: "Decouvrez des livres qui correspondent a vos gouts grace a nos suggestions personnalisees basees sur vos lectures.",
    iconBg: "bg-error/10 text-error",
    color: "from-error/10 to-error/5",
  },
];

const steps = [
  {
    num: "01",
    icon: Download,
    title: "Telechargez l'app",
    desc: "Installez Papers gratuitement depuis le Google Play Store. Aucun abonnement requis.",
  },
  {
    num: "02",
    icon: Globe,
    title: "Explorez le catalogue",
    desc: "Parcourez des milliers de livres par genre, auteur ou popularite. Filtrez et trouvez votre prochaine lecture.",
  },
  {
    num: "03",
    icon: CreditCard,
    title: "Achetez via Mobile Money",
    desc: "Selectionnez votre livre et payez en un clic avec MTN ou Orange Money. De nombreux livres sont gratuits.",
  },
  {
    num: "04",
    icon: BookOpen,
    title: "Lisez partout",
    desc: "Ouvrez votre livre et profitez d'une experience de lecture confortable, meme hors-ligne.",
  },
];

const whyPapers = [
  "Livres en francais par des auteurs africains",
  "Prix accessibles en FCFA",
  "Lecture hors-ligne disponible",
  "Paiement Mobile Money (MTN, Orange)",
  "Application gratuite, sans publicite",
  "Nouveaux livres chaque semaine",
];

export default function LecteursPage() {
  const { user } = useAuth();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-primary-400/30 animate-float" />
        <div className="absolute bottom-1/4 left-1/5 w-2 h-2 rounded-full bg-accent-400/30 animate-float-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-6 border border-white/10">
                <Sparkles className="w-4 h-4" />
                Espace Lecteurs
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                Votre bibliotheque,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-400">
                  partout avec vous
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                Accedez a des milliers de livres d&apos;auteurs camerounais et africains.
                Payez avec Mobile Money, lisez partout, meme hors-ligne.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={user ? "/catalogue" : "/inscription"}>
                  <Button size="lg" className="glow-primary">
                    <BookOpen className="w-5 h-5" />
                    {user ? "Explorer le catalogue" : "Commencer a lire"}
                  </Button>
                </Link>
                <a href="https://play.google.com/store/apps/details?id=com.seedsoftengine.papers" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                    <Download className="w-5 h-5" />
                    Telecharger l&apos;app
                  </Button>
                </a>
              </div>
            </FadeIn>

            {/* Trust indicators */}
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
                {[
                  { icon: Star, text: "4.5/5 sur Play Store" },
                  { icon: BookOpen, text: "200+ livres" },
                  { icon: Globe, text: "Lecteurs dans 10+ pays" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-white/50 text-sm">
                    <Icon className="w-4 h-4 text-accent-400" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                Fonctionnalites
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-4">
                L&apos;experience de lecture ideale
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
                Tout a ete concu pour rendre la lecture agreable, accessible et abordable.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <Card className="h-full group relative overflow-hidden">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", f.color)} />
                  <div className="relative">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", f.iconBg)}>
                      <f.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-on-surface mb-2 text-lg">{f.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-surface-dim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                Comment ca marche
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-4">
                Commencez a lire en 4 etapes
              </h2>
            </div>
          </FadeIn>

          <div className="relative">
            <div className="hidden lg:block absolute top-24 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <FadeIn key={s.num} delay={i * 0.12}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-700 text-white mb-5 shadow-lg shadow-primary/25">
                      <s.icon className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-bold text-primary mb-2">Etape {s.num}</div>
                    <h3 className="font-display text-lg font-bold text-on-surface mb-2">{s.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Papers + reading mockup */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Reading mockup */}
            <FadeIn direction="left">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/10">
                  <div className="bg-white rounded-2xl shadow-sm border border-outline/50 overflow-hidden">
                    <div className="bg-surface-dim px-5 py-3 border-b border-outline/50 flex items-center justify-between">
                      <span className="text-xs font-medium text-on-surface">Ma Bibliotheque</span>
                      <span className="text-xs text-on-surface-muted">3 livres</span>
                    </div>
                    <div className="p-5 space-y-4">
                      {[
                        { title: "05 Lettres a Ma Soeur", author: "SAMA Coriane", progress: 72, color: "bg-primary", cover: "https://api.papers237.duckdns.org/media/covers/covers_WhatsApp_Image_2025-03-11_at_12.43.55_PM.jpeg" },
                        { title: "E-COMMERCE & DROP-SHIPPING", author: "Curtis KAKEU", progress: 35, color: "bg-accent", cover: "https://api.papers237.duckdns.org/media/covers/covers_d76fe532-0cdb-43c1-967a-ba44a89ca31a_image.png" },
                        { title: "Faire avancer les choses", author: "Andrew MASTER", progress: 100, color: "bg-secondary", cover: "https://api.papers237.duckdns.org/media/covers/covers_22a3ae50-2a58-4741-b4a7-2c74337f81d2_image.png" },
                      ].map((book) => (
                        <div key={book.title} className="flex items-center gap-3">
                          <img src={book.cover} alt={book.title} className="w-10 h-14 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-on-surface truncate">{book.title}</p>
                            <p className="text-xs text-on-surface-muted">{book.author}</p>
                            <div className="mt-1.5 flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full", book.color)} style={{ width: `${book.progress}%` }} />
                              </div>
                              <span className="text-[10px] text-on-surface-muted font-medium shrink-0">
                                {book.progress === 100 ? "Termine" : `${book.progress}%`}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-outline/50">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-on-surface-muted">Temps de lecture cette semaine</span>
                          <span className="font-semibold text-primary">4h 23min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -left-3 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-accent/10 rounded-full blur-xl" />
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                Pourquoi Papers
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-6">
                La lecture africaine, reinventee
              </h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Papers est nee de la conviction que chaque Africain merite un acces facile a des livres
                de qualite, a des prix justes, dans sa langue et sur son telephone.
              </p>
              <ul className="space-y-3 mb-10">
                {whyPapers.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-on-surface-variant text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={user ? "/catalogue" : "/inscription"}>
                  <Button size="lg">
                    <BookOpen className="w-5 h-5" />
                    {user ? "Voir le catalogue" : "Creer un compte"}
                  </Button>
                </Link>
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
              Pret a decouvrir votre prochaine lecture ?
            </h2>
            <p className="text-primary-100/70 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Telechargez l&apos;application Papers gratuitement et accedez a des milliers de livres
              d&apos;auteurs africains.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://play.google.com/store/apps/details?id=com.seedsoftengine.papers" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                  Telecharger sur Google Play
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <Link href={user ? "/catalogue" : "/inscription"}>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  {user ? "Explorer le catalogue" : "Creer un compte"}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
