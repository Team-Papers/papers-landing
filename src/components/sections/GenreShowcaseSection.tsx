"use client";

import { useEffect, useState, useRef } from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { fetchCategories, fetchBooks, type ApiCategory, type ApiBook } from "@/lib/api";
import { cn } from "@/lib/utils";

const COLORS = ["#4285F4", "#9C27B0", "#FF9800", "#4CAF50", "#E91E63", "#00BCD4", "#673AB7", "#795548"];

export default function GenreShowcaseSection() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCategories().then((cats) => {
      // Sort: "Personal Development" first, then by book count descending
      const sorted = [...cats].sort((a, b) => {
        const aIsPD = a.name.toLowerCase().includes("personal development");
        const bIsPD = b.name.toLowerCase().includes("personal development");
        if (aIsPD && !bIsPD) return -1;
        if (!aIsPD && bIsPD) return 1;
        return b._count.books - a._count.books;
      });
      setCategories(sorted);
      if (sorted.length > 0) setActiveCategory(sorted[0].id);
    });
  }, []);

  useEffect(() => {
    if (!activeCategory) return;
    setLoadingBooks(true);
    fetchBooks({ categoryId: activeCategory, limit: 12 }).then((res) => {
      setBooks(res.books);
      setLoadingBooks(false);
    });
  }, [activeCategory]);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }

  if (categories.length === 0) return null;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Explorez par genre"
          subtitle="Decouvrez une grande variete de genres litteraires africains."
        />

        {/* Genre tabs */}
        <FadeIn>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-8">
            {categories.map((cat, i) => {
              const color = COLORS[i % COLORS.length];
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer border",
                    isActive
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-white text-on-surface-variant border-outline hover:border-primary/30 hover:shadow-sm"
                  )}
                >
                  <BookOpen className="w-4 h-4" style={{ color: isActive ? "white" : color }} />
                  {cat.name}
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full",
                    isActive ? "bg-white/20 text-white" : "bg-surface-container text-on-surface-muted"
                  )}>
                    {cat._count.books}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Book carousel */}
        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-outline flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-surface-dim"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-outline flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-surface-dim"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide py-2"
          >
            {loadingBooks ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="shrink-0 w-[160px]">
                  <div className="aspect-[2/3] rounded-xl bg-surface-container animate-pulse mb-3" />
                  <div className="h-3 bg-surface-container rounded animate-pulse mb-2 w-3/4" />
                  <div className="h-2.5 bg-surface-container rounded animate-pulse w-1/2" />
                </div>
              ))
            ) : books.length > 0 ? (
              books.map((book, i) => (
                <div key={book.id} className="shrink-0 w-[160px] group/card">
                  <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-md transition-all duration-300 group-hover/card:shadow-xl group-hover/card:-translate-y-1">
                    {book.coverUrl ? (
                      <Image
                        src={book.coverUrl}
                        alt={book.title}
                        width={160}
                        height={240}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center p-4"
                        style={{ background: `linear-gradient(135deg, ${COLORS[i % COLORS.length]}30, ${COLORS[i % COLORS.length]}10)` }}
                      >
                        <p className="text-on-surface font-display font-semibold text-sm text-center leading-tight">
                          {book.title}
                        </p>
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm text-on-surface truncate">{book.title}</h4>
                  <p className="text-xs text-on-surface-muted truncate">
                    {book.author.penName || `${book.author.user.firstName} ${book.author.user.lastName}`}
                  </p>
                  <p className="text-xs font-semibold text-primary mt-1">
                    {book.price === 0 ? "Gratuit" : `${book.price.toLocaleString("fr-FR")} FCFA`}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-on-surface-muted text-sm py-8">Aucun livre dans cette categorie pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
