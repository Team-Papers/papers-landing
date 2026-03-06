"use client";

import { Smartphone, CreditCard, WifiOff, PenTool, Shield, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Smartphone, CreditCard, WifiOff, PenTool, Shield, TrendingUp,
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-surface-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Tout ce qu'il vous faut"
          subtitle="Des fonctionnalites pensees pour le lecteur et l'auteur africain."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = iconMap[f.icon] || Smartphone;
            const isLarge = i < 2;

            return (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div
                  className={cn(
                    "group relative rounded-2xl border border-outline/60 bg-white p-7 transition-all duration-300",
                    "hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20",
                    isLarge && "md:col-span-1 lg:col-span-1 lg:row-span-1"
                  )}
                  style={{ perspective: "800px" }}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110",
                    i === 0 && "bg-accent/10",
                    i === 1 && "bg-primary/10",
                    i > 1 && "bg-primary/10"
                  )}>
                    <Icon className={cn(
                      "w-7 h-7",
                      i === 0 ? "text-accent-600" : "text-primary"
                    )} />
                  </div>

                  <h3 className="font-display text-lg font-bold text-on-surface mb-2">{f.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{f.description}</p>

                  {/* Extra visual for key features */}
                  {i === 0 && (
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFCB05]/10 text-xs font-medium text-[#FFCB05]">
                        MTN MoMo
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF6600]/10 text-xs font-medium text-[#FF6600]">
                        Orange Money
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="mt-5 flex items-center gap-2">
                      <WifiOff className="w-4 h-4 text-primary/50" />
                      <span className="text-xs text-on-surface-muted">Telechargez et lisez partout</span>
                    </div>
                  )}

                  {/* Glow border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-primary/20" />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
