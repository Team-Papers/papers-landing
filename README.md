# Papers — Landing Page

Site vitrine de la plateforme **Papers - Livres et Histoires**.
Plateforme camerounaise de publication et lecture de livres numeriques avec paiement mobile.

## Stack

- **Next.js 15** (App Router, standalone output)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion 11** (animations scroll + transitions)
- **Lucide React** (icones)
- **Firebase** (authentification Google + email)

## Liens

| Environnement | URL |
|---------------|-----|
| **Landing** | https://papers237.duckdns.org |
| **API** | https://api.papers237.duckdns.org/api/v1 |
| **Espace Auteur** | https://author.papers237.duckdns.org |
| **Google Play** | https://play.google.com/store/apps/details?id=com.seedsoftengine.papers |

## Developpement

```bash
# Installation
npm install

# Serveur de developpement
npm run dev

# Build de production
npm run build

# Demarrer le build
npm start
```

## Pages

| Page | Route | Auth |
|------|-------|------|
| Accueil | `/` | Non |
| Pour les Auteurs | `/auteurs` | Non |
| Pour les Lecteurs | `/lecteurs` | Non |
| A Propos | `/a-propos` | Non |
| Contact | `/contact` | Non |
| FAQ | `/faq` | Non |
| CGU | `/cgu` | Non |
| Confidentialite | `/confidentialite` | Non |
| Connexion | `/connexion` | Non (standalone) |
| Inscription | `/inscription` | Non (standalone) |
| Catalogue | `/catalogue` | Oui |
| Profil | `/profil` | Oui |

## Authentification

- **Email + mot de passe** : via l'API backend (`/auth/login`, `/auth/register`)
- **Google OAuth** : via Firebase Client SDK (`signInWithPopup`) puis validation backend (`/auth/google`)
- Session stockee en `localStorage` (`papers_user`, `papers_token`, `papers_refresh`)
- Pages auth (`/connexion`, `/inscription`) : layout standalone sans navbar/footer
- Navigation conditionnelle : Catalogue + Profil visibles uniquement quand connecte
- Bouton "Espace auteur" visible pour les utilisateurs avec `role === "AUTHOR"`

## Deploiement

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour les details d'hebergement et CI/CD.
