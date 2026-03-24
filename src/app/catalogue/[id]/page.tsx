"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Star, BookOpen, Loader2, ShoppingCart, Globe, FileText,
  Hash, Calendar, BookMarked, ChevronRight, User as UserIcon, Smartphone, Heart, X as XIcon, Send, Share2,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useCache } from "@/lib/cache";
import { fetchRecommendedBooks, checkLibraryOwnership, createPurchase, checkFavorite, addFavorite, removeFavorite, createReview, type ApiBookDetail, type ApiBook, type ReviewItem, type ReviewsResponse } from "@/lib/api";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import { useToast } from "@/lib/toast";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.seedsoftengine.papers";

function formatPrice(price: number) {
  return price === 0 ? "Gratuit" : `${Number(price).toLocaleString("fr-FR")} FCFA`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function authorDisplayName(author: ApiBookDetail["author"]) {
  return author.penName || `${author.user.firstName} ${author.user.lastName}`;
}

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { getBookDetail, getReviews, prefetchBookDetail } = useCache();
  const { toast } = useToast();

  const [book, setBook] = useState<ApiBookDetail | null>(null);
  const [reviews, setReviews] = useState<ReviewsResponse | null>(null);
  const [recommended, setRecommended] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [descExpanded, setDescExpanded] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const [obtainLoading, setObtainLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      getBookDetail(id),
      getReviews(id),
      fetchRecommendedBooks(8),
    ]).then(([bookData, reviewsData, recs]) => {
      setBook(bookData);
      setReviews(reviewsData);
      setRecommended(recs.filter((r) => r.id !== id));
      setLoading(false);
    });
  }, [id, getBookDetail, getReviews]);

  // Check library ownership and favorite when user is logged in
  useEffect(() => {
    if (user && id) {
      checkLibraryOwnership(id).then(setIsOwned);
      checkFavorite(id).then(setIsFavorite);
    }
  }, [user, id]);

  async function handleToggleFavorite() {
    if (!user) { router.push(`/connexion?redirect=/catalogue/${id}`); return; }
    if (!id) return;
    setIsFavorite(!isFavorite);
    const ok = isFavorite ? await removeFavorite(id) : await addFavorite(id);
    if (!ok) { setIsFavorite(isFavorite); toast("Erreur lors de la mise a jour", "error"); }
    else toast(isFavorite ? "Retire des favoris" : "Ajoute aux favoris");
  }

  async function handleSubmitReview(rating: number, comment: string): Promise<{ success: boolean; message?: string }> {
    if (!id) return { success: false, message: "Livre introuvable" };
    const result = await createReview(id, rating, comment);
    if (result.success) {
      setShowReviewModal(false);
      toast("Avis publie !");
      getReviews(id).then((r) => r && setReviews(r));
    }
    return result;
  }

  function handleOpenApp() {
    const deepLink = `intent://book/${id}#Intent;package=com.seedsoftengine.papers;scheme=papers;end`;
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = deepLink;
    document.body.appendChild(iframe);
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.location.href = PLAYSTORE_URL;
    }, 2000);
  }

  async function handleObtain() {
    if (isOwned) {
      handleOpenApp();
      return;
    }
    if (!user) {
      router.push(`/connexion?redirect=/catalogue/${id}`);
      return;
    }
    if (Number(book?.price) === 0) {
      setObtainLoading(true);
      const result = await createPurchase(id, "MTN", "000000000");
      setObtainLoading(false);
      if (result.success) {
        setIsOwned(true);
        toast("Livre ajoute a votre bibliotheque !");
      } else {
        toast(result.message || "Erreur", "error");
      }
      return;
    }
    router.push(`/catalogue/${id}/paiement`);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <p className="text-sm text-on-surface-muted">Chargement...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
        <div className="w-20 h-20 rounded-2xl bg-on-surface/5 flex items-center justify-center mb-4">
          <BookOpen className="w-10 h-10 text-on-surface/20" />
        </div>
        <p className="text-on-surface-variant font-medium mb-1">Livre introuvable</p>
        <Link href="/catalogue" className="text-sm text-primary hover:underline mt-2">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Header with cover */}
      <section className="relative pt-24 pb-8 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african opacity-30" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back + Share */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            <button
              onClick={async () => {
                const url = window.location.href;
                if (navigator.share) {
                  await navigator.share({ title: book.title, text: `Decouvrez "${book.title}" sur Papers`, url }).catch(() => {});
                } else {
                  await navigator.clipboard.writeText(url);
                  toast("Lien copie !", "info");
                }
              }}
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white cursor-pointer transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Partager
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Cover */}
            <FadeIn className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-48 h-72 sm:w-56 sm:h-80 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border-2 border-white/10">
                {book.coverUrl ? (
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white/30" />
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Info */}
            <FadeIn delay={0.1} className="flex-1 text-center md:text-left">
              {/* Categories */}
              {book.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                  {book.categories.map((c) => (
                    <span
                      key={c.id}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-primary-300 border border-white/10"
                    >
                      {c.category.name}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2">
                {book.title}
              </h1>

              <Link
                href={`/auteurs/${book.author.id}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
              >
                {book.author.photoUrl || book.author.user.avatarUrl ? (
                  <Image
                    src={(book.author.photoUrl || book.author.user.avatarUrl)!}
                    alt=""
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full object-cover border border-white/20"
                    unoptimized
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                    <UserIcon className="w-3.5 h-3.5 text-white/60" />
                  </div>
                )}
                <span className="text-sm font-medium">{authorDisplayName(book.author)}</span>
              </Link>

              {/* Rating */}
              {reviews && reviews.totalRatings > 0 && (
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.round(reviews.averageRating)
                            ? "text-accent fill-accent"
                            : "text-white/20"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-white/80 font-medium">
                    {reviews.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-white/50">
                    ({reviews.totalRatings} avis)
                  </span>
                </div>
              )}

              {/* Price + Obtain + Favorite */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                {!isOwned && (
                  <div className={cn(
                    "text-2xl font-bold",
                    book.price === 0 ? "text-secondary" : "text-white"
                  )}>
                    {formatPrice(book.price)}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {isOwned ? (
                    <>
                      <span className="text-sm text-secondary font-medium hidden sm:block">Dans votre bibliotheque</span>
                      <Button
                        size="lg"
                        onClick={handleObtain}
                        className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 min-w-[180px]"
                      >
                        <Smartphone className="w-5 h-5" />
                        Lire sur l&apos;app
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="lg"
                      onClick={handleObtain}
                      disabled={obtainLoading}
                      className="bg-accent hover:bg-accent-700 text-white shadow-lg shadow-accent/20 min-w-[180px]"
                    >
                      {obtainLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Obtenir
                        </>
                      )}
                    </Button>
                  )}
                  {/* Favorite button */}
                  <button
                    onClick={handleToggleFavorite}
                    className={cn(
                      "p-3 rounded-xl border-2 transition-all cursor-pointer",
                      isFavorite
                        ? "bg-error/10 border-error/30 text-error"
                        : "bg-white/10 border-white/20 text-white/70 hover:text-white hover:border-white/40"
                    )}
                  >
                    <Heart className={cn("w-5 h-5", isFavorite && "fill-error")} />
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="bg-surface-dim min-h-[40vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-xl p-1 border border-outline/50 mb-8 max-w-md">
            <button
              onClick={() => setActiveTab("description")}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer",
                activeTab === "description"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-dim"
              )}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer",
                activeTab === "reviews"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-dim"
              )}
            >
              Avis ({reviews?.totalRatings ?? 0})
            </button>
          </div>

          {activeTab === "description" ? (
            <DescriptionTab book={book} expanded={descExpanded} onToggle={() => setDescExpanded(!descExpanded)} />
          ) : (
            <ReviewsTab
              reviews={reviews}
              onWriteReview={() => user ? setShowReviewModal(true) : router.push(`/connexion?redirect=/catalogue/${id}`)}
            />
          )}

          {/* Recommended books */}
          {recommended.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-xl font-bold text-on-surface mb-6">
                Vous pourriez aussi aimer
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {recommended.map((rec) => (
                  <Link
                    key={rec.id}
                    href={`/catalogue/${rec.id}`}
                    onMouseEnter={() => prefetchBookDetail(rec.id)}
                    className="flex-shrink-0 w-36 group"
                  >
                    <div className="relative h-52 rounded-xl overflow-hidden shadow-md mb-2 border border-outline/30">
                      {rec.coverUrl ? (
                        <Image
                          src={rec.coverUrl}
                          alt={rec.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm",
                          rec.price === 0 ? "bg-secondary/90 text-white" : "bg-white/90 text-on-surface"
                        )}>
                          {formatPrice(rec.price)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                      {rec.title}
                    </p>
                    <p className="text-xs text-on-surface-muted line-clamp-1">
                      {rec.author.penName || `${rec.author.user.firstName} ${rec.author.user.lastName}`}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author section */}
          <div className="mt-12 bg-white rounded-2xl border border-outline/50 p-6">
            <h2 className="font-display text-lg font-bold text-on-surface mb-4">A propos de l&apos;auteur</h2>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {book.author.photoUrl || book.author.user.avatarUrl ? (
                  <Image
                    src={(book.author.photoUrl || book.author.user.avatarUrl)!}
                    alt=""
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/10"
                    unoptimized
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-on-surface">{authorDisplayName(book.author)}</p>
                {book.author.bio && (
                  <p className="text-sm text-on-surface-variant mt-1 leading-relaxed line-clamp-3">
                    {book.author.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </>
  );
}

/* ─── Review Modal ─── */
function ReviewModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (rating: number, comment: string) => Promise<{ success: boolean; message?: string }> }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError("Veuillez choisir une note"); return; }
    setSubmitting(true);
    setError("");
    const result = await onSubmit(rating, comment);
    if (!result.success) {
      setError(result.message || "Erreur lors de l'envoi");
    }
    setSubmitting(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-outline/50 w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline/50">
          <h3 className="font-display font-bold text-on-surface">Ecrire un avis</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-dim cursor-pointer">
            <XIcon className="w-5 h-5 text-on-surface-muted" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-error-light text-error text-sm rounded-xl px-4 py-3 font-medium">{error}</div>
          )}
          <div>
            <p className="text-sm font-medium text-on-surface mb-2">Votre note</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className="p-1 cursor-pointer"
                >
                  <Star className={cn("w-8 h-8 transition-colors", s <= rating ? "text-accent fill-accent" : "text-on-surface/15")} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface mb-2">Commentaire (optionnel)</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre avis sur ce livre..."
              maxLength={2000}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-outline bg-white text-sm text-on-surface placeholder:text-on-surface-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                <Send className="w-4 h-4" />
                Publier l&apos;avis
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

/* ─── Description Tab ─── */
function DescriptionTab({ book, expanded, onToggle }: { book: ApiBookDetail; expanded: boolean; onToggle: () => void }) {
  const description = book.description || "Aucune description disponible.";
  const isLong = description.length > 400;

  const characteristics = useMemo(() => {
    const items: { icon: React.ReactNode; label: string; value: string }[] = [];
    if (book.pageCount) items.push({ icon: <FileText className="w-4 h-4" />, label: "Pages", value: `${book.pageCount}` });
    if (book.language) items.push({ icon: <Globe className="w-4 h-4" />, label: "Langue", value: book.language === "fr" ? "Francais" : book.language });
    if (book.isbn) items.push({ icon: <Hash className="w-4 h-4" />, label: "ISBN", value: book.isbn });
    if (book.fileFormat) items.push({ icon: <BookMarked className="w-4 h-4" />, label: "Format", value: book.fileFormat.toUpperCase() });
    if (book.publishedAt) items.push({ icon: <Calendar className="w-4 h-4" />, label: "Publication", value: formatDate(book.publishedAt) });
    return items;
  }, [book]);

  return (
    <div className="space-y-8">
      {/* Description text */}
      <div className="bg-white rounded-2xl border border-outline/50 p-6">
        <h3 className="font-display font-bold text-on-surface mb-3">Synopsis</h3>
        <p className={cn(
          "text-sm text-on-surface-variant leading-relaxed whitespace-pre-line",
          !expanded && isLong && "line-clamp-6"
        )}>
          {description}
        </p>
        {isLong && (
          <button
            onClick={onToggle}
            className="text-sm text-primary font-medium mt-2 hover:underline cursor-pointer"
          >
            {expanded ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>

      {/* Characteristics */}
      {characteristics.length > 0 && (
        <div className="bg-white rounded-2xl border border-outline/50 p-6">
          <h3 className="font-display font-bold text-on-surface mb-4">Caracteristiques</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {characteristics.map((c) => (
              <div key={c.label} className="flex items-center gap-3 p-3 rounded-xl bg-surface-dim">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs text-on-surface-muted">{c.label}</p>
                  <p className="text-sm font-medium text-on-surface">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Reviews Tab ─── */
function ReviewsTab({ reviews, onWriteReview }: { reviews: ReviewsResponse | null; onWriteReview: () => void }) {
  if (!reviews || reviews.totalRatings === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-on-surface/5 flex items-center justify-center mb-4">
          <Star className="w-8 h-8 text-on-surface/15" />
        </div>
        <p className="text-on-surface-variant font-medium">Aucun avis pour le moment</p>
        <p className="text-sm text-on-surface-muted mt-1 mb-4">Soyez le premier a donner votre avis !</p>
        <Button size="sm" onClick={onWriteReview}>
          <Star className="w-4 h-4" />
          Ecrire un avis
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Write review button */}
      <div className="flex justify-end">
        <Button size="sm" onClick={onWriteReview}>
          <Star className="w-4 h-4" />
          Ecrire un avis
        </Button>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-outline/50 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Average */}
          <div className="text-center">
            <p className="text-5xl font-bold text-on-surface">{reviews.averageRating.toFixed(1)}</p>
            <div className="flex items-center gap-0.5 justify-center mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.round(reviews.averageRating) ? "text-accent fill-accent" : "text-on-surface/10"
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-on-surface-muted mt-1">{reviews.totalRatings} avis</p>
          </div>

          {/* Distribution */}
          <div className="flex-1 w-full space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.ratingDistribution[String(star)] ?? 0;
              const pct = reviews.totalRatings > 0 ? (count / reviews.totalRatings) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-muted w-3 text-right">{star}</span>
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <div className="flex-1 h-2 bg-surface-dim rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-on-surface-muted w-6">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-3">
        {reviews.data.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="bg-white rounded-xl border border-outline/50 p-5">
      <div className="flex items-center gap-3 mb-3">
        {review.user.avatarUrl ? (
          <Image
            src={review.user.avatarUrl}
            alt=""
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">
              {review.user.firstName[0]}{review.user.lastName[0]}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-on-surface">
            {review.user.firstName} {review.user.lastName}
          </p>
          <p className="text-xs text-on-surface-muted">{formatDate(review.createdAt)}</p>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3.5 h-3.5",
                i < review.rating ? "text-accent fill-accent" : "text-on-surface/10"
              )}
            />
          ))}
        </div>
      </div>
      {review.comment && (
        <p className="text-sm text-on-surface-variant leading-relaxed">{review.comment}</p>
      )}
    </div>
  );
}
