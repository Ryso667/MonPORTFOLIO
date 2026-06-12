# Design Corporate — Ajustements

## Objectif
Rendre l'impression première plus neutre et professionnelle pour les environnements corporate/institutionnels (Université Montpellier DSI, INETUM, CDC HABITAT, La Poste, ENEDIS, Orange).

## Changements

### 1. script.js — Forcer light mode par défaut
**Lignes 82-86** : Supprimer `prefers-color-scheme: dark`
- Si localStorage a un thème → l'appliquer
- Sinon → light mode (le HTML a déjà `data-theme="light"`)
- Résultat : la page arrive toujours en fond blanc au premier chargement

### 2. script.js — Three.js plus subtil
**Lignes 197-203** (sphère extérieure) :
- `size: 0.25` → `0.18` (particules plus petites)
- `color: '#686de0'` → `'#8890e0'` (couleur plus pâle)
- `opacity: 0.7` → `0.35` (beaucoup plus transparent)
- Supprimer `blending: THREE.AdditiveBlending` (pas de glow)

**Lignes 220-226** (sphère intérieure) :
- `size: 0.15` → `0.12`
- `color: '#7c7cff'` → `'#9999ff'`
- `opacity: 0.5` → `0.25`
- Supprimer `AdditiveBlending`

**Lignes 238-245** (animation) :
- Ralentir les rotations : `0.0015` → `0.0008`, `0.0005` → `0.0003`
- Ralentir la réaction à la souris : `0.008` → `0.005`, facteur `0.01` → `0.008`

### 3. styles.css — Curseur plus discret
**Lignes 2312-2323** :
- `.cursor-outline` : ajouter `opacity: 0.6`
- `.cursor-outline.hover` : ajouter règle avec `opacity: 0.9`
- `background` du contour : `0.08` → `0.04`
