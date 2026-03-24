"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Loader2, CheckCheck, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { fetchNotifications, markNotificationRead, markAllNotificationsRead, type Notification } from "@/lib/api";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "A l'instant";
  if (mins < 60) return `Il y a ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Il y a ${days}j`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default function NotificationsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/connexion?redirect=/notifications");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    fetchNotifications(1, 50).then(({ notifications: n }) => {
      setNotifications(n);
      setLoading(false);
    });
  }, [user]);

  async function handleMarkAllRead() {
    await markAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  async function handleMarkRead(id: string) {
    await markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  }

  if (authLoading || !user) return null;

  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pattern-african" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-6 border border-white/10">
              <Bell className="w-4 h-4" />
              Notifications
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Vos notifications
            </h1>
            {unread > 0 && (
              <p className="text-white/70">{unread} non lue{unread > 1 ? "s" : ""}</p>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface-dim min-h-[50vh] py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Actions */}
          {notifications.length > 0 && unread > 0 && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline cursor-pointer"
              >
                <CheckCheck className="w-4 h-4" />
                Tout marquer comme lu
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-on-surface/5 flex items-center justify-center mb-4">
                <Bell className="w-10 h-10 text-on-surface/20" />
              </div>
              <p className="text-on-surface-variant font-medium">Aucune notification</p>
              <p className="text-sm text-on-surface-muted mt-1">Vous n&apos;avez aucune notification pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notif, i) => (
                <FadeIn key={notif.id} delay={i * 0.02}>
                  <div
                    onClick={() => !notif.isRead && handleMarkRead(notif.id)}
                    className={cn(
                      "bg-white rounded-xl border p-4 transition-all cursor-pointer",
                      notif.isRead
                        ? "border-outline/30 opacity-70"
                        : "border-primary/20 shadow-sm hover:shadow-md"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0",
                        notif.isRead ? "bg-on-surface/10" : "bg-primary"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-medium", notif.isRead ? "text-on-surface-variant" : "text-on-surface")}>
                          {notif.title}
                        </p>
                        <p className="text-sm text-on-surface-muted mt-0.5">{notif.message}</p>
                        <p className="text-xs text-on-surface-muted mt-1.5">{formatDate(notif.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
