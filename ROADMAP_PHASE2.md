# Phase 2 : Paiement + Redirection Mobile

## 1. Page de paiement (/catalogue/[id]/paiement)
- [x] Page protegee (redirect vers connexion si non connecte)
- [x] Resume du livre (cover + titre + prix)
- [x] Choix moyen de paiement (MTN Mobile Money / Orange Money)
- [x] Champ numero de telephone
- [x] Bouton "Payer X FCFA"
- [x] Appel API POST /purchases
- [x] Polling du statut (GET /purchases/:id/status, 3s interval, 60s timeout)
- [x] Etats visuels : IDLE, AWAITING_CONFIRMATION, COMPLETED, FAILED, TIMEOUT
- [x] Gestion des erreurs avec messages en francais

## 2. API client paiement
- [x] createPurchase(bookId, paymentMethod, phoneNumber)
- [x] getPurchaseStatus(purchaseId)
- [x] checkLibraryOwnership(bookId)

## 3. Page de succes + redirection mobile
- [x] Page de confirmation apres paiement valide
- [x] Bouton "Lire sur l'application" avec deep link (intent:// scheme)
- [x] Fallback Play Store si app non installee (timeout 2s)
- [x] Bouton "Telecharger l'application" (Play Store)
- [x] Bouton "Continuer a explorer" (retour catalogue)

## 4. Logique du bouton "Obtenir" affinee
- [x] Livre gratuit : verifier auth → page paiement
- [x] Livre payant + non connecte → redirect connexion avec ?redirect=
- [x] Livre payant + connecte → page paiement
- [x] Livre deja possede → bouton "Lire sur l'app" (deep link mobile)
- [x] Verification bibliotheque via API /library/:bookId

## Statut : TERMINE
