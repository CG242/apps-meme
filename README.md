# 🎭 Générateur de Mèmes - Next.js

Un générateur de mèmes moderne et simple, entièrement frontend, construit avec Next.js et React. Créez, personnalisez et sauvegardez vos mèmes directement dans votre navigateur.

## ✨ Fonctionnalités

### 📷 Upload d'Image
- Téléchargez des images depuis votre ordinateur
- Formats supportés : JPG, PNG
- Affichage instantané dans l'éditeur

### ✏️ Personnalisation de Texte
- **Texte du haut et du bas** : Ajoutez deux zones de texte indépendantes
- **Taille de police** : Ajustez la taille de chaque texte (20px à 80px)
- **Couleur du texte** : Choisissez la couleur de chaque texte avec un sélecteur de couleur
- **Position** : Texte automatiquement positionné en haut et en bas de l'image

### 👁️ Prévisualisation en Temps Réel
- Aperçu instantané de votre mème pendant l'édition
- Toutes les modifications sont reflétées immédiatement sur le canvas
- Rendu haute qualité avec HTML5 Canvas

### 🎨 Génération de Mème
- Rendu final avec HTML5 Canvas
- Export en PNG haute qualité
- Téléchargement direct sur votre ordinateur

### 📁 Galerie Locale
- Sauvegarde automatique dans le navigateur (localStorage)
- Stockage des mèmes en base64
- Visualisation de tous vos mèmes créés
- Actions disponibles :
  - Voir le mème en grand
  - Télécharger le mème
  - Supprimer le mème de la galerie

### 🎨 Interface Utilisateur
- Design moderne et épuré
- Interface responsive (desktop et mobile)
- Navigation intuitive entre les pages
- Expérience utilisateur fluide

## 🛠️ Technologies Utilisées

- **Next.js 14** : Framework React avec App Router
- **React 18** : Bibliothèque UI
- **HTML5 Canvas** : Rendu et manipulation d'images
- **localStorage** : Stockage local des mèmes
- **CSS Modules** : Styles modulaires et encapsulés

## 📋 Prérequis

- Node.js 18+ installé
- npm ou yarn

## 🚀 Installation

1. **Cloner ou télécharger le projet**

2. **Installer les dépendances** :
```bash
npm install
```

3. **Lancer le serveur de développement** :
```bash
npm run dev
```

4. **Ouvrir dans le navigateur** :
```
http://localhost:3000
```

## 📦 Déploiement

### Vercel

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement Next.js
3. Cliquez sur "Deploy"
4. Votre application sera déployée en quelques minutes

### Netlify

1. Connectez votre repository GitHub à Netlify
2. Configurez les paramètres de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `.next`
3. Cliquez sur "Deploy site"

**Note** : Aucune configuration serveur n'est nécessaire car l'application est entièrement frontend.

## 📁 Structure du Projet

```
meme-generator-nextjs/
├── app/
│   ├── layout.js              # Layout principal avec métadonnées
│   ├── page.js                # Page d'accueil (créateur de mèmes)
│   ├── gallery/
│   │   └── page.js            # Page galerie
│   └── globals.css            # Styles globaux
├── components/
│   ├── Navigation.js          # Composant de navigation
│   ├── MemeEditor.js          # Éditeur de mèmes principal
│   ├── MemeEditor.module.css  # Styles de l'éditeur
│   ├── Gallery.js             # Composant galerie
│   ├── Gallery.module.css     # Styles de la galerie
│   ├── MemeCard.js            # Carte individuelle de mème
│   └── MemeCard.module.css    # Styles des cartes
├── next.config.js             # Configuration Next.js
├── package.json               # Dépendances et scripts
└── README.md                  # Documentation
```

## 📝 Comment l'Application Fonctionne

### Architecture Frontend-Only

L'application fonctionne entièrement côté client :

