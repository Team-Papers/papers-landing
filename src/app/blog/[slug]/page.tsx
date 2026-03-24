"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, MessageCircle, Calendar, Loader2, Newspaper, Send, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { fetchArticleBySlug, fetchComments, toggleArticleLike, postComment, type Article, type Comment } from "@/lib/api";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    Promise.all([
      fetchArticleBySlug(slug),
      fetchComments(slug),
    ]).then(([art, cmts]) => {
      setArticle(art);
      if (art) {
        setLiked(!!art.isLiked);
        setLikeCount(art._count.likes);
        // Comments need articleId, but we fetched with slug - refetch with id
        if (art.id) {
          fetchComments(art.id).then(setComments);
        }
      }
      setComments(cmts);
      setLoading(false);
    });
  }, [slug]);

  async function handleLike() {
    if (!user || !article) {
      router.push(`/connexion?redirect=/blog/${slug}`);
      return;
    }
    setLiked(!liked);
    setLikeCount((c) => liked ? c - 1 : c + 1);
    await toggleArticleLike(article.id);
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !article || !newComment.trim()) return;
    setSubmitting(true);
    const result = await postComment(article.id, newComment.trim());
    if (result.success && result.data) {
      setComments((prev) => [result.data!, ...prev]);
      setNewComment("");
    }
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
        <Newspaper className="w-10 h-10 text-on-surface/20 mb-4" />
        <p className="text-on-surface-variant font-medium">Article introuvable</p>
        <Link href="/blog" className="text-sm text-primary hover:underline mt-2">Retour au blog</Link>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="relative pt-24 pb-8 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african opacity-30" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-6 cursor-pointer transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <FadeIn>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              <span>{article.author.firstName} {article.author.lastName}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface-dim py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cover */}
          {article.coverImageUrl && (
            <FadeIn>
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 shadow-lg">
                <Image src={article.coverImageUrl} alt="" fill className="object-cover" unoptimized />
              </div>
            </FadeIn>
          )}

          {/* Content */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-outline/50 p-6 sm:p-8 mb-6">
              <div className="prose prose-sm max-w-none text-on-surface-variant leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>
          </FadeIn>

          {/* Like bar */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border",
                liked
                  ? "bg-error/10 text-error border-error/20"
                  : "bg-white text-on-surface-variant border-outline/50 hover:border-error/30"
              )}
            >
              <Heart className={cn("w-4 h-4", liked && "fill-error")} />
              {likeCount}
            </button>
            <span className="flex items-center gap-1.5 text-sm text-on-surface-muted">
              <MessageCircle className="w-4 h-4" />
              {comments.length} commentaire{comments.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-2xl border border-outline/50 p-6">
            <h3 className="font-display font-bold text-on-surface mb-5">Commentaires</h3>

            {/* Comment form */}
            {user ? (
              <form onSubmit={handleComment} className="flex gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">{user.firstName[0]}</span>
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ecrire un commentaire..."
                    className="flex-1 px-4 py-2 rounded-xl border border-outline bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || submitting}
                    className="p-2.5 rounded-xl bg-primary text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-primary-dark transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 mb-6 rounded-xl bg-surface-dim">
                <p className="text-sm text-on-surface-muted">
                  <Link href={`/connexion?redirect=/blog/${slug}`} className="text-primary font-medium hover:underline">Connectez-vous</Link> pour commenter.
                </p>
              </div>
            )}

            {/* Comment list */}
            {comments.length === 0 ? (
              <p className="text-sm text-on-surface-muted text-center py-6">Aucun commentaire. Soyez le premier !</p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    {comment.user.avatarUrl ? (
                      <Image src={comment.user.avatarUrl} alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover flex-shrink-0" unoptimized />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">{comment.user.firstName[0]}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <p className="text-sm font-medium text-on-surface">{comment.user.firstName} {comment.user.lastName}</p>
                        <p className="text-xs text-on-surface-muted">{formatDate(comment.createdAt)}</p>
                      </div>
                      <p className="text-sm text-on-surface-variant mt-0.5">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
