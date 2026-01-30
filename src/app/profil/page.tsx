"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { LogOut, Mail, ShieldCheck, User } from "lucide-react";

export default function ProfilPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/connexion");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-surface-alt">
      <Card hover={false} className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
            {initials}
          </div>
          <h1 className="text-xl font-bold text-text-primary">
            {user.firstName} {user.lastName}
          </h1>
          <Badge variant="default" className="mt-2">{user.role}</Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-text-muted" />
            <span className="text-text-secondary">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ShieldCheck className="w-4 h-4 text-text-muted" />
            <span className="text-text-secondary">
              Email {user.emailVerified ? "vérifié" : "non vérifié"}
            </span>
            {user.emailVerified ? (
              <Badge variant="success">Vérifié</Badge>
            ) : (
              <Badge variant="free">En attente</Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <User className="w-4 h-4 text-text-muted" />
            <span className="text-text-secondary">Rôle : {user.role}</span>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-8" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </Button>
      </Card>
    </section>
  );
}
