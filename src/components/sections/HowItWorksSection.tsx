"use client";

import { UserPlus, Search, BookOpen } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { HOW_IT_WORKS } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = { UserPlus, Search, BookOpen };

export default function HowItWorksSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Comment ca marche ?"
          subtitle="En 3 etapes simples, accedez a une bibliotheque de livres africains."
        />

        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-[52px] left-[16.666%] right-[16.666%] h-0.5 bg-outline">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
            {HOW_IT_WORKS.map((item, i) => {
              const Icon = iconMap[item.icon] || BookOpen;
              return (
                <FadeIn key={item.step} delay={i * 0.2}>
                  <div className="text-center relative">
                    {/* Step circle */}
                    <div className="relative z-10 mx-auto mb-6">
                      <div className="w-[104px] h-[104px] rounded-full bg-primary/5 flex items-center justify-center mx-auto border-2 border-primary/20">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg">
                          <Icon className="w-9 h-9 text-white" />
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-white shadow-md font-display">
                        {item.step}
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-bold text-on-surface mb-3">{item.title}</h3>
                    <p className="text-on-surface-variant max-w-xs mx-auto">{item.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
