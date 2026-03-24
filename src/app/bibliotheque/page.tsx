"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Heart, Loader2, Smartphone, Library } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { fetchLibrary, fetchFavorites, type LibraryBook } from "@/lib/api";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.seedsoftengine.papers";

export default function BibliothequePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"books" | "favorites">("books");
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [favorites, setFavorites] = useState<LibraryBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/connexion?redirect=/bibliotheque");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([fetchLibrary(), fetchFavorites()]).then(([lib, fav]) => {
      setBooks(lib);
      setFavorites(fav);
      setLoading(false);
    });
  }, [user]);

  function handleRead(bookId: string) {
    const deepLink = `intent://book/${bookId}#Intent;package=com.seedsoftengine.papers;scheme=papers;end`;
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = deepLink;
    document.body.appendChild(iframe);
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.location.href = PLAYSTORE_URL;
    }, 2000);
  }

  const currentList = activeTab === "books" ? books : favorites;

  if (authLoading || !user) return null;

  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-6 border border-white/10">
              <Library className="w-4 h-4" />
              Ma Bibliotheque
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Vos livres
            </h1>
            <p className="text-white/70 max-w-md mx-auto">
              Retrouvez tous vos livres achetes et vos favoris.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface-dim min-h-[50vh] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-xl p-1 border border-outline/50 mb-8 max-w-sm">
            <button
              onClick={() => setActiveTab("books")}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2",
                activeTab === "books" ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:bg-surface-dim"
              )}
            >
              <BookOpen className="w-4 h-4" />
              Mes livres ({books.length})
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2",
                activeTab === "favorites" ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:bg-surface-dim"
              )}
            >
              <Heart className="w-4 h-4" />
              Favoris ({favorites.length})
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
              <p className="text-sm text-on-surface-muted">Chargement...</p>
            </div>
          ) : currentList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-on-surface/5 flex items-center justify-center mb-4">
                {activeTab === "books" ? <BookOpen className="w-10 h-10 text-on-surface/20" /> : <Heart className="w-10 h-10 text-on-surface/20" />}
              </div>
              <p className="text-on-surface-variant font-medium mb-1">
                {activeTab === "books" ? "Aucun livre dans votre bibliotheque" : "Aucun favori"}
              </p>
              <p className="text-sm text-on-surface-muted mb-4">
                {activeTab === "books" ? "Achetez votre premier livre dans le catalogue." : "Ajoutez des livres en favoris depuis l'application."}
              </p>
              <Link href="/catalogue">
                <Button size="sm">Explorer le catalogue</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentList.map((item, i) => (
                <FadeIn key={item.bookId} delay={i * 0.03}>
                  <div className="group bg-white rounded-xl border border-outline/50 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <Link href={`/catalogue/${item.book.id}`}>
                      <div className="relative aspect-[2/3] overflow-hidden">
                        {item.book.coverUrl ? (
                          <Image src={item.book.coverUrl} alt={item.book.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-primary/20" />
                          </div>
                        )}
                        {/* Progress bar */}
                        {item.progress > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                            <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-3">
                      <p className="text-sm font-medium text-on-surface line-clamp-1">{item.book.title}</p>
                      <p className="text-xs text-on-surface-muted line-clamp-1 mb-2">
                        {item.book.author.penName || `${item.book.author.user.firstName} ${item.book.author.user.lastName}`}
                      </p>
                      <button
                        onClick={() => handleRead(item.book.id)}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        <Smartphone className="w-3 h-3" />
                        Lire
                      </button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
