"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-20">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>
        <h2 className="font-display text-xl font-bold text-on-surface mb-2">
          Une erreur est survenue
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Quelque chose s&apos;est mal passe. Veuillez reessayer.
        </p>
        <Button onClick={reset}>
          <RefreshCw className="w-4 h-4" />
          Reessayer
        </Button>
      </div>
    </div>
  );
}
