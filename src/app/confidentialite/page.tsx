import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: `Politique de confidentialité de la plateforme ${SITE_CONFIG.name}. Protection des données personnelles.`,
};

export default function ConfidentialitePage() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
          Politique de Confidentialité
        </h1>
        <p className="text-text-muted text-sm mb-8">Dernière mise à jour : Janvier 2026</p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">1. Collecte des données</h2>
        <p className="text-text-secondary mb-4">
          Nous collectons les données suivantes : nom, adresse email, numéro de téléphone,
          historique d&apos;achats et de lecture. Ces données sont nécessaires au fonctionnement
          du service.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">2. Utilisation des données</h2>
        <p className="text-text-secondary mb-4">
          Vos données sont utilisées pour : la gestion de votre compte, le traitement
          des paiements, l&apos;amélioration de nos services, les recommandations de lecture
          et la communication relative à votre compte.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">3. Protection des données</h2>
        <p className="text-text-secondary mb-4">
          Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles
          pour protéger vos données personnelles contre tout accès non autorisé,
          modification, divulgation ou destruction.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">4. Partage des données</h2>
        <p className="text-text-secondary mb-4">
          Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées
          avec nos partenaires de paiement (MTN, Orange) uniquement dans le cadre du
          traitement des transactions.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">5. Vos droits</h2>
        <p className="text-text-secondary mb-4">
          Conformément à la réglementation en vigueur, vous disposez des droits suivants :
          droit d&apos;accès, de rectification, de suppression, de portabilité de vos données.
          Pour exercer ces droits, contactez-nous à {SITE_CONFIG.email}.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">6. Cookies</h2>
        <p className="text-text-secondary mb-4">
          Notre plateforme utilise des cookies nécessaires au fonctionnement du service
          et des cookies analytiques pour améliorer l&apos;expérience utilisateur.
          Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">7. Contact</h2>
        <p className="text-text-secondary mb-4">
          Pour toute question relative à la protection de vos données, contactez notre
          responsable à {SITE_CONFIG.email}.
        </p>
      </div>
    </section>
  );
}
