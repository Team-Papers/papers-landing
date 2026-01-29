"use client";

import { BookOpen, Feather, FileText, Lightbulb, Image, Baby, Rocket, Landmark } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { GENRES } from "@/lib/constants";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Feather, FileText, Lightbulb, Image, Baby, Rocket, Landmark,
};

export default function GenreShowcaseSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Genres populaires"
          subtitle="Explorez une grande variété de genres littéraires."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {GENRES.map((genre, i) => {
            const Icon = iconMap[genre.icon] || BookOpen;
            return (
              <FadeIn key={genre.name} delay={i * 0.05}>
                <Link
                  href={`/catalogue?genre=${genre.name}`}
                  className="group flex flex-col items-center p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${genre.color}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: genre.color }} />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{genre.name}</h3>
                  <p className="text-xs text-text-muted">{genre.count} livres</p>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
