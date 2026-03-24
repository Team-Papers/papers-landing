"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Loader2, BookOpen, Phone, CheckCircle2,
  XCircle, Clock, AlertTriangle, Smartphone,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useCache } from "@/lib/cache";
import { createPurchase, getPurchaseStatus, type ApiBookDetail } from "@/lib/api";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.seedsoftengine.papers";
const POLL_INTERVAL = 3000;
const POLL_TIMEOUT = 60000;

type PaymentState = "IDLE" | "PROCESSING" | "AWAITING_CONFIRMATION" | "COMPLETED" | "FAILED" | "TIMEOUT";
type PaymentMethod = "MTN" | "OM";

const FAILURE_MESSAGES: Record<string, string> = {
  INSUFFICIENT_FUNDS: "Solde insuffisant. Veuillez recharger votre compte et reessayer.",
  TIMEOUT: "Vous n'avez pas confirme le paiement a temps. Veuillez reessayer.",
  REFUSED: "L'operateur a refuse la transaction. Veuillez verifier votre compte.",
  OM_MP_PAY_FAILED: "L'operateur a refuse le paiement. Verifiez que votre compte Mobile Money est actif.",
  CANCELLED: "Vous avez annule le paiement.",
  PAYMENT_FAILED: "Le paiement a echoue. Veuillez reessayer.",
  INIT_ERROR: "Impossible d'initier le paiement. Veuillez reessayer dans quelques instants.",
};

function formatPrice(price: number) {
  return price === 0 ? "Gratuit" : `${Number(price).toLocaleString("fr-FR")} FCFA`;
}

