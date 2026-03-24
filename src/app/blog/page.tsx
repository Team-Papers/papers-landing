"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Calendar, MessageCircle, Heart, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchArticles, type Article } from "@/lib/api";
import FadeIn from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 12;

  const load = useCallback(async () => {
    setLoading(true);
    const result = await fetchArticles(page, limit);
    setArticles(result.articles);
    setTotal(result.total);
    setLoading(false);
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / limit);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-6 border border-white/10">
              <Newspaper className="w-4 h-4" />
              Blog
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Actualites &amp; Articles
            </h1>
            <p className="text-white/70 max-w-md mx-auto">
              Decouvrez nos derniers articles, conseils et actualites litteraires.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface-dim min-h-[50vh] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
              <p className="text-sm text-on-surface-muted">Chargement...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Newspaper className="w-10 h-10 text-on-surface/20 mb-4" />
              <p className="text-on-surface-variant font-medium">Aucun article pour le moment</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, i) => (
                  <FadeIn key={article.id} delay={i * 0.04}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="group bg-white rounded-2xl border border-outline/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                        {article.coverImageUrl ? (
                          <Image src={article.coverImageUrl} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Newspaper className="w-10 h-10 text-primary/15" />
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h2 className="font-display font-bold text-on-surface mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
                        {article.excerpt && (
                          <p className="text-sm text-on-surface-variant line-clamp-2 flex-1 leading-relaxed mb-3">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-on-surface-muted mt-auto pt-3 border-t border-outline/30">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(article.publishedAt || article.createdAt)}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {article._count.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {article._count.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2.5 rounded-xl bg-white border border-outline hover:bg-surface-dim disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-on-surface-variant px-3">Page {page} sur {totalPages}</span>
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2.5 rounded-xl bg-white border border-outline hover:bg-surface-dim disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm">
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
