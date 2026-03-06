"use client";

import { useEffect, useState } from "react";
import { Wifi, BookOpen, Bell } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { fetchBooks, type ApiBook } from "@/lib/api";

const features = [
  { icon: BookOpen, text: "Acces a tout le catalogue" },
  { icon: Wifi, text: "Lecture hors-ligne" },
  { icon: Bell, text: "Recommandations personnalisees" },
];

export default function DownloadAppSection() {
  const [books, setBooks] = useState<ApiBook[]>([]);

  useEffect(() => {
    fetchBooks({ limit: 8 }).then((res) => setBooks(res.books));
  }, []);

  return (
    <section id="telecharger" className="py-24 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 pattern-african opacity-50" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Phone mockup */}
          <FadeIn direction="left">
            <div className="flex justify-center">
              <div className="animate-float-slow">
                <PhoneMockup books={books} />
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right">
            <span className="inline-block text-primary-200 text-sm font-semibold uppercase tracking-wider mb-3 bg-primary/20 px-3 py-1 rounded-full">
              Application mobile
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
              Votre bibliotheque dans{" "}
              <span className="text-accent-400">
                votre poche
              </span>
            </h2>
            <p className="text-lg text-primary-100/80 mb-8 leading-relaxed">
              Accedez a votre bibliotheque partout, lisez hors-ligne, et recevez
              des recommandations personnalisees. Disponible sur Android et bientot sur iOS.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center border border-primary/40">
                    <Icon className="w-5 h-5 text-primary-200" />
                  </div>
                  <span className="text-white font-medium">{text}</span>
                </li>
              ))}
            </ul>

            {/* Store badges */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.seedsoftengine.papers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-on-surface rounded-xl px-6 py-3.5 font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.394 13l2.304-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-on-surface-muted leading-none">Disponible sur</div>
                  <div className="text-base font-display font-bold leading-tight">Google Play</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-white/10 text-white border border-white/20 rounded-xl px-6 py-3.5 font-semibold transition-all hover:bg-white/15 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-white/50 leading-none">Bientot sur</div>
                  <div className="text-base font-display font-bold leading-tight">App Store</div>
                </div>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