export default function PaiementPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { getBookDetail } = useCache();

  const [book, setBook] = useState<ApiBookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentState, setPaymentState] = useState<PaymentState>("IDLE");
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const pollingRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`/connexion?redirect=/catalogue/${id}/paiement`);
    }
  }, [user, authLoading, router, id]);

  // Load book
  useEffect(() => {
    if (!id) return;
    getBookDetail(id).then((data) => {
      setBook(data);
      setLoading(false);
    });
  }, [id, getBookDetail]);

  // Cleanup polling
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startPolling = useCallback((pId: string) => {
    setPaymentState("AWAITING_CONFIRMATION");

    // Timeout after 60s
    timeoutRef.current = setTimeout(() => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      setPaymentState("TIMEOUT");
    }, POLL_TIMEOUT);

    pollingRef.current = setInterval(async () => {
      const status = await getPurchaseStatus(pId);
      if (!status) return;

      if (status.status === "COMPLETED") {
        if (pollingRef.current) clearInterval(pollingRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setPaymentState("COMPLETED");
      } else if (status.status === "FAILED") {
        if (pollingRef.current) clearInterval(pollingRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setPaymentState("FAILED");
        setErrorMessage(
          FAILURE_MESSAGES[status.failureCode || ""] || status.failureMessage || "Le paiement a echoue."
        );
      }
    }, POLL_INTERVAL);
  }, []);

  async function handlePay() {
    if (!paymentMethod || !phoneNumber || !id) return;
    setPaymentState("PROCESSING");
    setErrorMessage("");

    const result = await createPurchase(id, paymentMethod, phoneNumber);

    if (!result.success) {
      setPaymentState("FAILED");
      setErrorMessage(result.message || "Erreur lors du paiement");
      return;
    }

    const purchase = result.data!;
    setPurchaseId(purchase.id);

    if (purchase.status === "COMPLETED") {
      setPaymentState("COMPLETED");
    } else if (purchase.status === "FAILED") {
      setPaymentState("FAILED");
      setErrorMessage(FAILURE_MESSAGES[purchase.failureCode || ""] || "Le paiement a echoue.");
    } else {
      startPolling(purchase.id);
    }
  }

  function handleRetry() {
    setPaymentState("IDLE");
    setErrorMessage("");
    setPurchaseId(null);
  }

  async function handleManualCheck() {
    if (!purchaseId) return;
    setPaymentState("PROCESSING");
    const status = await getPurchaseStatus(purchaseId);
    if (status?.status === "COMPLETED") {
      setPaymentState("COMPLETED");
    } else if (status?.status === "FAILED") {
      setPaymentState("FAILED");
      setErrorMessage(FAILURE_MESSAGES[status.failureCode || ""] || "Le paiement a echoue.");
    } else {
      setPaymentState("TIMEOUT");
    }
  }

  if (loading || authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
        <BookOpen className="w-10 h-10 text-on-surface/20 mb-4" />
        <p className="text-on-surface-variant font-medium">Livre introuvable</p>
        <Link href="/catalogue" className="text-sm text-primary hover:underline mt-2">Retour au catalogue</Link>
      </div>
    );
  }

  // COMPLETED state
  if (paymentState === "COMPLETED") {
    return <SuccessView book={book} />;
  }

  const isFormValid = paymentMethod && phoneNumber.length >= 9;
  const isProcessing = paymentState === "PROCESSING" || paymentState === "AWAITING_CONFIRMATION";

  return (
    <section className="min-h-screen bg-surface-dim pt-24 pb-12">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary mb-6 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>

        <FadeIn>
          {/* Book summary */}
          <div className="bg-white rounded-2xl border border-outline/50 p-5 flex gap-4 items-center mb-6">
            <div className="relative w-16 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
              {book.coverUrl ? (
                <Image src={book.coverUrl} alt="" fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary/30" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-on-surface line-clamp-1">{book.title}</p>
              <p className="text-sm text-on-surface-muted">
                {book.author.penName || `${book.author.user.firstName} ${book.author.user.lastName}`}
              </p>
              <p className="text-lg font-bold text-primary mt-1">{formatPrice(book.price)}</p>
            </div>
          </div>

          {/* Payment form or status */}
          {paymentState === "IDLE" && (
            <PaymentForm
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              isFormValid={!!isFormValid}
              onPay={handlePay}
              price={book.price}
            />
          )}

          {isProcessing && (
            <ProcessingView paymentState={paymentState} paymentMethod={paymentMethod} />
          )}

          {paymentState === "FAILED" && (
            <FailedView message={errorMessage} onRetry={handleRetry} />
          )}

          {paymentState === "TIMEOUT" && (
            <TimeoutView onRetry={handleRetry} onManualCheck={handleManualCheck} />
          )}
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Payment Form ─── */
function PaymentForm({
  paymentMethod, setPaymentMethod, phoneNumber, setPhoneNumber,
  isFormValid, onPay, price,
}: {
  paymentMethod: PaymentMethod | null;
  setPaymentMethod: (m: PaymentMethod) => void;
  phoneNumber: string;
  setPhoneNumber: (v: string) => void;
  isFormValid: boolean;
  onPay: () => void;
  price: number;
}) {
  return (
    <div className="space-y-5">
      {/* Payment method */}
      <div className="bg-white rounded-2xl border border-outline/50 p-5">
        <h3 className="font-display font-bold text-on-surface mb-4">Moyen de paiement</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPaymentMethod("MTN")}
            className={cn(
              "p-4 rounded-xl border-2 transition-all cursor-pointer text-center",
              paymentMethod === "MTN"
                ? "border-[#FFC107] bg-[#FFC107]/5 shadow-sm"
                : "border-outline/50 hover:border-[#FFC107]/50"
            )}
          >
            <div className="w-12 h-12 rounded-full bg-[#FFC107] mx-auto mb-2 flex items-center justify-center">
              <span className="text-black font-bold text-xs">MTN</span>
            </div>
            <p className="text-sm font-medium text-on-surface">MTN MoMo</p>
            <p className="text-xs text-on-surface-muted">Mobile Money</p>
          </button>
          <button
            onClick={() => setPaymentMethod("OM")}
            className={cn(
              "p-4 rounded-xl border-2 transition-all cursor-pointer text-center",
              paymentMethod === "OM"
                ? "border-[#F16E00] bg-[#F16E00]/5 shadow-sm"
                : "border-outline/50 hover:border-[#F16E00]/50"
            )}
          >
            <div className="w-12 h-12 rounded-full bg-[#F16E00] mx-auto mb-2 flex items-center justify-center">
              <span className="text-white font-bold text-xs">OM</span>
            </div>
            <p className="text-sm font-medium text-on-surface">Orange Money</p>
            <p className="text-xs text-on-surface-muted">Mobile Money</p>
          </button>
        </div>
      </div>

      {/* Phone number */}
      <div className="bg-white rounded-2xl border border-outline/50 p-5">
        <h3 className="font-display font-bold text-on-surface mb-3">Numero de telephone</h3>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-muted pointer-events-none" />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9+]/g, ""))}
            placeholder="6XX XXX XXX"
            maxLength={15}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-outline bg-white text-on-surface placeholder:text-on-surface-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
          />
        </div>
        <p className="text-xs text-on-surface-muted mt-2">
          Entrez le numero associe a votre compte {paymentMethod === "MTN" ? "MTN MoMo" : paymentMethod === "OM" ? "Orange Money" : "Mobile Money"}
        </p>
      </div>

      {/* Pay button */}
      <Button
        size="lg"
        className="w-full bg-accent hover:bg-accent-700 text-white shadow-lg"
        disabled={!isFormValid}
        onClick={onPay}
      >
        Payer {formatPrice(price)}
      </Button>

      <p className="text-xs text-center text-on-surface-muted">
        Vous recevrez une demande de confirmation sur votre telephone.
      </p>
    </div>
  );
}

/* ─── Processing ─── */
function ProcessingView({ paymentState, paymentMethod }: { paymentState: PaymentState; paymentMethod: PaymentMethod | null }) {
  return (
    <div className="bg-white rounded-2xl border border-outline/50 p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
      <h3 className="font-display text-lg font-bold text-on-surface mb-2">
        {paymentState === "PROCESSING" ? "Initialisation..." : "En attente de confirmation"}
      </h3>
      <p className="text-sm text-on-surface-variant leading-relaxed">
        {paymentState === "AWAITING_CONFIRMATION"
          ? `Veuillez confirmer le paiement sur votre telephone ${paymentMethod === "MTN" ? "MTN" : "Orange"} en composant votre code PIN.`
          : "Connexion en cours avec l'operateur..."}
      </p>
      {paymentState === "AWAITING_CONFIRMATION" && (
        <div className="mt-4 p-3 rounded-xl bg-accent/5 border border-accent/20">
          <p className="text-xs text-accent font-medium flex items-center justify-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            Verifiez votre telephone
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Failed ─── */
function FailedView({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-outline/50 p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-5">
        <XCircle className="w-10 h-10 text-error" />
      </div>
      <h3 className="font-display text-lg font-bold text-on-surface mb-2">Paiement echoue</h3>
      <p className="text-sm text-on-surface-variant mb-6">{message}</p>
      <Button onClick={onRetry} className="w-full">
        Reessayer
      </Button>
    </div>
  );
}

/* ─── Timeout ─── */
function TimeoutView({ onRetry, onManualCheck }: { onRetry: () => void; onManualCheck: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-outline/50 p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
        <Clock className="w-10 h-10 text-accent" />
      </div>
      <h3 className="font-display text-lg font-bold text-on-surface mb-2">Delai depasse</h3>
      <p className="text-sm text-on-surface-variant mb-6">
        La confirmation prend plus de temps que prevu. Verifiez votre telephone ou reessayez.
      </p>
      <div className="space-y-3">
        <Button onClick={onManualCheck} className="w-full">
          Verifier le statut
        </Button>
        <Button onClick={onRetry} variant="outline" className="w-full">
          Reessayer
        </Button>
      </div>
    </div>
  );
}

/* ─── Success ─── */
function SuccessView({ book }: { book: ApiBookDetail }) {
  const deepLink = `intent://book/${book.id}#Intent;package=com.seedsoftengine.papers;scheme=papers;end`;
  const fallbackUrl = PLAYSTORE_URL;

  function handleOpenApp() {
    // Try deep link first, fallback to Play Store
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = deepLink;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
      window.location.href = fallbackUrl;
    }, 2000);
  }

  return (
    <section className="min-h-screen bg-surface-dim pt-24 pb-12 flex items-center">
      <div className="max-w-lg mx-auto px-4 sm:px-6 w-full">
        <FadeIn>
          <div className="bg-white rounded-2xl border border-outline/50 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="font-display text-xl font-bold text-on-surface mb-2">
              Achat reussi !
            </h3>
            <p className="text-sm text-on-surface-variant mb-2">
              <span className="font-medium text-on-surface">{book.title}</span> a ete ajoute a votre bibliotheque.
            </p>
            <p className="text-sm text-on-surface-muted mb-8">
              Pour lire ce livre, ouvrez l&apos;application Papers sur votre telephone.
            </p>

            {/* Book cover */}
            <div className="relative w-32 h-48 rounded-xl overflow-hidden shadow-lg mx-auto mb-8 border border-outline/30">
              {book.coverUrl ? (
                <Image src={book.coverUrl} alt="" fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary/30" />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent-700 text-white shadow-lg"
                onClick={handleOpenApp}
              >
                <Smartphone className="w-5 h-5" />
                Lire sur l&apos;application
              </Button>

              <a href={PLAYSTORE_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full mt-2">
                  Telecharger l&apos;application
                </Button>
              </a>

              <Link href="/catalogue">
                <Button variant="ghost" size="lg" className="w-full mt-1">
                  Continuer a explorer
                </Button>
              </Link>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-xs text-on-surface-muted flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-primary" />
                La lecture n&apos;est disponible que sur l&apos;application mobile Papers.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
