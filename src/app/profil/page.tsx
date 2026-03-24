"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Shield, ShieldCheck, BookOpen, Library, ChevronRight, BadgeCheck, Clock, Sparkles, PenTool, ExternalLink, ShoppingBag, Loader2, Heart, Newspaper, Layers, Bell } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { fetchPurchaseHistory, type PurchaseResponse } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function ProfilPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/connexion");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-dim">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center animate-pulse">
          <User className="w-5 h-5 text-primary" />
        </div>
      </div>
    );
  }

  const [purchases, setPurchases] = useState<PurchaseResponse[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(false);
  const [showPurchases, setShowPurchases] = useState(false);

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  const roleName = user.role === "AUTHOR" ? "Auteur & Lecteur" : "Lecteur";

  function handleShowPurchases() {
    if (showPurchases) { setShowPurchases(false); return; }
    setPurchasesLoading(true);
    setShowPurchases(true);
    fetchPurchaseHistory(1, 10).then(({ purchases: p }) => {
      setPurchases(p);
      setPurchasesLoading(false);
    });
  }

  return (
    <>
      {/* Hero with user identity */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-2xl shadow-black/20">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="font-display text-3xl font-bold text-white">{initials}</span>
                  )}
                </div>
                {user.emailVerified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-secondary flex items-center justify-center shadow-lg border-2 border-white/20">
                    <BadgeCheck className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-white/60 text-base mb-4">{user.email}</p>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                {roleName}
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-surface-dim">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Personal info card */}
            <FadeIn delay={0.05} className="md:col-span-2">
              <div className="bg-white rounded-2xl border border-outline/50 overflow-hidden">
                <div className="px-6 py-4 border-b border-outline/50 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-on-surface">Informations personnelles</h2>
                </div>
                <div className="p-6 space-y-5">
                  <InfoRow icon={User} label="Nom complet" value={`${user.firstName} ${user.lastName}`} />
                  <InfoRow icon={Mail} label="Adresse e-mail" value={user.email} />
                  <InfoRow
                    icon={user.emailVerified ? ShieldCheck : Shield}
                    label="Statut e-mail"
                    value={user.emailVerified ? "Verifie" : "Non verifie"}
                    valueClass={user.emailVerified ? "text-secondary" : "text-warning"}
                  />
                  <InfoRow icon={BadgeCheck} label="Role" value={roleName} />
                </div>
              </div>
            </FadeIn>

            {/* Purchase history */}
            <FadeIn delay={0.08} className="md:col-span-2">
              <div className="bg-white rounded-2xl border border-outline/50 overflow-hidden">
                <button
                  onClick={handleShowPurchases}
                  className="w-full px-6 py-4 border-b border-outline/50 flex items-center gap-3 hover:bg-surface-dim/50 transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                    <ShoppingBag className="w-4.5 h-4.5 text-accent-700" />
                  </div>
                  <h2 className="font-display font-bold text-on-surface flex-1 text-left">Historique d&apos;achats</h2>
                  <ChevronRight className={cn("w-4 h-4 text-on-surface-muted transition-transform", showPurchases && "rotate-90")} />
                </button>
                {showPurchases && (
                  <div className="p-6">
                    {purchasesLoading ? (
                      <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
                    ) : purchases.length === 0 ? (
                      <p className="text-sm text-on-surface-muted text-center py-6">Aucun achat pour le moment.</p>
                    ) : (
                      <div className="space-y-3">
                        {purchases.map((p) => (
                          <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface-dim">
                            <div className={cn(
                              "w-2 h-2 rounded-full flex-shrink-0",
                              p.status === "COMPLETED" ? "bg-secondary" : p.status === "FAILED" ? "bg-error" : "bg-accent"
                            )} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-on-surface truncate">Achat #{p.id.slice(0, 8)}</p>
                              <p className="text-xs text-on-surface-muted">
                                {new Date(p.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                                {" "}&middot;{" "}{p.paymentMethod}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-on-surface">{Number(p.amount).toLocaleString("fr-FR")} FCFA</p>
                              <p className={cn(
                                "text-xs font-medium",
                                p.status === "COMPLETED" ? "text-secondary" : p.status === "FAILED" ? "text-error" : "text-accent"
                              )}>
                                {p.status === "COMPLETED" ? "Reussi" : p.status === "FAILED" ? "Echoue" : "En cours"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Quick actions */}
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-outline/50 overflow-hidden">
                  <div className="px-6 py-4 border-b border-outline/50 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                      <BookOpen className="w-4.5 h-4.5 text-accent-700" />
                    </div>
                    <h2 className="font-display font-bold text-on-surface">Acces rapide</h2>
                  </div>
                  <div className="p-3">
                    <QuickLink href="/bibliotheque" icon={Library} label="Bibliotheque" desc="Vos livres achetes" />
                    <QuickLink href="/catalogue" icon={BookOpen} label="Catalogue" desc="Explorer les livres" />
                    <QuickLink href="/blog" icon={Newspaper} label="Blog" desc="Articles et actualites" />
                    <QuickLink href="/collections" icon={Layers} label="Collections" desc="Selections curatees" />
                    {user.role === "AUTHOR" && (
                      <a
                        href="https://author.papers237.duckdns.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/5 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <PenTool className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-primary">Espace auteur</p>
                          <p className="text-xs text-on-surface-muted">Dashboard & publications</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Author CTA or default CTA */}
                {user.role === "AUTHOR" ? (
                  <div className="bg-gradient-to-br from-primary to-primary-700 rounded-2xl p-6 text-white shadow-lg shadow-primary/25">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                        <PenTool className="w-4.5 h-4.5 text-white" />
                      </div>
                      <p className="font-display font-bold text-sm">Espace Auteur</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed mb-4">
                      Gerez vos publications, suivez vos ventes et vos revenus depuis votre dashboard auteur.
                    </p>
                    <a href="https://author.papers237.duckdns.org" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="w-full bg-white text-primary hover:bg-white/90">
                        <PenTool className="w-4 h-4" />
                        Ouvrir le dashboard
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Clock className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <p className="font-display font-bold text-on-surface text-sm">Compte Papers</p>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                      Gerez votre experience de lecture et decouvrez des livres d&apos;auteurs africains.
                    </p>
                    <Link href="/catalogue">
                      <Button size="sm" className="w-full">
                        <Library className="w-4 h-4" />
                        Voir le catalogue
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, label, value, valueClass }: { icon: typeof User; label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-surface-dim flex items-center justify-center shrink-0">
        <Icon className="w-4.5 h-4.5 text-on-surface-muted" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-on-surface-muted mb-0.5">{label}</p>
        <p className={cn("text-sm font-medium text-on-surface truncate", valueClass)}>{value}</p>
      </div>
    </div>
  );
}

function QuickLink({ href, icon: Icon, label, desc }: { href: string; icon: typeof User; label: string; desc: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-dim transition-colors group"
    >
      <div className="w-9 h-9 rounded-xl bg-surface-dim group-hover:bg-primary/10 flex items-center justify-center transition-colors shrink-0">
        <Icon className="w-4 h-4 text-on-surface-muted group-hover:text-primary transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-on-surface">{label}</p>
        <p className="text-xs text-on-surface-muted">{desc}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-on-surface-muted group-hover:text-primary transition-colors" />
    </Link>
  );
}
