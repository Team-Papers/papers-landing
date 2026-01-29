import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/lib/constants";
import Accordion from "@/components/ui/Accordion";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquemment posées sur Papers, la plateforme camerounaise de livres numériques.",
};

export default function FAQPage() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">Questions fréquentes</h1>
            <p className="text-lg text-text-secondary">
              Tout ce que vous devez savoir sur Papers.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <Accordion items={FAQ_ITEMS} />
        </FadeIn>
      </div>
    </section>
  );
}
