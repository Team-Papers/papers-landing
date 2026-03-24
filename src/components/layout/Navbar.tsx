"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X, LogIn, LogOut, User, PenTool, ExternalLink, Bell, Library, Newspaper, Layers, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { fetchUnreadCount } from "@/lib/api";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const PUBLIC_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Blog", href: "/blog" },
  { label: "Collections", href: "/collections" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const AUTH_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Blog", href: "/blog" },
  { label: "Bibliotheque", href: "/bibliotheque" },
  { label: "Collections", href: "/collections" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch unread notifications count
  useEffect(() => {
    if (!user) { setUnreadCount(0); return; }
    fetchUnreadCount().then(setUnreadCount);
    const interval = setInterval(() => fetchUnreadCount().then(setUnreadCount), 30000);
    return () => clearInterval(interval);
  }, [user]);

  const showDark = isHome && !scrolled;
  const navLinks = user ? AUTH_LINKS : PUBLIC_LINKS;

  function handleLogoutConfirm() {
    setShowLogoutModal(false);
    setMobileOpen(false);
    logout();
    router.push("/");
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-outline/50 shadow-sm"
            : isHome
              ? "bg-transparent"
              : "bg-white/80 backdrop-blur-xl border-b border-outline/50"
        )}
      >
        <nav className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300",
          scrolled ? "h-14" : "h-16"
        )}>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={showDark ? "/images/logo-dark.png" : "/images/logo-light.png"}
              alt="Papers"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
            <span className={cn(
              "text-xl font-bold font-display transition-colors",
              showDark ? "text-white" : "text-on-surface"
            )}>
              Papers<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  pathname === link.href
                    ? "text-primary"
                    : showDark
                      ? "text-white/80 hover:text-white"
                      : "text-on-surface-variant hover:text-primary"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <>
                    {/* Notifications bell */}
                    <Link
                      href="/notifications"
                      className={cn(
                        "relative p-2 rounded-xl transition-colors",
                        showDark ? "hover:bg-white/10" : "hover:bg-surface-dim"
                      )}
                    >
                      <Bell className={cn("w-5 h-5", showDark ? "text-white/80" : "text-on-surface-variant")} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center px-1">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </Link>
                    <UserMenu showDark={showDark} onLogout={() => setShowLogoutModal(true)} />
                  </>
                ) : (
                  <>
                    <Link href="/connexion">
                      <Button variant="ghost" size="sm" className={cn(
                        showDark ? "text-white/80 hover:text-white hover:bg-white/10" : ""
                      )}>
                        <LogIn className="w-4 h-4" />
                        Connexion
                      </Button>
                    </Link>
                    <Link href="/inscription">
                      <Button size="sm" className="bg-accent hover:bg-accent-700 text-white shadow-md">
                        S&apos;inscrire
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <button
            className={cn("md:hidden p-2 cursor-pointer", showDark ? "text-white" : "text-on-surface")}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-b border-outline overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-2 text-base font-medium",
                      pathname === link.href ? "text-primary" : "text-on-surface-variant"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 border-t border-outline space-y-2">
                  {!loading && (
                    <>
                      {user ? (
                        <>
                          <div className="flex items-center gap-3 py-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">
                                {user.firstName[0]}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-on-surface">{user.firstName} {user.lastName}</p>
                              <p className="text-xs text-on-surface-muted">{user.email}</p>
                            </div>
                            {unreadCount > 0 && (
                              <Link href="/notifications" onClick={() => setMobileOpen(false)} className="relative p-1">
                                <Bell className="w-5 h-5 text-on-surface-variant" />
                                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] rounded-full bg-error text-white text-[9px] font-bold flex items-center justify-center px-0.5">
                                  {unreadCount > 9 ? "9+" : unreadCount}
                                </span>
                              </Link>
                            )}
                          </div>
                          <Link href="/profil" onClick={() => setMobileOpen(false)}>
                            <Button variant="ghost" size="sm" className="w-full">
                              <User className="w-4 h-4" />
                              Mon profil
                            </Button>
                          </Link>
                          <Link href="/notifications" onClick={() => setMobileOpen(false)}>
                            <Button variant="ghost" size="sm" className="w-full">
                              <Bell className="w-4 h-4" />
                              Notifications
                              {unreadCount > 0 && <span className="ml-auto text-xs bg-error text-white rounded-full px-1.5 py-0.5">{unreadCount}</span>}
                            </Button>
                          </Link>
                          {user.role === "AUTHOR" && (
                            <a
                              href="https://author.papers237.duckdns.org"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMobileOpen(false)}
                            >
                              <Button variant="ghost" size="sm" className="w-full text-primary">
                                <PenTool className="w-4 h-4" />
                                Espace auteur
                                <ExternalLink className="w-3 h-3 opacity-50" />
                              </Button>
                            </a>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-error hover:bg-error-light"
                            onClick={() => setShowLogoutModal(true)}
                          >
                            <LogOut className="w-4 h-4" />
                            Se deconnecter
                          </Button>
                        </>
                      ) : (
                        <>
                          <Link href="/connexion" onClick={() => setMobileOpen(false)}>
                            <Button variant="outline" size="sm" className="w-full">
                              <LogIn className="w-4 h-4" />
                              Connexion
                            </Button>
                          </Link>
                          <Link href="/inscription" onClick={() => setMobileOpen(false)}>
                            <Button size="sm" className="w-full bg-accent hover:bg-accent-700 text-white">
                              S&apos;inscrire
                            </Button>
                          </Link>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Logout confirmation modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className="relative bg-white rounded-2xl shadow-2xl border border-outline/50 w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-7 h-7 text-error" />
                </div>
                <h3 className="font-display text-lg font-bold text-on-surface mb-2">
                  Se deconnecter ?
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Etes-vous sur de vouloir vous deconnecter de votre compte Papers ?
                </p>
              </div>
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-outline text-sm font-medium text-on-surface-variant hover:bg-surface-dim transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-error text-white text-sm font-medium hover:bg-error/90 transition-colors cursor-pointer shadow-sm"
                >
                  Se deconnecter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function UserMenu({ showDark, onLogout }: { showDark: boolean; onLogout: () => void }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors cursor-pointer",
          showDark ? "hover:bg-white/10" : "hover:bg-surface-dim"
        )}
      >
        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
          {user.avatarUrl ? (
            <Image src={user.avatarUrl} alt="" width={32} height={32} className="w-8 h-8 rounded-full object-cover" unoptimized />
          ) : (
            <span className="text-sm font-bold text-primary">{user.firstName[0]}</span>
          )}
        </div>
        <span className={cn(
          "text-sm font-medium",
          showDark ? "text-white" : "text-on-surface"
        )}>
          {user.firstName}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-outline/50 shadow-lg z-50 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-outline/50">
                <p className="text-sm font-medium text-on-surface">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-on-surface-muted truncate">{user.email}</p>
              </div>
              <div className="p-1.5 space-y-0.5">
                <Link href="/profil" onClick={() => setOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-dim rounded-lg transition-colors">
                  <User className="w-4 h-4" />
                  Mon profil
                </Link>
                <Link href="/bibliotheque" onClick={() => setOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-dim rounded-lg transition-colors">
                  <Library className="w-4 h-4" />
                  Bibliotheque
                </Link>
                <Link href="/notifications" onClick={() => setOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-dim rounded-lg transition-colors">
                  <Bell className="w-4 h-4" />
                  Notifications
                </Link>
                {user.role === "AUTHOR" && (
                  <a href="https://author.papers237.duckdns.org" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    <PenTool className="w-4 h-4" />
                    Espace auteur
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                )}
                <button
                  onClick={() => { setOpen(false); onLogout(); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-error hover:bg-error-light rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Se deconnecter
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
