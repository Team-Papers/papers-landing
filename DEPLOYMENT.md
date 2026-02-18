# Déploiement — Papers Landing Page

## Infrastructure

| Élément | Détail |
|---------|--------|
| **Serveur** | VPS Contabo (Ubuntu) — `84.247.183.206` |
| **URL de production** | https://papers237.duckdns.org |
| **Port interne** | `3020` |
| **Technologie** | Next.js 15 (standalone) + PM2 |
| **SSL** | Let's Encrypt (Certbot, renouvellement automatique) |
| **Reverse proxy** | Nginx |
| **Répertoire sur le VPS** | `/home/softengine/papers-landing` |

## Architecture

```
papers-landing/
├── .next/
│   └── standalone/        # Build Next.js standalone (serveur Node.js autonome)
│       ├── server.js      # Point d'entrée (géré par PM2)
│       ├── .next/static/  # Assets statiques (copiés après build)
│       └── public/        # Fichiers publics (logos, images)
├── src/                   # Code source
├── next.config.ts         # output: "standalone"
└── package.json
```

## Process Manager (PM2)

```bash
# Nom du process : papers-landing
# Port : 3020
pm2 list                    # Voir le statut
pm2 logs papers-landing     # Voir les logs
pm2 restart papers-landing  # Redémarrer
```

## Configuration Nginx

Fichier : `/etc/nginx/sites-enabled/papers-landing`

```nginx
server {
    server_name papers237.duckdns.org;

    location / {
        proxy_pass http://127.0.0.1:3020;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # SSL géré par Certbot
}
```

## CI/CD (GitHub Actions)

**Déclencheur** : Push sur la branche `main`

**Workflow** : `.github/workflows/deploy.yml`

```
Push main → SSH vers VPS → git pull → npm ci → npm run build → copier static + public → pm2 restart
```

### Secrets GitHub requis

| Secret | Valeur |
|--------|--------|
| `VPS_HOST` | `84.247.183.206` |
| `VPS_USER` | `softengine` |
| `VPS_PASSWORD` | *(mot de passe SSH)* |

## Déploiement manuel

```bash
ssh softengine@84.247.183.206
source ~/.nvm/nvm.sh
cd /home/softengine/papers-landing
git pull origin main
npm ci
npm run build
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/
pm2 restart papers-landing
```

## Vérification

```bash
# Accès direct
curl https://papers237.duckdns.org

# Statut PM2
pm2 status papers-landing

# Logs
pm2 logs papers-landing --lines 50
```

## Pages disponibles

| Page | URL |
|------|-----|
| Accueil | https://papers237.duckdns.org |
| Catalogue | https://papers237.duckdns.org/catalogue |
| Pour les Auteurs | https://papers237.duckdns.org/auteurs |
| Pour les Lecteurs | https://papers237.duckdns.org/lecteurs |
| À Propos | https://papers237.duckdns.org/a-propos |
| Contact | https://papers237.duckdns.org/contact |
| FAQ | https://papers237.duckdns.org/faq |
| CGU | https://papers237.duckdns.org/cgu |
| Confidentialité | https://papers237.duckdns.org/confidentialite |
