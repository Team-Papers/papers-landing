"use client";

import { useEffect, useState } from "react";
import { BookOpen, Users, Eye, Banknote } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FadeIn from "@/components/ui/FadeIn";
import { fetchStats } from "@/lib/api";

export default function StatsSection() {
  const [stats, setStats] = useState({ totalBooks: 0, totalAuthors: 0 });

  useEffect(() => {
    fetchStats().then(setStats);
  }, []);

  const items = [
    { label: "Lecteurs", value: 1500, suffix: "+", icon: Eye, color: "text-primary" },
    { label: "Auteurs actifs", value: 200, suffix: "+", icon: Users, color: "text-accent" },
    { label: "Livres publies", value: stats.totalBooks || 220, suffix: "+", icon: BookOpen, color: "text-secondary" },
    { label: "Revenus redistribues", value: 12, suffix: "M FCFA", icon: Banknote, color: "text-primary-700" },
  ];

  return (
    <section className="relative z-10 -mt-14 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-white rounded-2xl shadow-xl border border-outline/50 p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {items.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center relative">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                      <div className={`text-2xl md:text-3xl font-display font-bold ${stat.color}`}>
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant">{stat.label}</p>
                    {i < items.length - 1 && (
                      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-outline" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
