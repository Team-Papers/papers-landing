"use client";

import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Ce qu'ils disent de Papers"
          subtitle="Auteurs et lecteurs partagent leur expérience."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.1}>
              <div className="bg-white border border-border rounded-xl p-6 h-full flex flex-col">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-text-secondary flex-1 mb-4">{t.content}</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < t.rating ? "text-accent fill-accent" : "text-gray-200"}`}
                    />
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-text-primary">{t.name}</div>
                  <div className="text-sm text-text-muted">{t.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
