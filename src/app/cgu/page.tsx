import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { Scale, FileText, UserCheck, CreditCard, ShieldCheck, BookOpen, AlertTriangle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: `Conditions générales d'utilisation de la plateforme ${SITE_CONFIG.name}.`,
};

const sections = [
  {
    icon: FileText,
    title: "1. Objet",
    content: `Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») définissent les modalités et conditions d'utilisation de la plateforme ${SITE_CONFIG.name}, éditée par ${SITE_CONFIG.company}, société camerounaise spécialisée dans l'édition numérique. ${SITE_CONFIG.name} est une plateforme de publication, de distribution et de lecture de livres numériques (eBooks) accessible via l'application mobile et le site web. En accédant à la plateforme, l'utilisateur accepte sans réserve les présentes CGU.`,
  },
  {
    icon: UserCheck,
    title: "2. Inscription et Compte",
    content: `L'inscription sur la plateforme est gratuite et ouverte à toute personne physique âgée d'au moins 13 ans. L'utilisateur s'engage à fournir des informations exactes, complètes et à jour lors de son inscription. Chaque utilisateur est responsable de la confidentialité de ses identifiants de connexion (adresse email, mot de passe). En cas d'utilisation frauduleuse de son compte, l'utilisateur doit immédiatement en informer ${SITE_CONFIG.name}. La plateforme se réserve le droit de suspendre ou supprimer tout compte en cas de violation des présentes CGU.`,
  },
  {
    icon: BookOpen,
    title: "3. Services Proposés",
    content: `${SITE_CONFIG.name} propose les services suivants :\n\n• Publication de livres numériques : les auteurs peuvent soumettre, mettre en forme et publier leurs œuvres sur la plateforme. Chaque publication est soumise à une validation par l'équipe éditoriale sous 48 heures.\n\n• Achat et téléchargement : les lecteurs peuvent parcourir le catalogue, acheter des eBooks et les télécharger pour une lecture hors-ligne.\n\n• Lecture en ligne et hors-ligne : l'application mobile permet de lire les livres achetés avec ou sans connexion internet, avec synchronisation automatique de la progression.\n\n• Livres gratuits : certains ouvrages sont mis à disposition gratuitement par leurs auteurs.`,
  },
  {
    icon: CreditCard,
    title: "4. Paiement et Rémunération",
    content: `Les paiements sont effectués exclusivement via Mobile Money (MTN Mobile Money et Orange Money). Les prix sont affichés en Francs CFA (FCFA). Les auteurs fixent librement le prix de leurs œuvres et perçoivent 70% du prix de vente hors taxes. Les 30% restants couvrent les frais de la plateforme (hébergement, maintenance, paiement). Les reversements aux auteurs sont effectués mensuellement, sous réserve d'un seuil minimum de 5 000 FCFA. En cas de remboursement accordé à un lecteur, le montant correspondant est déduit des revenus de l'auteur. Aucun frais d'inscription ou d'abonnement n'est requis pour utiliser la plateforme.`,
  },
  {
    icon: ShieldCheck,
    title: "5. Propriété Intellectuelle",
    content: `Les auteurs conservent l'intégralité de leurs droits d'auteur sur les œuvres publiées via ${SITE_CONFIG.name}. En publiant sur la plateforme, l'auteur accorde à ${SITE_CONFIG.name} une licence non exclusive, révocable, de distribution numérique de son œuvre sur le territoire mondial. L'auteur garantit être le titulaire des droits sur l'œuvre publiée et dégage ${SITE_CONFIG.name} de toute responsabilité en cas de litige relatif aux droits d'auteur. Toute reproduction, copie ou redistribution non autorisée des contenus est strictement interdite. ${SITE_CONFIG.name} utilise un système de DRM (Digital Rights Management) pour protéger les œuvres contre la copie non autorisée.`,
  },
  {
    icon: AlertTriangle,
    title: "6. Responsabilité et Limitation",
    content: `${SITE_CONFIG.company} s'engage à assurer la disponibilité et le bon fonctionnement de la plateforme, mais ne peut garantir un service ininterrompu. La plateforme ne saurait être tenue responsable en cas de :\n\n• Interruption temporaire du service pour maintenance ou mise à jour.\n• Perte de données due à un cas de force majeure.\n• Contenu publié par les auteurs — chaque auteur est seul responsable du contenu de ses publications.\n\n${SITE_CONFIG.name} se réserve le droit de retirer tout contenu contraire aux lois en vigueur, à la morale ou aux présentes CGU, sans préavis ni indemnité.`,
  },
  {
    icon: Scale,
    title: "7. Droit Applicable et Litiges",
    content: `Les présentes CGU sont régies par le droit camerounais. En cas de litige relatif à l'interprétation ou l'exécution des présentes CGU, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire. À défaut d'accord amiable, les tribunaux compétents de Yaoundé seront seuls compétents.`,
  },
  {
    icon: Mail,
    title: "8. Contact",
    content: `Pour toute question relative aux présentes Conditions Générales d'Utilisation, vous pouvez nous contacter à l'adresse suivante : ${SITE_CONFIG.email}. Nous nous engageons à répondre dans un délai de 48 heures ouvrées.`,
  },
];

export default function CGUPage() {
  return (
    <section className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-5">
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-4">
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="text-on-surface-muted text-sm">
            Dernière mise à jour : Mars 2026
          </p>
        </div>

        {/* Intro */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-10">
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Bienvenue sur {SITE_CONFIG.name}. En utilisant notre plateforme, vous acceptez les présentes
            Conditions Générales d&apos;Utilisation. Nous vous invitons à les lire attentivement.
            Si vous avez des questions, n&apos;hésitez pas à nous contacter à{" "}
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
