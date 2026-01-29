"use client";

import { useState, useMemo } from "react";
import { Search, Star, BookOpen } from "lucide-react";
import { BOOKS, GENRES } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CataloguePage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tous");

  const genres = ["Tous", ...GENRES.map((g) => g.name)];

  const filtered = useMemo(() => {
    return BOOKS.filter((b) => {
      const matchGenre = selectedGenre === "Tous" || b.genre === selectedGenre;
      const matchSearch =
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      return matchGenre && matchSearch;
    });
  }, [search, selectedGenre]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Catalogue"
          subtitle="Explorez notre collection de livres d'auteurs camerounais et africains."
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher un titre ou auteur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  selectedGenre === g
                    ? "bg-primary text-white"
                    : "bg-surface-alt text-text-secondary hover:bg-primary/10"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Aucun livre trouvé.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((book, i) => (
              <FadeIn key={book.id} delay={i * 0.05}>
                <Card className="h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-primary/30" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={book.isFree ? "free" : "default"}>
                      {book.isFree ? "Gratuit" : book.genre}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-text-muted ml-auto">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      {book.rating}
                    </span>
                  </div>
                  <h3 className="font-bold text-text-primary mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-text-muted mb-2">{book.author}</p>
                  <p className="text-xs text-text-secondary line-clamp-2 flex-1">{book.synopsis}</p>
                  <div className="mt-4 font-bold text-primary">
                    {book.isFree ? "Gratuit" : `${book.price.toLocaleString("fr-FR")} FCFA`}
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
