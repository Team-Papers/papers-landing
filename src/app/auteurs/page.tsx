"use client";

import { BadgePercent, BarChart3, PenTool, Upload, Users, Shield, ArrowRight, Sparkles, Check } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const advantages = [
  {
    icon: BadgePercent,
    title: "70% des revenus",
    desc: "Le modele de remuneration le plus avantageux d'Afrique. Recevez vos gains chaque mois directement sur votre Mobile Money.",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/15 text-primary",
  },
  {
    icon: BarChart3,
    title: "Statistiques en temps reel",
    desc: "Tableau de bord complet : ventes, revenus, lectures, avis. Suivez les performances de chacun de vos livres.",
    color: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/15 text-accent-700",
  },
  {
    icon: Users,
    title: "Communaute de lecteurs",
    desc: "Accedez a des milliers de lecteurs au Cameroun et dans toute l'Afrique francophone. Elargissez votre audience.",
    color: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/15 text-secondary",
  },
  {
    icon: PenTool,
    title: "Editeur integre",
    desc: "Outils de mise en page professionnels, previsualisation en temps reel et personnalisation de la couverture.",
    color: "from-info/20 to-info/5",
    iconBg: "bg-info/15 text-info",
  },
  {
    icon: Upload,
    title: "Publication simplifiee",
    desc: "Telechargez votre EPUB ou PDF, ajoutez votre couverture et publiez en moins de 5 minutes. Validation sous 48h.",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/15 text-primary",
  },
  {
    icon: Shield,
    title: "Protection DRM",
    desc: "Vos oeuvres sont protegees par un systeme DRM avance contre la copie et la redistribution non autorisee.",
    color: "from-error/10 to-error/5",
    iconBg: "bg-error/10 text-error",
  },
];

const steps = [
  {
    num: "01",
    title: "Creez votre profil auteur",
    desc: "Inscrivez-vous, ajoutez votre biographie, photo et liens vers vos reseaux. Votre page auteur est votre vitrine.",
  },
  {
    num: "02",
    title: "Telechargez votre manuscrit",
    desc: "Importez votre livre au format EPUB ou PDF. Ajoutez une couverture attrayante et renseignez les details.",
  },
  {
    num: "03",
    title: "Validation editoriale",
    desc: "Notre equipe verifie votre contenu sous 48h. Nous nous assurons de la qualite et du respect de nos conditions.",
  },
  {
    num: "04",
    title: "Publiez et gagnez",
    desc: "Votre livre est en ligne et accessible a tous les lecteurs. Recevez 70% des revenus via Mobile Money.",
  },
];

const stats = [
  { value: "70%", label: "Revenus pour l'auteur" },
  { value: "48h", label: "Delai de validation" },
  { value: "1.5k+", label: "Lecteurs actifs" },
  { value: "0 FCFA", label: "Frais d'inscription" },
];

const checklist = [
  "Publication gratuite, sans frais caches",
  "Paiements mensuels via Mobile Money",
  "Controle total sur vos prix",
  "Statistiques detaillees en temps reel",
  "Protection DRM de vos oeuvres",
  "Support dedie aux auteurs",
];

