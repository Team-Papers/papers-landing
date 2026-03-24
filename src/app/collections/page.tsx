"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Layers, BookOpen, ChevronRight } from "lucide-react";
import { fetchCollections, type Collection } from "@/lib/api";
import FadeIn from "@/components/ui/FadeIn";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollections().then((data) => {
      setCollections(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-6 border border-white/10">
              <Layers className="w-4 h-4" />
              Collections
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Collections curatees
            </h1>
            <p className="text-white/70 max-w-md mx-auto">
              Des selections de livres thematiques pour vous inspirer.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface-dim min-h-[50vh] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
            </div>
          ) : collections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Layers className="w-10 h-10 text-on-surface/20 mb-4" />
              <p className="text-on-surface-variant font-medium">Aucune collection disponible</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {collections.map((col, i) => (
                <FadeIn key={col.id} delay={i * 0.05}>
                  <Link
                    href={`/collections/${col.id}`}
                    className="group bg-white rounded-2xl border border-outline/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                  >
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      {col.coverImageUrl ? (
                        <Image src={col.coverImageUrl} alt={col.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Layers className="w-12 h-12 text-primary/15" />
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 text-on-surface backdrop-blur-sm shadow-sm">
                          {col._count.books} livre{col._count.books > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
                        {col.name}
                      </h3>
                      {col.description && (
                        <p className="text-sm text-on-surface-variant line-clamp-2">{col.description}</p>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3">
                        Voir la collection <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
