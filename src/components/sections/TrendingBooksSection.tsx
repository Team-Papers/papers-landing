"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Star, TrendingUp, ChevronRight } from "lucide-react";
import { fetchTrendingBooks, type ApiBook } from "@/lib/api";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export default function TrendingBooksSection() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchTrendingBooks(8).then((data) => {
      setBooks(data);
      setLoaded(true);
    });
  }, []);

  if (loaded && books.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mb-2">
                <TrendingUp className="w-4 h-4" />
                Tendances
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">
                Livres populaires
              </h2>
            </div>
            <Link href="/catalogue" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Voir tout <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        {!loaded ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-44 animate-pulse">
                <div className="h-60 rounded-xl bg-surface-dim mb-3" />
                <div className="h-4 rounded bg-surface-dim mb-2 w-3/4" />
                <div className="h-3 rounded bg-surface-dim w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {books.map((book, i) => (
              <FadeIn key={book.id} delay={i * 0.05} className="flex-shrink-0 w-44">
                <Link href={`/catalogue/${book.id}`} className="group block">
                  <div className="relative h-60 rounded-xl overflow-hidden shadow-md mb-3 border border-outline/30">
                    {book.coverUrl ? (
                      <Image src={book.coverUrl} alt={book.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-primary/20" />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm",
                        book.price === 0 ? "bg-secondary/90 text-white" : "bg-white/90 text-on-surface"
                      )}>
                        {book.price === 0 ? "Gratuit" : `${Number(book.price).toLocaleString("fr-FR")} FCFA`}
                      </span>
                    </div>
                    {book._count.reviews > 0 && (
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-white/90 text-on-surface backdrop-blur-sm">
                          <Star className="w-2.5 h-2.5 text-accent fill-accent" />
                          {book._count.reviews}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                    {book.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {book.author.user.avatarUrl ? (
                      <Image src={book.author.user.avatarUrl} alt="" width={14} height={14} className="w-3.5 h-3.5 rounded-full object-cover" unoptimized />
                    ) : null}
                    <p className="text-xs text-on-surface-muted line-clamp-1">
                      {book.author.penName || `${book.author.user.firstName} ${book.author.user.lastName}`}
                    </p>
                  </div>
                  {book.description && (
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">{book.description}</p>
                  )}
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        <Link href="/catalogue" className="sm:hidden flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline mt-4">
          Voir tout le catalogue <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
