import type { Book, Testimonial, Stat, Feature, Genre, FAQItem, TeamMember, NavLink } from "./types";

export const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Auteurs", href: "/auteurs" },
  { label: "Lecteurs", href: "/lecteurs" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const STATS: Stat[] = [
  { label: "Lecteurs", value: 1500, suffix: "+" },
  { label: "Auteurs actifs", value: 200, suffix: "+" },
  { label: "Livres publiés", value: 220, suffix: "+" },
  { label: "Revenus redistribués", value: 12, suffix: "M FCFA" },
];

export const FEATURES: Feature[] = [
  {
    icon: "Smartphone",
    title: "Lecture Mobile",
    description: "Lisez vos livres préférés sur votre smartphone, tablette ou ordinateur, où que vous soyez.",
  },
  {
    icon: "CreditCard",
    title: "Paiement Mobile",
    description: "Payez facilement avec MTN Mobile Money ou Orange Money. Simple, rapide et sécurisé.",
  },
  {
    icon: "WifiOff",
    title: "Lecture Hors-ligne",
    description: "Téléchargez vos livres et lisez-les même sans connexion internet.",
  },
  {
    icon: "PenTool",
    title: "Outils Auteur",
    description: "Éditeur intégré, statistiques de ventes, gestion de catalogue et communication avec vos lecteurs.",
  },
  {
    icon: "Shield",
    title: "DRM & Sécurité",
    description: "Protection avancée de vos œuvres contre le piratage et la copie non autorisée.",
  },
  {
    icon: "TrendingUp",
    title: "70% de Revenus",
    description: "Les auteurs conservent 70% des revenus de chaque vente. Le modèle le plus avantageux d'Afrique.",
  },
];

export const GENRES: Genre[] = [
  { name: "Romans", icon: "BookOpen", color: "#4285F4", count: 580 },
  { name: "Poésie", icon: "Feather", color: "#9C27B0", count: 230 },
  { name: "Nouvelles", icon: "FileText", color: "#FF9800", count: 340 },
  { name: "Essais", icon: "Lightbulb", color: "#4CAF50", count: 190 },
  { name: "BD & Manga", icon: "Image", color: "#E91E63", count: 120 },
  { name: "Jeunesse", icon: "Baby", color: "#00BCD4", count: 280 },
  { name: "Sci-Fi", icon: "Rocket", color: "#673AB7", count: 150 },
  { name: "Histoire", icon: "Landmark", color: "#795548", count: 200 },
];

export const BOOKS: Book[] = [
  {
    id: "1",
    title: "Le Soleil des Indépendances",
    author: "Amadou Kourouma",
    cover: "",
    genre: "Romans",
    price: 2500,
    rating: 4.8,
    synopsis: "Un classique de la littérature africaine qui explore les bouleversements post-coloniaux.",
  },
  {
    id: "2",
    title: "Sous la Clarté de la Lune",
    author: "Marie-Claire Dati",
    cover: "",
    genre: "Poésie",
    price: 1500,
    rating: 4.5,
    synopsis: "Un recueil de poèmes célébrant la beauté de l'Afrique et ses traditions.",
  },
  {
    id: "3",
    title: "L'Enfant de la Rivière",
    author: "Paul Essomba",
    cover: "",
    genre: "Jeunesse",
    price: 1000,
    rating: 4.7,
    synopsis: "L'aventure d'un jeune garçon qui découvre les secrets de sa rivière natale.",
    isFree: true,
  },
  {
    id: "4",
    title: "Destins Croisés à Douala",
    author: "Nathalie Fouda",
    cover: "",
    genre: "Romans",
    price: 3000,
    rating: 4.6,
    synopsis: "Trois destins se croisent dans la ville animée de Douala.",
  },
  {
    id: "5",
    title: "Code Savane",
    author: "Jean-Marc Nkolo",
    cover: "",
    genre: "Sci-Fi",
    price: 2000,
    rating: 4.4,
    synopsis: "Dans un futur proche, la technologie transforme la savane africaine.",
  },
  {
    id: "6",
    title: "Les Chroniques du Wouri",
    author: "Aminata Bello",
    cover: "",
    genre: "Histoire",
    price: 3500,
    rating: 4.9,
    synopsis: "L'histoire fascinante du fleuve Wouri et des peuples qui l'ont habité.",
  },
  {
    id: "7",
    title: "Rêves d'Encre",
    author: "Sandrine Mbarga",
    cover: "",
    genre: "Nouvelles",
    price: 1800,
    rating: 4.3,
    synopsis: "Dix nouvelles qui explorent les rêves et espoirs de la jeunesse camerounaise.",
  },
  {
    id: "8",
    title: "Réflexions Africaines",
    author: "Dr. Emmanuel Tchoua",
    cover: "",
    genre: "Essais",
    price: 4000,
    rating: 4.7,
    synopsis: "Une réflexion profonde sur l'avenir du continent africain.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sandrine M.",
    role: "Auteure de romans",
    avatar: "",
    content: "Papers a completement change ma vie d'ecrivaine. Avant, publier un livre au Cameroun etait un parcours du combattant : trouver un editeur, negocier les droits, attendre des mois... Avec Papers, j'ai publie mon premier roman en quelques clics et il est desormais accessible a des lecteurs dans toute l'Afrique. Le paiement via Mobile Money a ete un vrai game changer — mes lecteurs peuvent acheter instantanement, et moi je recois 70% des revenus chaque mois. C'est la plateforme que tous les auteurs africains attendaient.",
    rating: 5,
  },
  {
    id: "2",
    name: "Jean-Paul K.",
    role: "Lecteur passionne, Abidjan",
    avatar: "",
    content: "Depuis la Cote d'Ivoire, j'ai enfin acces a des livres d'auteurs africains sans passer par Amazon ou des librairies importees. Je paie avec Orange Money, je telecharge mes livres et je lis meme quand je n'ai pas de connexion internet. Papers a rendu la lecture accessible a tous les Africains.",
    rating: 5,
  },
  {
    id: "3",
    name: "Dr. Amina B.",
    role: "Enseignante & Auteure, Douala",
    avatar: "",
    content: "En tant qu'enseignante, je recommande Papers a tous mes etudiants. La diversite du catalogue est impressionnante et les prix en FCFA sont abordables. 70% des revenus pour les auteurs, c'est une revolution dans l'edition africaine !",
    rating: 5,
  },
  {
    id: "4",
    name: "Patrick N.",
    role: "Editeur independant, Dakar",
    avatar: "",
    content: "Nous avons migre tout notre catalogue sur Papers et les resultats sont remarquables. Nos ventes ont augmente de 40% grace a la facilite du paiement mobile. C'est la meilleure plateforme d'edition numerique en Afrique francophone, sans hesiter.",
    rating: 5,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Comment puis-je acheter un livre sur Papers ?",
    answer: "C'est très simple ! Créez un compte, parcourez le catalogue, sélectionnez un livre et payez via MTN Mobile Money ou Orange Money. Le livre sera immédiatement disponible dans votre bibliothèque.",
  },
  {
    question: "Puis-je lire mes livres hors-ligne ?",
    answer: "Oui ! Une fois un livre téléchargé dans l'application, vous pouvez le lire sans connexion internet. Votre progression de lecture sera synchronisée dès que vous serez reconnecté.",
  },
  {
    question: "Comment devenir auteur sur Papers ?",
    answer: "Inscrivez-vous en tant qu'auteur, complétez votre profil, puis utilisez nos outils pour télécharger et publier vos œuvres. Notre équipe validera votre contenu sous 48h.",
  },
  {
    question: "Quel pourcentage des revenus revient à l'auteur ?",
    answer: "Les auteurs conservent 70% des revenus de chaque vente. C'est le modèle le plus avantageux pour les auteurs en Afrique. Les paiements sont effectués mensuellement via Mobile Money.",
  },
  {
    question: "Quels formats de livres sont acceptés ?",
    answer: "Papers accepte les formats EPUB et PDF. Nous recommandons le format EPUB pour une meilleure expérience de lecture adaptative sur tous les appareils.",
  },
  {
    question: "L'application est-elle gratuite ?",
    answer: "Oui, l'application Papers est entièrement gratuite à télécharger et à utiliser. Vous ne payez que pour les livres que vous achetez. De nombreux livres gratuits sont également disponibles.",
  },
  {
    question: "Comment fonctionne la protection des droits d'auteur ?",
    answer: "Papers utilise un système de DRM (Digital Rights Management) pour protéger vos œuvres contre la copie non autorisée. Chaque livre est lié au compte de l'acheteur.",
  },
  {
    question: "Puis-je publier dans plusieurs langues ?",
    answer: "Absolument ! Papers supporte la publication en français, anglais et dans les langues locales camerounaises. Nous encourageons la diversité linguistique.",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Seed Soft Engine",
    role: "Fondateur & CEO",
    avatar: "",
    bio: "Studio de développement logiciel camerounais, passionné par la technologie au service de la culture africaine.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Créez votre compte",
    description: "Inscrivez-vous gratuitement en quelques secondes avec votre numéro de téléphone.",
    icon: "UserPlus",
  },
  {
    step: 2,
    title: "Explorez le catalogue",
    description: "Parcourez des milliers de livres d'auteurs camerounais et africains.",
    icon: "Search",
  },
  {
    step: 3,
    title: "Lisez & Profitez",
    description: "Achetez via Mobile Money et lisez instantanément sur tous vos appareils.",
    icon: "BookOpen",
  },
];

export const SITE_CONFIG = {
  name: "Papers",
  tagline: "Livres et Histoires",
  description: "Plateforme camerounaise de publication et lecture de livres numériques avec paiement mobile.",
  url: "https://papers237.duckdns.org",
  company: "Seed Soft Engine",
  email: "papersbooks237@gmail.com",
  phone: "+237 6XX XXX XXX",
  address: "Yaounde, Cameroun",
  social: {
    facebook: "https://facebook.com/papers.cm",
    twitter: "https://twitter.com/papers_cm",
    instagram: "https://instagram.com/papers.cm",
    linkedin: "https://linkedin.com/company/papers-cm",
  },
};
