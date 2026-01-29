"use client";

import { Smartphone, CreditCard, WifiOff, PenTool, Shield, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import FadeIn from "@/components/ui/FadeIn";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Smartphone, CreditCard, WifiOff, PenTool, Shield, TrendingUp,
};

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Fonctionnalités"
          subtitle="Tout ce dont vous avez besoin pour lire et publier en Afrique."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = iconMap[f.icon] || Smartphone;
            return (
              <FadeIn key={f.title} delay={i * 0.1}>
                <Card className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{f.title}</h3>
                  <p className="text-text-secondary text-sm">{f.description}</p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
