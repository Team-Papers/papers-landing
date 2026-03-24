"use client";

import { useState, useEffect } from "react";
import { X, Smartphone } from "lucide-react";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.seedsoftengine.papers";
const DISMISS_KEY = "papers_banner_dismissed";

export default function SmartAppBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, "1");
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-white/95 backdrop-blur-xl border-t border-outline/50 shadow-lg">
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-on-surface">Papers - Livres et Histoires</p>
          <p className="text-xs text-on-surface-muted">Lisez vos livres sur l&apos;application mobile</p>
        </div>
        <a
          href={PLAYSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors flex-shrink-0"
        >
          Installer
        </a>
        <button onClick={dismiss} className="p-1.5 rounded-lg hover:bg-surface-dim cursor-pointer flex-shrink-0">
          <X className="w-4 h-4 text-on-surface-muted" />
        </button>
      </div>
    </div>
  );
}
