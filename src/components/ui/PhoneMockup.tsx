"use client";

import { Home, Grid3X3, BookMarked, User, Search } from "lucide-react";
import Image from "next/image";
import type { ApiBook } from "@/lib/api";

interface PhoneMockupProps {
  books: ApiBook[];
}

const navItems = [
  { icon: Home, label: "Accueil", active: true },
  { icon: Grid3X3, label: "Catalogue", active: false },
  { icon: BookMarked, label: "Biblio", active: false },
  { icon: User, label: "Profil", active: false },
];

export default function PhoneMockup({ books }: PhoneMockupProps) {
  const displayBooks = books.filter((b) => b.coverUrl).slice(0, 6);

  return (
    <div className="phone-mockup">
      <div className="relative w-full h-full bg-gradient-to-b from-[#0f1729] to-[#0a0f1c] overflow-hidden">
        {/* App header */}
        <div className="px-5 pt-10 pb-3 flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[10px]">Bienvenue sur</p>
            <p className="text-white font-display font-bold text-sm">Papers<span className="text-primary">.</span></p>
          </div>
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
            <Search className="w-3.5 h-3.5 text-white/50" />
          </div>
        </div>

        {/* Search bar */}
        <div className="px-5 mb-4">
          <div className="bg-white/[0.06] rounded-xl px-3 py-2 text-[10px] text-white/25 border border-white/[0.06]">
            Rechercher un livre...
          </div>
        </div>

        {/* Section label */}
        <div className="px-5 mb-3 flex items-center justify-between">
          <p className="text-white font-display font-semibold text-xs">Populaires</p>
          <p className="text-primary/60 text-[9px]">Voir tout</p>
        </div>

        {/* Book grid with real covers */}
        <div className="px-5 grid grid-cols-3 gap-2.5">
          {displayBooks.length > 0 ? (
            displayBooks.map((book) => (
              <div key={book.id} className="flex flex-col">
                <div className="aspect-[2/3] rounded-lg overflow-hidden mb-1.5 shadow-md bg-white/5">
                  <Image
                    src={book.coverUrl!}
                    alt={book.title}
                    width={80}
                    height={120}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <p className="text-white/60 text-[7px] truncate leading-tight">
                  {book.title}
                </p>
                <p className="text-primary/50 text-[6px] font-medium">
                  {book.price === 0 ? "Gratuit" : `${Number(book.price).toLocaleString("fr-FR")} FCFA`}
                </p>
              </div>
            ))
          ) : (
            Array.from({ length: 6 }).map((_, i) => {
              const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#F5A623", "#9B59B6"];
              return (
                <div key={i} className="flex flex-col">
                  <div
                    className="aspect-[2/3] rounded-lg mb-1.5 animate-pulse"
                    style={{ background: `linear-gradient(135deg, ${colors[i]}25, ${colors[i]}10)` }}
                  />
                  <div className="h-1.5 bg-white/10 rounded animate-pulse mb-1 w-4/5" />
                  <div className="h-1 bg-white/5 rounded animate-pulse w-3/5" />
                </div>
              );
            })
          )}
        </div>

        {/* Bottom nav with proper icons */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0a0f1c]/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-2 flex justify-around">
          {navItems.map(({ icon: Icon, label, active }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon className={`w-4 h-4 ${active ? "text-primary" : "text-white/20"}`} strokeWidth={active ? 2.5 : 1.5} />
              <span className={`text-[7px] ${active ? "text-primary" : "text-white/20"}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
