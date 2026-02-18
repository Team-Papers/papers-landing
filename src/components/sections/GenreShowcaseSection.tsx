"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";
import { fetchCategories, type ApiCategory } from "@/lib/api";

const COLORS = ["#4285F4", "#9C27B0", "#FF9800", "#4CAF50", "#E91E63", "#00BCD4", "#673AB7", "#795548"];

export default function GenreShowcaseSection() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Genres populaires"
          subtitle="Explorez une grande variete de genres litteraires."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <FadeIn key={cat.id} delay={i * 0.05}>
                <Link
                  href={`/catalogue?genre=${cat.name}`}
                  className="group flex flex-col items-center p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <BookOpen className="w-7 h-7" style={{ color }} />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{cat.name}</h3>
                  <p className="text-xs text-text-muted">{cat._count.books} livres</p>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
