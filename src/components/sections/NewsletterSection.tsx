"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Restez informé
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Recevez les nouveautés, recommandations et offres exclusives directement dans votre boîte mail.
          </p>

          {submitted ? (
            <div className="bg-secondary/10 text-secondary rounded-lg p-4 font-medium">
              Merci pour votre inscription !
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <Button type="submit">
                <Send className="w-4 h-4" />
                S&apos;inscrire
              </Button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
