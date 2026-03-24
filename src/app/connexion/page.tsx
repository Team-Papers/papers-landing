"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

export default function ConnexionPage() {
  return (
    <Suspense>
      <ConnexionContent />
    </Suspense>
  );
}

function ConnexionContent() {
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/catalogue";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      router.push(redirectTo);
    } else {
      setError(result.message || "Erreur de connexion");
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    const result = await loginWithGoogle();
    if (result.success) {
      router.push(redirectTo);
    } else {
      setError(result.message || "Erreur avec Google");
    }
    setGoogleLoading(false);
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-surface-dim">
      <div className="max-w-md mx-auto px-4 sm:px-6 w-full py-12">
        <FadeIn>
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Image src="/images/logo-light.png" alt="Papers" width={40} height={40} className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold font-display text-on-surface">
                Papers<span className="text-primary">.</span>
              </span>
            </Link>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-2">
              Bon retour !
            </h1>
            <p className="text-on-surface-muted text-sm">
              Connectez-vous pour acceder a votre bibliotheque
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-outline/50 shadow-sm p-6 sm:p-8">
            {/* Google button */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-outline bg-white text-on-surface font-medium text-sm hover:bg-surface-dim transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continuer avec Google
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-outline/50" />
              <span className="text-xs text-on-surface-muted">ou</span>
              <div className="flex-1 h-px bg-outline/50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-error-light text-error text-sm rounded-xl px-4 py-3 font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-muted pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-outline bg-white text-on-surface placeholder:text-on-surface-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-muted pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-outline bg-white text-on-surface placeholder:text-on-surface-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-muted hover:text-on-surface cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading || googleLoading}>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-on-surface-muted mt-6">
            Pas encore de compte ?{" "}
            <Link href={redirectTo !== "/catalogue" ? `/inscription?redirect=${redirectTo}` : "/inscription"} className="text-primary font-semibold hover:underline">
              Creer un compte
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
