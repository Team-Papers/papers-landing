import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { Shield, Database, Eye, Lock, Share2, UserCheck, Cookie, RefreshCw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: `Politique de confidentialité de la plateforme ${SITE_CONFIG.name}. Protection des données personnelles.`,
};

const sections = [
  {
    icon: Database,
    title: "1. Collecte des Données",
    content: `Dans le cadre de l'utilisation de la plateforme ${SITE_CONFIG.name}, nous collectons les données personnelles suivantes :\n\n• Données d'identification : nom, prénom, adresse email, numéro de téléphone.\n• Données de connexion : adresse IP, type d'appareil, système d'exploitation, dates et heures de connexion.\n• Données transactionnelles : historique d'achats, méthode de paiement utilisée (MTN Mobile Money, Orange Money).\n• Données d'usage : historique de lecture, préférences, livres ajoutés aux favoris, progression de lecture.\n\nCes données sont collectées lors de votre inscription, de vos achats et de votre utilisation de l'application. Elles sont nécessaires à la fourniture et à l'amélioration de nos services.`,
  },
  {
    icon: Eye,
    title: "2. Utilisation des Données",
    content: `Vos données personnelles sont utilisées aux fins suivantes :\n\n• Gestion de votre compte utilisateur et authentification.\n• Traitement et suivi des transactions (achats, reversements aux auteurs).\n• Personnalisation de votre expérience : recommandations de lecture basées sur vos préférences.\n• Communication : notifications relatives à votre compte, nouveaux livres, promotions (avec votre consentement).\n• Amélioration de nos services : analyse statistique anonymisée de l'utilisation de la plateforme.\n• Prévention de la fraude et sécurité de la plateforme.\n\nNous ne traitons jamais vos données à des fins autres que celles mentionnées ci-dessus sans votre consentement préalable.`,
  },
  {
    icon: Lock,
    title: "3. Protection des Données",
    content: `La sécurité de vos données est une priorité pour ${SITE_CONFIG.name}. Nous mettons en œuvre les mesures suivantes :\n\n• Chiffrement des données en transit (HTTPS/TLS) et au repos.\n• Accès restreint aux données personnelles, limité au personnel autorisé.\n• Sauvegardes régulières et sécurisées.\n• Surveillance continue des accès et des anomalies.\n• Mots de passe stockés sous forme de hash cryptographique irréversible.\n\nEn cas de violation de données, nous nous engageons à vous notifier dans les meilleurs délais conformément à la réglementation en vigueur.`,
  },
  {
    icon: Share2,
    title: "4. Partage des Données",
    content: `Vos données personnelles ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement dans les cas suivants :\n\n• Partenaires de paiement : MTN et Orange, exclusivement pour le traitement des transactions Mobile Money.\n• Hébergement : nos serveurs sont sécurisés et situés dans des centres de données conformes aux normes internationales.\n• Obligations légales : si la loi l'exige, nous pouvons être amenés à communiquer certaines données aux autorités compétentes.\n\nTout partage de données est encadré par des accords de confidentialité stricts avec nos partenaires.`,
  },
  {
    icon: UserCheck,
    title: "5. Vos Droits",
    content: `Conformément à la loi n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et à la cybercriminalité au Cameroun, et aux réglementations applicables, vous disposez des droits suivants :\n\n• Droit d'accès : obtenir une copie de vos données personnelles détenues par ${SITE_CONFIG.name}.\n• Droit de rectification : corriger des données inexactes ou incomplètes.\n• Droit de suppression : demander la suppression de votre compte et de vos données.\n• Droit d'opposition : vous opposer au traitement de vos données à des fins de prospection.\n• Droit à la portabilité : recevoir vos données dans un format structuré et lisible.\n\nPour exercer ces droits, contactez-nous à ${SITE_CONFIG.email}. Nous traiterons votre demande dans un délai maximum de 30 jours.`,
  },
  {
    icon: Cookie,
    title: "6. Cookies et Traceurs",
    content: `Notre plateforme utilise des cookies pour assurer son bon fonctionnement :\n\n• Cookies essentiels : nécessaires au fonctionnement de la plateforme (authentification, session, préférences de langue). Ces cookies ne peuvent pas être désactivés.\n• Cookies analytiques : nous aident à comprendre comment vous utilisez la plateforme afin de l'améliorer. Ces cookies sont anonymisés.\n\nNous n'utilisons pas de cookies publicitaires ni de traceurs tiers à des fins de ciblage. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.`,
  },
  {
    icon: RefreshCw,
    title: "7. Durée de Conservation",
    content: `Vos données personnelles sont conservées pendant la durée de votre utilisation de la plateforme, et au maximum :\n\n• Données de compte : pendant toute la durée de l'inscription, puis 3 ans après la dernière activité.\n• Données transactionnelles : 5 ans à compter de la transaction, conformément aux obligations comptables.\n• Données de connexion : 12 mois.\n\nÀ l'expiration de ces durées, vos données sont supprimées ou anonymisées de manière irréversible.`,
  },
  {
    icon: Mail,
    title: "8. Contact",
    content: `Pour toute question relative à la protection de vos données personnelles ou pour exercer vos droits, contactez notre responsable de la protection des données :\n\n• Email : ${SITE_CONFIG.email}\n• Adresse : ${SITE_CONFIG.address}\n\nNous nous engageons à répondre à toute demande dans un délai de 48 heures ouvrées.`,
  },
];

export default function ConfidentialitePage() {
  return (
    <section className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-5">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-on-surface-muted text-sm">
            Dernière mise à jour : Mars 2026
          </p>
        </div>

        {/* Intro */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-10">
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Chez {SITE_CONFIG.name}, la protection de vos données personnelles est une priorité.
            Cette politique décrit comment nous collectons, utilisons et protégeons vos informations.
            Pour toute question, contactez-nous à{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary font-medium hover:underline">
              {SITE_CONFIG.email}
            </a>.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map(({ icon: Icon, title, content }) => (
            <article key={title} className="group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-xl font-bold text-on-surface mb-3">
                    {title}
                  </h2>
                  <div className="text-on-surface-variant text-[15px] leading-relaxed whitespace-pre-line">
                    {content}
                  </div>
                </div>
              </div>
              <div className="mt-6 border-b border-outline/50" />
            </article>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-on-surface-muted">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.company}. Tous droits réservés.
          </p>
        </div>
      </div>
    </section>
  );
}
