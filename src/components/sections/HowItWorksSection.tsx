"use client";

import { UserPlus, Search, BookOpen } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { HOW_IT_WORKS } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = { UserPlus, Search, BookOpen };

export default function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Comment ça marche ?"
          subtitle="En 3 étapes simples, accédez à une bibliothèque de livres africains."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => {
            const Icon = iconMap[item.icon] || BookOpen;
            return (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-sm font-semibold text-primary mb-2">Étape {item.step}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
