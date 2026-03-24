"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Star, Sparkles, ChevronRight } from "lucide-react";
import { fetchNewBooks, type ApiBook } from "@/lib/api";
import FadeIn from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export default function NewBooksSection() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchNewBooks(8).then((data) => {
      setBooks(data);
      setLoaded(true);
    });
  }, []);

  if (loaded && books.length === 0) return null;

  return (
    <section className="py-16 bg-surface-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 mb-2">
                <Sparkles className="w-4 h-4" />
                Nouveautes
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">
                Fraichement publies
              </h2>
            </div>
            <Link href="/catalogue" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Voir tout <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        {!loaded ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-56 rounded-xl bg-white mb-3" />
                <div className="h-4 rounded bg-white mb-2 w-3/4" />
                <div className="h-3 rounded bg-white w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book, i) => (
              <FadeIn key={book.id} delay={i * 0.04}>
                <Link href={`/catalogue/${book.id}`} className="group block bg-white rounded-xl border border-outline/40 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    {book.coverUrl ? (
                      <Image src={book.coverUrl} alt={book.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-primary/15" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm",
                        book.price === 0 ? "bg-secondary/90 text-white" : "bg-white/90 text-on-surface"
                      )}>
                        {book.price === 0 ? "Gratuit" : `${Number(book.price).toLocaleString("fr-FR")} FCFA`}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{book.title}</p>
                    <p className="text-xs text-on-surface-muted line-clamp-1">
                      {book.author.penName || `${book.author.user.firstName} ${book.author.user.lastName}`}
                    </p>
                    {book.description && (
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">{book.description}</p>
                    )}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
