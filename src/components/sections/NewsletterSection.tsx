"use client";

import { useState } from "react";
import { Send, Mail, CheckCircle } from "lucide-react";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-accent p-8 md:p-12">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10" />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Text */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-white/80" />
                  <span className="text-sm font-medium text-white/80">Newsletter</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  Restez informe
                </h2>
                <p className="text-white/80">
                  Recevez les nouveautes, recommandations et offres exclusives.
                </p>
              </div>

              {/* Right - Form */}
              <div>
                {submitted ? (
                  <div className="flex items-center gap-3 bg-white/20 backdrop-blur rounded-xl p-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                    <span className="text-white font-medium">Merci pour votre inscription !</span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-white/60 mb-3">Rejoignez 500+ lecteurs</p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="flex-1 px-4 py-3 rounded-xl bg-white text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <Button type="submit" className="bg-surface-dark text-white hover:bg-surface-dark-alt shrink-0">
                        <Send className="w-4 h-4" />
                        S&apos;inscrire
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
