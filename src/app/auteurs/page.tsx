import type { Metadata } from "next";
import { BadgePercent, BarChart3, BookOpen, PenTool, Upload, Users, CheckCircle, ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pour les Auteurs",
  description: "Publiez vos livres sur Papers et gagnez 70% des revenus. Outils de publication, statistiques et accès à des milliers de lecteurs.",
};

const advantages = [
  { icon: BadgePercent, title: "70% des revenus", desc: "Le modèle le plus avantageux pour les auteurs en Afrique." },
  { icon: BarChart3, title: "Statistiques détaillées", desc: "Suivez vos ventes, lectures et revenus en temps réel." },
  { icon: Users, title: "Communauté de lecteurs", desc: "Accédez à des milliers de lecteurs au Cameroun et en Afrique." },
  { icon: PenTool, title: "Éditeur intégré", desc: "Outils de mise en page et prévisualisation de vos livres." },
  { icon: Upload, title: "Publication simple", desc: "Téléchargez vos fichiers EPUB/PDF et publiez en quelques clics." },
  { icon: BookOpen, title: "DRM inclus", desc: "Protection de vos œuvres contre la copie non autorisée." },
];

const steps = [
  { num: "01", title: "Créez votre profil auteur", desc: "Inscrivez-vous et complétez votre profil avec votre biographie et photo." },
  { num: "02", title: "Téléchargez votre manuscrit", desc: "Importez votre livre au format EPUB ou PDF avec sa couverture." },
  { num: "03", title: "Fixez votre prix", desc: "Définissez le prix de vente ou proposez votre livre gratuitement." },
  { num: "04", title: "Publiez et gagnez", desc: "Après validation sous 48h, votre livre est en ligne. Recevez vos revenus via Mobile Money." },
];

export default function AuteursPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Publiez sur Papers, gagnez{" "}
              <span className="text-primary">70%</span> des revenus
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Rejoignez une communauté d&apos;auteurs camerounais et africains. Papers vous
              offre les meilleurs outils et la meilleure rémunération du marché.
            </p>
            <a href="https://author.papers237.duckdns.org/register">
              <Button size="lg">
                <PenTool className="w-5 h-5" />
                Devenir auteur
              </Button>
            </a>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Vos avantages" subtitle="Pourquoi publier sur Papers ?" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.1}>
                <Card className="h-full">
                  <a.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold text-text-primary mb-2">{a.title}</h3>
                  <p className="text-sm text-text-secondary">{a.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Processus de publication" subtitle="De votre manuscrit à vos premiers lecteurs" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div>
                  <div className="text-4xl font-bold text-primary/20 mb-3">{s.num}</div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <FadeIn>
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-white/80" />
            <h2 className="text-3xl font-bold mb-4">Prêt à publier ?</h2>
            <p className="text-white/80 mb-8">Créez votre compte auteur dès maintenant et publiez votre premier livre.</p>
            <a href="https://author.papers237.duckdns.org/register">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Commencer <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
