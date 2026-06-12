# Plan : Réécriture complète d'index.html

## Problème
- index.html n'a pas été modifié (toujours l'original basique)
- styles.css et script.js ont reçu +1700 lignes de features premium inutilisées
- Les autres pages HTML étaient buggées → revert effectué

## Actions à exécuter

### 1. Réécrire index.html
Structure complète avec toutes les features :

- **Loader** `#loader` avec spinner et texte "Chargement..."
- **Custom cursor** `.cursor-dot` + `.cursor-outline`
- **Nav glassmorphism** `#navbar` avec :
  - Logo `.nav-logo` "SIS"
  - `.nav-links` (7 liens)
  - `#theme-toggle` bouton dark/light mode
  - `.mobile-menu-btn` (3 spans hamburger)
  - `.nav-progress` barre de progression
- **Hero** `#hero` avec :
  - `<canvas id="hero-canvas">` pour Three.js
  - `.hero-overlay` gradient
  - Photo `.photo-frame` > `.photo-initials` "SIS" + `.photo-ring` x2
  - `.hero-badge` "Étudiant — Génie Logiciel"
  - `.hero-title` avec `.gradient-text`
  - `#typed-text` + `.typed-cursor` pour l'effet de typing
  - `.hero-badges` (3 badges)
  - `.hero-actions` (bouton + `.social-links-hero`)
  - `.scroll-indicator` avec `.mouse` > `.wheel`
- **About** `#about` avec :
  - `.section-label` + `.section-title`
  - `.about-grid` (texte + sidebar)
  - `.highlight-quote` avec citation admission Master CMSI
  - `.stats-grid` (4 `.stat-card[data-target]`)
  - `.info-card-sidebar` (localisation, email, etc.)
  - `.reveal` classes pour animations au scroll
- **Footer** avec :
  - `.footer-wave` SVG
  - `.footer-content` (nom + liens sociaux)
  - `.footer-bottom`
- **Back to top** `#back-to-top` avec SVG `.progress-ring`
- **Three.js CDN** : `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js">`

### 2. Nettoyer styles.css (optionnel)
Les +1300 lignes premium sont à la fin du fichier (ligne 2217+). Fonctionnel mais désorganisé.

### 3. Nettoyer script.js (optionnel)
3 listeners `DOMContentLoaded` distincts (lignes 2, 56, 108) + code modal hors écoute (ligne 68). Fonctionnel mais à fusionner pour la propreté.

## Dépendances
- Aucune modification des autres pages HTML (déjà revertées)
- styles.css et script.js inchangés (contiennent déjà tout le nécessaire)
