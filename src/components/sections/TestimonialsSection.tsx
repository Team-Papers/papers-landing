"use client";

import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const avatarColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#9B59B6"];

export default function TestimonialsSection() {
  const featured = TESTIMONIALS[0];
  const rest = TESTIMONIALS.slice(1);

  return (
    <section className="py-24 bg-surface-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Ce qu'ils disent de Papers"
          subtitle="Auteurs et lecteurs partagent leur experience."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Featured testimonial */}
          <FadeIn className="md:row-span-2">
            <div className="h-full bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-8 flex flex-col relative overflow-hidden">
              <Quote className="w-16 h-16 text-primary/10 absolute top-4 right-4" />
              <div className="flex-1">
                <p className="text-on-surface text-lg leading-relaxed mb-6 relative z-10">
                  &ldquo;{featured.content}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={cn("w-5 h-5", j < featured.rating ? "text-accent fill-accent" : "text-outline")}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md"
                  style={{ backgroundColor: avatarColors[0] }}
                >
                  {featured.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-semibold text-on-surface">{featured.name}</div>
                  <div className="text-sm text-on-surface-muted">{featured.role}</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Other testimonials */}
          {rest.map((t, i) => (
            <FadeIn key={t.id} delay={(i + 1) * 0.1}>
              <div className="bg-white border border-outline/60 rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                <div className="flex-1">
                  <Quote className="w-8 h-8 text-primary/10 mb-3" />
                  <p className="text-on-surface-variant leading-relaxed mb-4">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={cn("w-4 h-4", j < t.rating ? "text-accent fill-accent" : "text-outline")}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: avatarColors[(i + 1) % avatarColors.length] }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-on-surface">{t.name}</div>
                    <div className="text-xs text-on-surface-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
