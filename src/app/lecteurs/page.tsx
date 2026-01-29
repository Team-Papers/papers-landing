import type { Metadata } from "next";
import { BookOpen, WifiOff, RefreshCw, Smartphone, CreditCard, Heart, ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pour les Lecteurs",
  description: "Découvrez des milliers de livres d'auteurs camerounais et africains. Lecture hors-ligne, paiement Mobile Money, synchronisation multi-appareils.",
};

const features = [
  { icon: BookOpen, title: "Catalogue riche", desc: "Des milliers de livres dans tous les genres, des auteurs camerounais et africains." },
  { icon: WifiOff, title: "Lecture hors-ligne", desc: "Téléchargez vos livres et lisez-les même sans connexion internet." },
  { icon: RefreshCw, title: "Synchronisation", desc: "Retrouvez votre progression de lecture sur tous vos appareils." },
  { icon: Smartphone, title: "Multi-appareils", desc: "Lisez sur votre smartphone, tablette ou ordinateur." },
  { icon: CreditCard, title: "Paiement Mobile Money", desc: "Payez simplement avec MTN ou Orange Money." },
  { icon: Heart, title: "Recommandations", desc: "Découvrez des livres qui correspondent à vos goûts." },
];

export default function LecteursPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-secondary/5 via-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Votre bibliothèque numérique,{" "}
              <span className="text-secondary">partout avec vous</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Accédez à des milliers de livres d&apos;auteurs camerounais, lisez hors-ligne
              et payez facilement avec Mobile Money.
            </p>
            <Link href="/catalogue">
              <Button size="lg" className="bg-secondary hover:bg-secondary-dark">
                <BookOpen className="w-5 h-5" />
                Découvrir le catalogue
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="L'expérience lecteur" subtitle="Tout pour une lecture agréable et accessible." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1}>
                <Card className="h-full">
                  <f.icon className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="font-bold text-text-primary mb-2">{f.title}</h3>
                  <p className="text-sm text-text-secondary">{f.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Prêt à lire ?</h2>
            <p className="text-white/80 mb-8">Créez votre compte et commencez à explorer le catalogue dès maintenant.</p>
            <Link href="/catalogue">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
                Explorer <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
