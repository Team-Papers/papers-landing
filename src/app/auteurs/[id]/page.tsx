"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Loader2, Star, User as UserIcon, UserPlus, UserCheck } from "lucide-react";
import { fetchAuthor, fetchAuthorBooks, checkFollowing, followAuthor, unfollowAuthor, type ApiBook } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useCache } from "@/lib/cache";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

interface AuthorData {
  id: string;
  penName: string | null;
  bio: string | null;
  photoUrl: string | null;
  user: { firstName: string; lastName: string; avatarUrl: string | null };
}

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { prefetchBookDetail } = useCache();
  const [author, setAuthor] = useState<AuthorData | null>(null);
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      fetchAuthor(id),
      fetchAuthorBooks(id, 20),
    ]).then(([authorData, authorBooks]) => {
      setAuthor(authorData);
      setBooks(authorBooks);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (user && id) {
      checkFollowing(id).then(setIsFollowing);
    }
  }, [user, id]);

  async function handleToggleFollow() {
    if (!user) { router.push(`/connexion?redirect=/auteurs/${id}`); return; }
    if (!id) return;
    setIsFollowing(!isFollowing);
    const ok = isFollowing ? await unfollowAuthor(id) : await followAuthor(id);
    if (!ok) setIsFollowing(isFollowing);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!author) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
        <UserIcon className="w-10 h-10 text-on-surface/20 mb-4" />
        <p className="text-on-surface-variant font-medium">Auteur introuvable</p>
        <Link href="/catalogue" className="text-sm text-primary hover:underline mt-2">Retour au catalogue</Link>
      </div>
    );
  }

  const displayName = author.penName || `${author.user.firstName} ${author.user.lastName}`;
  const avatarSrc = author.photoUrl || author.user.avatarUrl;

  return (
    <>
      {/* Header */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african opacity-30" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-8 cursor-pointer transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>

          <FadeIn>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="w-28 h-28 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-black/20 flex-shrink-0">
                {avatarSrc ? (
                  <Image src={avatarSrc} alt={displayName} width={112} height={112} className="w-full h-full object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <UserIcon className="w-12 h-12 text-white/40" />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-2">
                  {displayName}
                </h1>
                <p className="text-sm text-white/60 mb-3">
                  {books.length} livre{books.length > 1 ? "s" : ""} publie{books.length > 1 ? "s" : ""}
                </p>
                {author.bio && (
                  <p className="text-white/70 text-sm leading-relaxed max-w-lg">
                    {author.bio}
                  </p>
                )}
                <div className="mt-4">
                  <Button
                    size="sm"
                    onClick={handleToggleFollow}
                    variant={isFollowing ? "outline" : "primary"}
                    className={cn(
                      isFollowing
                        ? "border-white/30 text-white hover:bg-white/10"
                        : "bg-white text-primary hover:bg-white/90"
                    )}
                  >
                    {isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    {isFollowing ? "Abonne" : "Suivre"}
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Books */}
      <section className="bg-surface-dim min-h-[40vh] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-on-surface mb-6">
            Livres de {displayName}
          </h2>

          {books.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <BookOpen className="w-10 h-10 text-on-surface/20 mb-4" />
              <p className="text-on-surface-variant font-medium">Aucun livre publie</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {books.map((book, i) => (
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
                      {book.description && (
                        <p className="text-xs text-on-surface-variant line-clamp-2 flex-1 leading-relaxed">{book.description}</p>
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