1. **Upload d'Image** : Les images sont converties en DataURL (base64) et stockées dans l'état React
2. **Rendu Canvas** : HTML5 Canvas dessine l'image et les textes superposés
3. **Stockage Local** : Les mèmes générés sont sauvegardés dans `localStorage` du navigateur
4. **Galerie** : Les mèmes sont récupérés depuis `localStorage` et affichés dans une grille

### Flux de Données

```
Upload Image → State React → Canvas Rendering → Export PNG
                                      ↓
                              localStorage (sauvegarde)
                                      ↓
                              Gallery (affichage)
```

### Limitations du Stockage Local

- Les données sont stockées uniquement dans le navigateur de l'utilisateur
- La capacité de `localStorage` est limitée (~5-10MB selon le navigateur)
- Les données sont supprimées si l'utilisateur vide le cache du navigateur
- Les données ne sont pas synchronisées entre différents appareils/navigateurs

## 🎯 Pourquoi Frontend-Only ?

Cette application a été conçue comme une démonstration frontend pour plusieurs raisons :

1. **Simplicité** : Pas besoin de configurer un serveur ou une base de données
2. **Performance** : Traitement instantané côté client, pas de latence réseau
3. **Déploiement Facile** : Déploiement statique sur Vercel/Netlify sans configuration serveur
4. **Sécurité** : Pas de gestion de fichiers serveur, pas de risques de sécurité
5. **Coût** : Hébergement gratuit avec les services de déploiement statique

## 🔮 Améliorations Futures Possibles

### Backend et Base de Données
- **API REST** : Créer un backend Node.js/Express pour gérer les mèmes
- **Base de données** : Utiliser PostgreSQL ou MongoDB pour stocker les mèmes
- **Authentification** : Système de comptes utilisateurs (JWT, OAuth)
- **Stockage Cloud** : Utiliser AWS S3, Cloudinary ou Firebase Storage pour les images

### Fonctionnalités Avancées
- **Templates de Mèmes** : Bibliothèque de templates pré-définis
- **Partage Social** : Partage direct sur Twitter, Facebook, WhatsApp
- **Édition Avancée** : Filtres, effets, rotation, redimensionnement
- **Collaboration** : Permettre à plusieurs utilisateurs de collaborer sur un mème
- **Recherche** : Recherche dans la galerie par texte ou date
- **Catégories** : Organiser les mèmes par catégories/tags
- **Export Multiples** : Exporter plusieurs mèmes en une fois

### Améliorations UX
- **Drag & Drop** : Positionnement libre du texte par glisser-déposer
- **Historique** : Annuler/refaire les modifications
- **Prévisualisation Mobile** : Optimisation pour les appareils mobiles
- **Mode Sombre** : Thème sombre pour l'interface
- **Raccourcis Clavier** : Raccourcis pour actions rapides

### Performance
- **Lazy Loading** : Chargement paresseux des images dans la galerie
- **Compression** : Compression des images avant stockage
- **Cache** : Mise en cache intelligente des mèmes générés
- **PWA** : Transformer en Progressive Web App pour installation mobile

## 🐛 Résolution de Problèmes

### Les mèmes ne s'affichent pas dans la galerie
- Vérifiez que `localStorage` n'est pas désactivé dans votre navigateur
- Vérifiez la console du navigateur pour les erreurs JavaScript

### L'image ne s'affiche pas après upload
- Vérifiez que le format est bien JPG ou PNG
- Vérifiez la taille de l'image (les très grandes images peuvent causer des problèmes)

### Le canvas ne se met pas à jour
- Rafraîchissez la page
- Vérifiez que JavaScript est activé dans votre navigateur

## 📄 Licence

MIT

## 👨‍💻 Auteur

Projet créé pour un test d'admission scolaire.

---

**Note** : Ce projet privilégie la clarté, la simplicité et la lisibilité du code plutôt que la complexité. Le code est commenté et structuré pour faciliter la compréhension et les modifications futures.
