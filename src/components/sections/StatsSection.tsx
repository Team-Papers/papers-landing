"use client";

import { useEffect, useState } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FadeIn from "@/components/ui/FadeIn";
import { fetchStats } from "@/lib/api";

export default function StatsSection() {
  const [stats, setStats] = useState({ totalBooks: 0, totalAuthors: 0 });

  useEffect(() => {
    fetchStats().then(setStats);
  }, []);

  const items = [
    { label: "Livres publies", value: stats.totalBooks, suffix: "+" },
    { label: "Auteurs actifs", value: stats.totalAuthors, suffix: "+" },
    { label: "Lecteurs", value: 500, suffix: "+" },
    { label: "Revenus redistribues", value: 1, suffix: "M FCFA" },
  ];

  return (
    <section className="py-16 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {items.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
