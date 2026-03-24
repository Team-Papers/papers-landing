"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Star, BookOpen, Loader2, ChevronLeft, ChevronRight, ChevronDown, Library, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { type ApiBook, type ApiCategory } from "@/lib/api";
import { useCache } from "@/lib/cache";
import { cn } from "@/lib/utils";

const VISIBLE_CATEGORIES = 8;

export default function CataloguePage() {
  const { getCategories, getBooks, prefetchBookDetail } = useCache();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 12;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, [getCategories]);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    const result = await getBooks({
      page,
      limit,
      q: debouncedSearch || undefined,
      categoryId: selectedCategory || undefined,
    });
    setBooks(result.books);
    setTotal(result.total);
    setLoading(false);
  }, [page, debouncedSearch, selectedCategory, getBooks]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedCategory]);

  const totalPages = Math.ceil(total / limit);
  const authorName = (book: ApiBook) =>
    book.author.penName || `${book.author.user.firstName} ${book.author.user.lastName}`;

  const visibleCategories = showAllCategories ? categories : categories.slice(0, VISIBLE_CATEGORIES);
  const hasMore = categories.length > VISIBLE_CATEGORIES;
  const selectedCategoryName = categories.find((c) => c.id === selectedCategory)?.name;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-6 border border-white/10">
                <Library className="w-4 h-4" />
                Catalogue
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] mb-4">
                Explorez notre{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-400">
                  collection
                </span>
              </h1>
              <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
                Des milliers de livres d&apos;auteurs camerounais et africains vous attendent.
              </p>
            </FadeIn>

            {/* Search bar in hero */}
            <FadeIn delay={0.15}>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Rechercher un titre, un auteur, un genre..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 rounded-2xl border-0 bg-white text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:ring-4 focus:ring-primary/20 text-base shadow-xl shadow-black/10"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-dim transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-on-surface-muted" />
                  </button>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-10 bg-surface-dim min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <FadeIn>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-on-surface-muted" />
                <span className="text-sm font-medium text-on-surface-variant">Filtrer par categorie</span>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-auto text-xs text-primary hover:underline cursor-pointer"
                  >
                    Effacer le filtre
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border",
                    !selectedCategory
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : "bg-white text-on-surface-variant border-outline hover:border-primary/30 hover:shadow-sm"
                  )}
                >
                  Tous
                </button>
                {visibleCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border",
                      selectedCategory === cat.id
                        ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                        : "bg-white text-on-surface-variant border-outline hover:border-primary/30 hover:shadow-sm"
                    )}
                  >
                    {cat.name}
                    <span className={cn(
                      "ml-1.5 text-xs",
                      selectedCategory === cat.id ? "text-white/70" : "text-on-surface-muted"
                    )}>
                      ({cat._count.books})
                    </span>
                  </button>
                ))}
                {hasMore && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20 hover:bg-primary/5 transition-all cursor-pointer flex items-center gap-1"
                  >
                    {showAllCategories ? "Moins" : `+${categories.length - VISIBLE_CATEGORIES} autres`}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", showAllCategories && "rotate-180")} />
                  </button>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Results header */}
          {!loading && books.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-on-surface-variant">
                <span className="font-semibold text-on-surface">{total}</span> livre{total > 1 ? "s" : ""}{" "}
                {selectedCategoryName && (
                  <>en <span className="font-medium text-primary">{selectedCategoryName}</span></>
                )}
                {debouncedSearch && (
                  <>pour &quot;<span className="font-medium text-primary">{debouncedSearch}</span>&quot;</>
                )}
              </p>
              {totalPages > 1 && (
                <p className="text-xs text-on-surface-muted hidden sm:block">
                  Page {page} sur {totalPages}
                </p>
              )}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <p className="text-sm text-on-surface-muted">Chargement des livres...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-20 h-20 rounded-2xl bg-on-surface/5 flex items-center justify-center mb-4">
                <BookOpen className="w-10 h-10 text-on-surface/20" />
              </div>
              <p className="text-on-surface-variant font-medium mb-1">Aucun livre trouve</p>
              <p className="text-sm text-on-surface-muted">Essayez avec d&apos;autres mots-cles ou categories.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {books.map((book, i) => (
                  <FadeIn key={book.id} delay={i * 0.03}>
                    <Link
                      href={`/catalogue/${book.id}`}
                      onMouseEnter={() => prefetchBookDetail(book.id)}
                      className="group bg-white rounded-2xl border border-outline/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 h-full flex flex-col"
                    >
                      {/* Cover */}
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                        {book.coverUrl ? (
                          <Image
                            src={book.coverUrl}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-primary/15" />
                          </div>
                        )}
                        {/* Price badge overlay */}
                        <div className="absolute top-3 left-3">
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-sm",
                            book.price === 0
                              ? "bg-secondary/90 text-white"
                              : "bg-white/90 text-on-surface"
                          )}>
                            {book.price === 0 ? "Gratuit" : `${Number(book.price).toLocaleString("fr-FR")} FCFA`}
                          </span>
                        </div>
                        {book._count.reviews > 0 && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-white/90 text-on-surface backdrop-blur-sm shadow-sm">
                              <Star className="w-3 h-3 text-accent fill-accent" />
                              {book._count.reviews}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-display font-bold text-on-surface mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-sm text-primary/70 font-medium mb-2">{authorName(book)}</p>
                        <p className="text-xs text-on-surface-variant line-clamp-2 flex-1 leading-relaxed">
                          {book.description || ""}
                        </p>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2.5 rounded-xl bg-white border border-outline hover:bg-surface-dim disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={cn(
                          "w-10 h-10 rounded-xl text-sm font-medium transition-all cursor-pointer",
                          page === pageNum
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "bg-white text-on-surface-variant border border-outline hover:bg-surface-dim"
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2.5 rounded-xl bg-white border border-outline hover:bg-surface-dim disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
