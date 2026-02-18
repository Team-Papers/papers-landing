"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-light.png"
            alt="Papers"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold text-text-primary">
            Papers<span className="text-primary">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-primary"
                  : "text-text-secondary hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-border animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1.5 hover:bg-primary/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  {initials}
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {user.firstName}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-text-muted transition-transform", dropdownOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-border shadow-lg py-1 z-50"
                  >
                    <Link
                      href="/profil"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Mon profil
                    </Link>
                    <button
                      onClick={async () => {
                        setDropdownOpen(false);
                        await logout();
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-danger hover:bg-danger/5 transition-colors w-full cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link href="/connexion">
                <Button variant="ghost" size="sm">
                  Se connecter
                </Button>
              </Link>
              <Link href="/inscription">
                <Button size="sm">Commencer</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block py-2 text-base font-medium",
                    pathname === link.href
                      ? "text-primary"
                      : "text-text-secondary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border space-y-2">
                {user ? (
                  <>
                    <Link href="/profil" onClick={() => setMobileOpen(false)}>
                      <div className="flex items-center gap-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                          {initials}
                        </div>
                        <span className="text-sm font-medium text-text-primary">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={async () => {
                        setMobileOpen(false);
                        await logout();
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/connexion" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Se connecter
                      </Button>
                    </Link>
                    <Link href="/inscription" onClick={() => setMobileOpen(false)}>
                      <Button size="sm" className="w-full">
                        Commencer
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
