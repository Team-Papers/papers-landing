import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: `Conditions générales d'utilisation de la plateforme ${SITE_CONFIG.name}.`,
};

export default function CGUPage() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
          Conditions Générales d&apos;Utilisation
        </h1>
        <p className="text-text-muted text-sm mb-8">Dernière mise à jour : Janvier 2026</p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">1. Objet</h2>
        <p className="text-text-secondary mb-4">
          Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;utilisation
          de la plateforme {SITE_CONFIG.name}, éditée par {SITE_CONFIG.company}, permettant
          la publication et la lecture de livres numériques.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">2. Inscription</h2>
        <p className="text-text-secondary mb-4">
          L&apos;inscription sur la plateforme est gratuite. L&apos;utilisateur s&apos;engage à fournir
          des informations exactes et à jour. Chaque utilisateur est responsable de la
          confidentialité de ses identifiants de connexion.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">3. Services</h2>
        <p className="text-text-secondary mb-4">
          {SITE_CONFIG.name} propose un service de publication et de vente de livres
          numériques. Les auteurs peuvent publier leurs œuvres et fixer leurs prix.
          Les lecteurs peuvent acheter et télécharger des livres.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">4. Paiement</h2>
        <p className="text-text-secondary mb-4">
          Les paiements sont effectués via Mobile Money (MTN Mobile Money et Orange Money).
          Les auteurs reçoivent 70% du prix de vente. Les paiements aux auteurs sont
          effectués mensuellement.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">5. Propriété intellectuelle</h2>
        <p className="text-text-secondary mb-4">
          Les auteurs conservent l&apos;intégralité de leurs droits d&apos;auteur. En publiant
          sur {SITE_CONFIG.name}, l&apos;auteur accorde une licence non exclusive de distribution
          numérique. Toute reproduction non autorisée est interdite.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">6. Responsabilité</h2>
        <p className="text-text-secondary mb-4">
          {SITE_CONFIG.company} s&apos;engage à assurer la disponibilité de la plateforme
          mais ne peut garantir un fonctionnement ininterrompu. Les auteurs sont
          responsables du contenu qu&apos;ils publient.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">7. Contact</h2>
        <p className="text-text-secondary mb-4">
          Pour toute question relative aux présentes CGU, contactez-nous à {SITE_CONFIG.email}.
        </p>
      </div>
    </section>
  );
}
