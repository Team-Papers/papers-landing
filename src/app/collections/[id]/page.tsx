"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Loader2, Layers, Star } from "lucide-react";
import { fetchCollectionDetail, type CollectionDetail } from "@/lib/api";
import { useCache } from "@/lib/cache";
import FadeIn from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export default function CollectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { prefetchBookDetail } = useCache();
  const [collection, setCollection] = useState<CollectionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchCollectionDetail(id).then((data) => {
      setCollection(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
        <Layers className="w-10 h-10 text-on-surface/20 mb-4" />
        <p className="text-on-surface-variant font-medium">Collection introuvable</p>
        <Link href="/collections" className="text-sm text-primary hover:underline mt-2">Retour aux collections</Link>
      </div>
    );
  }

  return (
    <>
      <section className="relative pt-24 pb-8 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-6 cursor-pointer transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <FadeIn>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-2">
              {collection.name}
            </h1>
            {collection.description && (
              <p className="text-white/70 max-w-lg">{collection.description}</p>
            )}
            <p className="text-sm text-white/50 mt-3">
              {collection.books.length} livre{collection.books.length > 1 ? "s" : ""}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface-dim min-h-[40vh] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {collection.books.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <BookOpen className="w-10 h-10 text-on-surface/20 mb-4" />
              <p className="text-on-surface-variant font-medium">Cette collection est vide</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {collection.books.map(({ book }, i) => (
                <FadeIn key={book.id} delay={i * 0.03}>
                  <Link
                    href={`/catalogue/${book.id}`}
                    onMouseEnter={() => prefetchBookDetail(book.id)}
                    className="group bg-white rounded-2xl border border-outline/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col"
                  >
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                      {book.coverUrl ? (
                        <Image src={book.coverUrl} alt={book.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-primary/15" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm backdrop-blur-sm",
                          book.price === 0 ? "bg-secondary/90 text-white" : "bg-white/90 text-on-surface"
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
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-on-surface mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-primary/70 font-medium mb-2">
                        {book.author.penName || `${book.author.user.firstName} ${book.author.user.lastName}`}
                      </p>
                      {book.description && (
                        <p className="text-xs text-on-surface-variant line-clamp-2 flex-1">{book.description}</p>
                      )}
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
