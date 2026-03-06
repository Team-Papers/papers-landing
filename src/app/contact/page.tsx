"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    desc: "Reponse sous 24h",
    href: `mailto:${SITE_CONFIG.email}`,
    iconBg: "bg-primary/15 text-primary",
  },
  {
    icon: Phone,
    label: "Telephone",
    value: SITE_CONFIG.phone,
    desc: "Lun-Ven, 9h-18h",
    href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
    iconBg: "bg-accent/15 text-accent-700",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: SITE_CONFIG.address,
    desc: "Cameroun",
    href: "#",
    iconBg: "bg-secondary/15 text-secondary",
  },
];

const faqQuick = [
  { q: "Comment publier un livre ?", a: "Creez un compte auteur, telechargez votre manuscrit et notre equipe le valide sous 48h." },
  { q: "Comment fonctionne le paiement ?", a: "Payez via MTN Mobile Money ou Orange Money. Les auteurs recoivent 70% des revenus chaque mois." },
  { q: "L'app est-elle gratuite ?", a: "Oui, l'application est gratuite. Vous ne payez que les livres que vous achetez." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-6 border border-white/10">
                <MessageSquare className="w-4 h-4" />
                Contact
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                Parlons{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-400">
                  ensemble
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Une question, une suggestion, un partenariat ? Notre equipe est la pour vous aider.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid md:grid-cols-3 gap-4">
              {contactInfo.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="bg-white rounded-2xl border border-outline/50 p-5 shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-3", c.iconBg)}>
                    <c.icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-on-surface-muted mb-0.5">{c.label}</p>
                  <p className="font-display font-bold text-on-surface text-sm mb-1 group-hover:text-primary transition-colors">{c.value}</p>
                  <p className="text-xs text-on-surface-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {c.desc}
                  </p>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Form + FAQ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <FadeIn className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-outline/50 overflow-hidden">
                <div className="px-6 py-4 border-b border-outline/50 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Send className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-on-surface">Envoyez-nous un message</h2>
                    <p className="text-xs text-on-surface-muted">Nous repondons generalement sous 24 heures</p>
                  </div>
                </div>

                <div className="p-6">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 className="w-8 h-8 text-secondary" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-on-surface mb-2">Message envoye !</h3>
                      <p className="text-on-surface-variant text-sm mb-6">
                        Merci pour votre message. Nous vous repondrons dans les plus brefs delais.
                      </p>
                      <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}>
                        Envoyer un autre message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-on-surface mb-1.5">Nom complet</label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Votre nom"
                            className="w-full px-4 py-3 rounded-xl border border-outline bg-white text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-on-surface mb-1.5">Email</label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="votre@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-outline bg-white text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-on-surface mb-1.5">Sujet</label>
                        <input
                          required
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="De quoi s'agit-il ?"
                          className="w-full px-4 py-3 rounded-xl border border-outline bg-white text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-on-surface mb-1.5">Message</label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Ecrivez votre message ici..."
                          className="w-full px-4 py-3 rounded-xl border border-outline bg-white text-on-surface placeholder:text-on-surface-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none text-sm"
                        />
                      </div>
                      <Button type="submit" size="lg">
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* FAQ rapide */}
            <FadeIn delay={0.1} className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1 rounded-full">
                    Questions frequentes
                  </span>
                  <h3 className="font-display text-xl font-bold text-on-surface mb-1">Reponses rapides</h3>
                  <p className="text-sm text-on-surface-variant">Les questions les plus posees par notre communaute.</p>
                </div>

                <div className="space-y-3">
                  {faqQuick.map((faq, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-outline/50 p-5">
                      <h4 className="font-display font-bold text-on-surface text-sm mb-2">{faq.q}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>

                {/* Aside card */}
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-display font-bold text-on-surface text-sm">Besoin d&apos;aide ?</p>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    Consultez notre FAQ complete pour trouver des reponses a toutes vos questions sur Papers.
                  </p>
                  <a href="/faq">
                    <Button variant="outline" size="sm" className="w-full">
                      Voir la FAQ
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 pattern-african opacity-50" />
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[120px]" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-6">
              <MessageSquare className="w-8 h-8 text-primary-200" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Rejoignez notre communaute
            </h2>
            <p className="text-primary-100/70 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Suivez-nous sur les reseaux sociaux pour rester informe des dernieres nouveautes
              et des evenements Papers.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {Object.entries(SITE_CONFIG.social).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-white/80 text-sm font-medium border border-white/10 hover:bg-white/20 hover:text-white transition-all capitalize"
                >
                  {name}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