export default function AuteursPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-6 border border-white/10">
                <Sparkles className="w-4 h-4" />
                Espace Auteurs
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                Publiez, partagez,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-400">
                  gagnez 70%
                </span>
              </h1>
              <p className="text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
                Rejoignez la communaute d&apos;auteurs qui revolutionne l&apos;edition en Afrique.
                Publiez gratuitement, fixez vos prix, et recevez vos revenus via Mobile Money.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://author.papers237.duckdns.org/register" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="glow-primary">
                    <PenTool className="w-5 h-5" />
                    Devenir auteur
                  </Button>
                </a>
                <a href="#avantages">
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                    En savoir plus
                  </Button>
                </a>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center">
                    <p className="font-display text-3xl font-bold text-white mb-1">{s.value}</p>
                    <p className="text-sm text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="avantages" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                Avantages
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-4">
                Pourquoi publier sur Papers ?
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour publier, vendre et developper votre audience.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.08}>
                <Card className="h-full group relative overflow-hidden">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", a.color)} />
                  <div className="relative">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", a.iconBg)}>
                      <a.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-on-surface mb-2 text-lg">{a.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{a.desc}</p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="py-24 bg-surface-dim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                Comment ca marche
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-4">
                De votre manuscrit a vos premiers lecteurs
              </h2>
            </div>
          </FadeIn>

          <div className="relative">
            <div className="hidden lg:block absolute top-24 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <FadeIn key={s.num} delay={i * 0.12}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-700 text-white font-display font-bold text-lg mb-5 shadow-lg shadow-primary/25">
                      {s.num}
                    </div>
                    <h3 className="font-display text-lg font-bold text-on-surface mb-2">{s.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checklist + Dashboard mockup */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                Tout est inclus
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-6">
                Concentrez-vous sur l&apos;ecriture, on s&apos;occupe du reste
              </h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Papers gere la distribution, le paiement, la protection et la promotion de vos oeuvres.
                Vous gardez le controle total sur votre contenu et vos revenus.
              </p>
              <ul className="space-y-3 mb-10">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <span className="text-on-surface-variant text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="https://author.papers237.duckdns.org/register" target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  <PenTool className="w-5 h-5" />
                  Commencer a publier
                </Button>
              </a>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/10">
                  <div className="bg-white rounded-2xl shadow-sm border border-outline/50 overflow-hidden">
                    <div className="bg-surface-dim px-5 py-3 border-b border-outline/50 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-error/50" />
                      <div className="w-3 h-3 rounded-full bg-warning/50" />
                      <div className="w-3 h-3 rounded-full bg-secondary/50" />
                      <span className="text-xs text-on-surface-muted ml-2 font-mono">Curtis KAKEU — Dashboard</span>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-on-surface-muted">Revenus ce mois</p>
                          <p className="font-display text-2xl font-bold text-on-surface">127 500 <span className="text-sm font-normal text-on-surface-muted">FCFA</span></p>
                        </div>
                        <div className="text-xs text-secondary font-semibold bg-secondary/10 px-2 py-1 rounded-lg">+23%</div>
                      </div>
                      <div className="h-px bg-outline/50" />
                      <div className="grid grid-cols-3 gap-3">
                        {[{ v: "342", l: "Ventes" }, { v: "1.2k", l: "Lectures" }, { v: "4.8", l: "Note moy." }].map((d) => (
                          <div key={d.l} className="bg-surface-dim rounded-xl p-3 text-center">
                            <p className="font-display font-bold text-on-surface">{d.v}</p>
                            <p className="text-[10px] text-on-surface-muted">{d.l}</p>
                          </div>
                        ))}
                      </div>
                      <div className="h-px bg-outline/50" />
                      <div className="space-y-2">
                        {[
                          { title: "E-COMMERCE & DROP-SHIPPING", price: "1 999 FCFA", cover: "https://api.papers237.duckdns.org/media/covers/covers_d76fe532-0cdb-43c1-967a-ba44a89ca31a_image.png" },
                          { title: "Planifie ton année avec Curtis KAKEU", price: "2 500 FCFA", cover: "https://api.papers237.duckdns.org/media/covers/covers_6effc8c0-54b1-49df-b13f-81fe8990054a_image.png" },
                        ].map((book) => (
                          <div key={book.title} className="flex items-center justify-between py-1.5">
                            <div className="flex items-center gap-2.5">
                              <img src={book.cover} alt={book.title} className="w-8 h-10 rounded object-cover" />
                              <div>
                                <p className="text-xs font-medium text-on-surface truncate max-w-[140px]">{book.title}</p>
                                <p className="text-[10px] text-on-surface-muted">{book.price}</p>
                              </div>
                            </div>
                            <p className="text-xs font-semibold text-secondary">En vente</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-accent/10 rounded-full blur-xl" />
                <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-primary/10 rounded-full blur-xl" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-24 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 pattern-african opacity-50" />
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[120px]" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-6">
              <PenTool className="w-8 h-8 text-primary-200" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Pret a partager votre histoire ?
            </h2>
            <p className="text-primary-100/70 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Creez votre compte auteur en moins d&apos;une minute. Publiez votre premier livre et
              touchez des lecteurs dans toute l&apos;Afrique.
            </p>
            <a href="https://author.papers237.duckdns.org/register" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                Creer mon compte auteur
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
