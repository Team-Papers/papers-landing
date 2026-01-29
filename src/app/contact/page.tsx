"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { SITE_CONFIG } from "@/lib/constants";

const contactInfo = [
  { icon: Mail, label: "Email", value: SITE_CONFIG.email },
  { icon: Phone, label: "Téléphone", value: SITE_CONFIG.phone },
  { icon: MapPin, label: "Adresse", value: SITE_CONFIG.address },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">Contactez-nous</h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Une question, une suggestion ? N&apos;hésitez pas à nous écrire.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-6">
            {contactInfo.map((c) => (
              <FadeIn key={c.label}>
                <Card hover={false} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{c.label}</p>
                    <p className="font-medium text-text-primary">{c.value}</p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>

          <div className="md:col-span-2">
            <FadeIn>
              <Card hover={false}>
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">Message envoyé !</h3>
                    <p className="text-text-secondary">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">Nom</label>
                        <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                        <input required type="email" className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Sujet</label>
                      <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Message</label>
                      <textarea required rows={5} className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
                    </div>
                    <Button type="submit" size="lg">
                      <Send className="w-4 h-4" />
                      Envoyer
                    </Button>
                  </form>
                )}
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
