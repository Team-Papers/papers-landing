"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Star, BookOpen, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { fetchBooks, fetchCategories, type ApiBook, type ApiCategory } from "@/lib/api";

export default function CataloguePage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 12;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Load categories once
  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  // Load books when filters change
  const loadBooks = useCallback(async () => {
    setLoading(true);
    const result = await fetchBooks({
      page,
      limit,
      q: debouncedSearch || undefined,
      categoryId: selectedCategory || undefined,
    });
    setBooks(result.books);
    setTotal(result.total);
    setLoading(false);
  }, [page, debouncedSearch, selectedCategory]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedCategory]);

  const totalPages = Math.ceil(total / limit);
  const authorName = (book: ApiBook) =>
    book.author.penName || `${book.author.user.firstName} ${book.author.user.lastName}`;

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
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                !selectedCategory
                  ? "bg-primary text-white"
                  : "bg-surface-alt text-text-secondary hover:bg-primary/10"
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-surface-alt text-text-secondary hover:bg-primary/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Aucun livre trouve.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-text-muted mb-6">
              {total} livre{total > 1 ? "s" : ""} trouve{total > 1 ? "s" : ""}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((book, i) => (
                <FadeIn key={book.id} delay={i * 0.03}>
                  <Card className="h-full flex flex-col">
                    <div className="h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      {book.coverUrl ? (
                        <Image
                          src={book.coverUrl}
                          alt={book.title}
                          width={160}
                          height={192}
                          className="w-full h-full object-cover rounded-lg"
                          unoptimized
                        />
                      ) : (
                        <BookOpen className="w-12 h-12 text-primary/30" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={book.price === 0 ? "free" : "default"}>
                        {book.price === 0 ? "Gratuit" : `${book.price.toLocaleString("fr-FR")} FCFA`}
                      </Badge>
                      {book._count.reviews > 0 && (
                        <span className="flex items-center gap-1 text-xs text-text-muted ml-auto">
                          <Star className="w-3 h-3 text-accent fill-accent" />
                          {book._count.reviews}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-text-primary mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-text-muted mb-2">{authorName(book)}</p>
                    <p className="text-xs text-text-secondary line-clamp-2 flex-1">
                      {book.description || ""}
                    </p>
                  </Card>
                </FadeIn>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-border hover:bg-surface-alt disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-text-secondary">
                  Page {page} sur {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-border hover:bg-surface-alt disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
