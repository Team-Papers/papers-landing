import { BookX } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <BookX className="w-20 h-20 text-primary/30 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
        <p className="text-xl text-text-secondary mb-8">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/">
          <Button size="lg">Retour à l&apos;accueil</Button>
        </Link>
      </div>
    </section>
  );
}
