"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Layers, ChevronRight } from "lucide-react";
import { fetchCollections, type Collection } from "@/lib/api";
import FadeIn from "@/components/ui/FadeIn";

export default function CollectionsPreviewSection() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchCollections().then((data) => {
      setCollections(data.slice(0, 6));
      setLoaded(true);
    });
  }, []);

  if (loaded && collections.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mb-2">
                <Layers className="w-4 h-4" />
                Collections
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">
                Selections pour vous
              </h2>
            </div>
            <Link href="/collections" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Toutes les collections <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        {!loaded ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse h-32 rounded-xl bg-surface-dim" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((col, i) => (
              <FadeIn key={col.id} delay={i * 0.05}>
                <Link
                  href={`/collections/${col.id}`}
                  className="group relative flex items-end h-36 rounded-xl overflow-hidden border border-outline/30 hover:shadow-lg transition-all"
                >
                  {col.imageUrl ? (
                    <Image src={col.imageUrl} alt={col.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="relative p-4 w-full">
                    <p className="font-display font-bold text-white text-lg leading-tight">{col.name}</p>
                    <p className="text-xs text-white/70 mt-0.5">
                      {col._count.books} livre{col._count.books > 1 ? "s" : ""}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        <Link href="/collections" className="sm:hidden flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline mt-4">
          Toutes les collections <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
