[README.md](https://github.com/user-attachments/files/27339686/README.md)
<div align="center">

<img src="icon-192.png" width="120" alt="KNIPO Kids logo"/>

# 🦁 KNIPO Kids

**Apprendre l'Afrique en s'amusant.**
Application éducative pour enfants — histoire, animaux, nature, maths, proverbes et géographie africaine.

[![Live App](https://img.shields.io/badge/▶_Tester_l'app-knipo.org-FF6D00?style=for-the-badge)](https://knipo.org)
[![PWA](https://img.shields.io/badge/PWA-Installable-1D9E75?style=for-the-badge&logo=pwa)](https://knipo.org)
[![Languages](https://img.shields.io/badge/🌍_3_langues-FR_EN_IT-534AB7?style=for-the-badge)](https://knipo.org)
[![Free](https://img.shields.io/badge/💸_Gratuit-Premium_4.99€-EF9F27?style=for-the-badge)](https://knipo.org)

</div>

---

## ✨ Pourquoi KNIPO Kids ?

Parce que l'Afrique a écrit une histoire extraordinaire, abrite la biodiversité la plus riche du monde, et porte une sagesse millénaire — mais les enfants n'apprennent presque rien de tout cela à l'école.

KNIPO Kids comble ce vide avec une expérience **ludique, bienveillante et fière de ses racines**, conçue pour que les enfants ouvrent l'app par plaisir, pas par obligation.

> *« Apprendre avec ses racines. »*

## 🎮 Ce que les enfants peuvent faire

### 📚 6 thèmes éducatifs
- **🏛️ Histoire** — Empires africains (Mali, Songhaï, Aksoum, Ghana, Bénin), figures légendaires (Mansa Musa, Reine Nzinga, Sundiata, Mandela, Sankara, Cheikh Anta Diop)
- **🌿 Nature** — Baobab, fleuves, déserts, forêts, écosystèmes
- **🔢 Maths** — Du comptage simple à la multiplication, en passant par les os d'Ishango
- **💬 Proverbes** — Sagesse africaine, philosophie Ubuntu, valeurs de partage
- **🦁 Animaux** — Lion, éléphant, girafe, gorille, guépard, okapi, lycaon…
- **🗺️ Géographie** — 54 pays, capitales, fleuves, montagnes, déserts

### 🧠 9 modes de jeu
| Mode | Description |
|------|-------------|
| **Quiz classique** | 4 réponses, timer, explications |
| **Mix Surprise** | Toutes catégories mélangées |
| **Défi du jour** | 5 questions + bonus +50 XP |
| **Puzzles** | Glisse les mots dans les phrases |
| **Memory Match** | Trouve les paires animal / nom |
| **Tap Rapide** | 30s pour briller, combos chronométrés |
| **Carte d'Afrique** | Voyage interactif sur le continent |
| **Prof IA** | Pose une question, l'app répond |
| **Mode 2 joueurs** | Famille / fratrie sur un même écran |

### 🎁 Récompenses qui motivent
- **XP & Niveaux** : 5 paliers d'évolution (Petit Lion → Grand Lion → Lion Fier → Roi Lion → Légende)
- **Album de cartes** : 32 cartes collectibles (rareté C/R/L) à débloquer
- **Coffres surprise** : toutes les 5 bonnes réponses
- **Badges** : un par thème maîtrisé
- **Streaks quotidiens** : viens chaque jour
- **Boutique mascotte** : 12 accessoires achetables avec XP (couronne, lunettes, diplôme…)
- **Boutique de fonds** : 12 skins dont 4 saisonniers automatiques (Noël, été, rentrée, printemps)

### ♿ Accessibilité pensée pour tous
- 🌍 **3 langues** : Français · English · Italiano
- 🎂 **3 niveaux d'âge** : 4-6 ans (mode calme, sans timer), 7-9 ans, 10+
- 🔊 **Narration vocale** intégrée pour les non-lecteurs
- 🎵 **Musique d'ambiance kora** activable/désactivable
- 📱 **PWA installable** sur iPhone, Android, Windows, Mac
- 📡 **Mode hors-ligne complet** une fois installée

## 🛡️ Espace Parents protégé

Un dashboard accessible via énigme adulte (multiplication 7×9) qui montre :
- Temps total joué, jours actifs, sessions
- XP gagnés, badges débloqués, cartes collectées
- Répartition des thèmes joués (graphique)
- Toggles : sons, musique d'ambiance
- Reset onboarding ou données complètes

## 👑 Premium (4,99 € à vie)

### Contenu exclusif (40 questions premium réelles)
- 👑 **Empires secrets** — Aksoum, Reine de Saba, Songhaï, Grand Zimbabwe, Bénin, Swahili, Ashanti
- 🌟 **Mythes africains** — Anansi, Unkulunkulu, Ogun, Mami Wata, Aido-Hwedo
- 🧮 **Maths avancées** — Multiplication, division, pourcentages, géométrie
- 🗣️ **Langues africaines** — Swahili, Wolof, Zoulou, Amharique, Berbère
- 🦸 **Héros africains** — Wangari Maathai, William Kamkwamba, Miriam Makeba, Christiaan Barnard, Eliud Kipchoge, Chinua Achebe, George Weah

### Plus
- 🤖 IA illimitée (à brancher côté serveur)
- 📈 Statistiques avancées dans l'espace parents
- ⚜️ Avatar premium et badges spéciaux

## 🚀 Installation

### Pour les utilisateurs
Visite **[knipo.org](https://knipo.org)** sur ton téléphone et clique sur **"Installer l'app"**. Aucun store, aucun compte, aucune pub.

### Pour les développeurs / fork

```bash
git clone https://github.com/knipo2025/knipokids.git
cd knipokids
# Servir en local sur n'importe quel HTTP server
python3 -m http.server 8080
# Puis ouvre http://localhost:8080
```

> ⚠️ Le service worker exige HTTPS en production (sauf localhost).

## 🛠️ Stack technique

- **HTML5 + CSS3 + Vanilla JS** — zéro framework, zéro npm install, ~377 Ko brut
- **Web Speech API** — narration sans dépendance
- **Web Audio API** — sons et musique d'ambiance
- **Service Worker** — fonctionnement hors-ligne complet
- **localStorage** — persistance des progrès (XP, achats, langue, prénom…)
- **PWA manifest** — installable comme app native

## 📁 Structure du repo

```
knipokids/
├── index.html         # App complète (~3 947 lignes, autonome)
├── sw.js              # Service Worker (cache + offline)
├── manifest.json      # PWA manifest
├── icon-192.png       # Icône Android home screen
├── icon-512.png       # Icône splash screen / haute résolution
├── favicon.png        # Onglet navigateur
├── CNAME              # Configuration custom domain GitHub Pages
└── README.md          # Ce fichier
```

## 🗺️ Roadmap

- [x] Quiz multi-thèmes 3 langues
- [x] Mode 2 joueurs
- [x] Mascotte vivante avec personnalisation
- [x] Album de cartes collectibles
- [x] Carte d'Afrique interactive
- [x] Mode hors-ligne (PWA)
- [x] Mini-jeux variés (Memory, Tap Rapide, Mix)
- [x] Skins saisonniers automatiques
- [x] Espace parents avec stats
- [x] Scaffolding Premium (40 questions exclusives)
- [ ] **Paiement Stripe / Apple Pay** pour le Premium
- [ ] Synchronisation cloud du profil enfant
- [ ] **Mode Histoire** : voyage narratif à travers les civilisations
- [ ] Dictée audio (apprentissage de l'oral)
- [ ] Soumission **Google Play / App Store** via TWA

## 🎨 Design

L'identité visuelle s'inspire des couleurs de la savane africaine :
- **#E65100** Orange feu — énergie
- **#EF9F27** Or-ambre — chaleur
- **#1D9E75** Vert savane — nature
- **#534AB7** Indigo — sagesse
- **Police titres** : Baloo 2 (rondeur enfantine, lisible)
- **Police texte** : Nunito (familiale, douce)

## 🤝 Contribuer

Les contributions sont bienvenues ! Idées de thèmes, traductions, corrections, ajouts de questions : ouvre une **Issue** ou une **Pull Request**.

Pour suggérer une question, utilise ce format dans une issue :

```js
{
  e: '🦁',
  q: { fr: '...', en: '...', it: '...' },
  h: { fr: 'indice', en: '...', it: '...' },
  a: { fr: ['A','B','C','D'], en: [...], it: [...] },
  c: 0,  // index de la bonne réponse
  x: { fr: 'explication', en: '...', it: '...' }
}
```

## 📜 Licence

À définir — contacte l'auteur pour usage commercial.

## 🙏 Remerciements

Merci à tous les éducateurs, historiens et familles qui inspirent ce projet — et aux enfants qui méritent une histoire dont ils peuvent être fiers.

---

<div align="center">

**Fait avec 🧡 pour la jeunesse africaine et la diaspora.**

[knipo.org](https://knipo.org) · [GitHub](https://github.com/knipo2025/knipokids)

</div>
