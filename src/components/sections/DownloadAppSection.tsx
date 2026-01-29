"use client";

import { Smartphone, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

export default function DownloadAppSection() {
  return (
    <section className="py-20 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Téléchargez l&apos;application Papers
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Accédez à votre bibliothèque partout, lisez hors-ligne, et recevez
              des recommandations personnalisées. Disponible sur Android et iOS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                <Download className="w-5 h-5" />
                Google Play
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-5 h-5" />
                App Store
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="flex justify-center">
              <div className="w-64 h-[500px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[3rem] border-4 border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-text-muted text-sm">Aperçu de l&apos;app</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
