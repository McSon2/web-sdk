# Dungeon Spin

## 🎮 Description

**Dungeon Spin** réinvente complètement l'expérience des machines à sous traditionnelles. Plus de lignes de paiement, plus de symboles qui tombent - bienvenue dans le premier slot RPG où chaque spin est une véritable quête !

> *"Le seul slot où chaque spin est une quête. Frayez-vous un chemin à l'épée à travers des salles remplies de monstres. Plus vous survivez, plus les trésors grossissent. Partez à l'aventure… si vous l'osez !"*

## 🎯 Concept Core

Dungeon Spin transforme le concept de machine à sous en aventure RPG pixel-art. Au lieu de faire tourner des rouleaux, le joueur contrôle un héros qui progresse de salle en salle dans un donjon mystérieux, combattant des monstres pour décrocher des multiplicateurs croissants.

## 🏗️ Mécaniques de Jeu

### 🚀 Système de Progression
- **Chaque SPIN = 1 Expédition** : Le joueur lance une nouvelle aventure
- **Progression linéaire** : Salle 1 → Salle 2 → Salle 3... jusqu'à la mort du héros
- **Multiplicateurs croissants** : Plus le héros survit longtemps, plus les gains potentiels augmentent

### ⚔️ Combat System
- **3 types de monstres** : Petits, moyens, grands (même sprite recoloré pour optimiser le développement)
- **Combat automatique** : Le héros attaque automatiquement les monstres de la salle
- **Système de vie** : Le héros a des points de vie qui diminuent selon les attaques subies
- **Animations simples** : Sprites fixes avec effets de shake-screen pour l'impact visuel

### 🏆 Système de Récompenses
- **Gains instantanés** : Chaque monstre vaincu rapporte des multiplicateurs
- **Progression des gains** : Plus le héros avance, plus les multiplicateurs sont élevés
- **Mort = Fin de l'expédition** : Le joueur récupère tous les gains accumulés

### 🎰 Mécanisme Bonus (Conformité Stake)
- **Seuil de Boss** : Après la 5ème salle, le héros peut affronter un boss optionnel
- **Choix stratégique** : 
  - **Encaisser** : Récupérer les gains actuels et terminer l'expédition
  - **Affronter le Boss** : Risquer tout pour un multiplicateur géant
- **High Risk, High Reward** : Le boss peut doubler/tripler les gains... ou tout faire perdre

## 🎨 Direction Artistique

### 🖼️ Style Visuel
- **Pixel-Art** : Esthétique rétro gaming pour une production rapide
- **Palette restreinte** : Couleurs sombres et mystérieuses pour l'ambiance donjon
- **Sprites optimisés** : Réutilisation maximale des assets (recoloration des monstres)

### 🎵 Ambiance Sonore
- **Musique d'ambiance** : Thème mystérieux et aventureux
- **Effets sonores** : Bruits d'épée, cris de monstres, pièces qui tombent
- **Feedback audio** : Sons de victoire/défaite pour renforcer l'immersion

### 🤖 Guide de Génération d'Assets par IA

**Cohérence Visuelle** : Tous les assets suivent une palette commune et un style unifié.

**Palette de Couleurs Principale** :
- Fond : #1a1a2e (bleu très sombre), #16213e (bleu foncé)
- Pierre : #4a4a4a (gris foncé), #6b6b6b (gris moyen)
- Métal : #c0c0c0 (argent), #8b7355 (bronze)
- Feu/Lumière : #ff6b35 (orange), #f7931e (jaune orangé)
- Sang/Danger : #cc2936 (rouge foncé)
- Magie : #9d4edd (violet), #7209b7 (violet foncé)

#### 🏰 Environnement

**Arrière-plan principal du donjon** :
```
Create a dark medieval dungeon room background in 16-bit pixel art style, 800x600 resolution. Ancient stone walls made of large gray blocks (#4a4a4a and #6b6b6b), with visible mortar lines. Two wall-mounted torches on iron brackets casting warm orange light (#ff6b35). Dark shadows in corners using deep blue (#1a1a2e). Weathered stone floor with subtle cracks. Atmospheric depth with slight perspective. No characters, monsters, or interactive elements. Style: reminiscent of classic 90s RPGs like Secret of Mana, clean pixel art with limited color palette.
```

#### 🦸 Héros

**Héros - Pose Idle** :
```
Create a pixel art RPG hero character in idle pose, 64x64 pixels, 16-bit style. Medieval knight facing right, standing upright with slight confident stance. Brown leather armor (#8b7355), silver sword (#c0c0c0) at side, small round shield on back. Red cape (#cc2936) flowing behind. Blonde hair visible under simple helm. Skin tone: light peach. Clean pixel art with 2-3 shades per color. Style: classic SNES RPG character, reminiscent of Secret of Mana. Transparent PNG background.
```

**Héros - Pose Attack** :
```
Create a pixel art RPG hero character in attack pose, 64x64 pixels, 16-bit style. Same medieval knight as idle pose but sword raised overhead in striking position, facing right. Brown leather armor (#8b7355), silver sword (#c0c0c0) gleaming, shield on back. Red cape (#cc2936) flowing with movement. Blonde hair, light peach skin. Dynamic pose showing movement. Maintain exact same character design as idle pose. Classic SNES RPG style, clean pixel art. Transparent PNG background.
```

**Héros - Pose Hurt** :
```
Create a pixel art RPG hero character in hurt pose, 64x64 pixels, 16-bit style. Same medieval knight as previous poses but recoiling backward, facing right. Brown leather armor (#8b7355), silver sword (#c0c0c0) lowered defensively, shield raised. Red cape (#cc2936) billowing. Blonde hair, light peach skin. Expression of pain/surprise. Maintain exact same character design. Classic SNES RPG style, clean pixel art. Transparent PNG background.
```

#### 👹 Monstres

**Petit Monstre - Gobelin Idle** :
```
Create a pixel art small goblin monster in idle pose, 32x32 pixels, 16-bit style. Hunched creature with green skin (#2d5016), yellow eyes, pointed ears. Simple brown loincloth, small crude dagger. Menacing but not too scary, suitable for slot game. Facing left to oppose hero. Style: classic SNES RPG enemy, reminiscent of Secret of Mana monsters. Clean pixel art with limited colors. Transparent PNG background.
```

**Petit Monstre - Gobelin Attack** :
```
Create a pixel art small goblin monster in attack pose, 32x32 pixels, 16-bit style. Same goblin as idle pose but lunging forward with dagger raised. Green skin (#2d5016), yellow eyes, pointed ears. Brown loincloth, small crude dagger extended. Aggressive pose, facing left. Maintain exact same character design as idle pose. Classic SNES RPG style, clean pixel art. Transparent PNG background.
```

**Monstre Moyen - Orc Idle** :
```
Create a pixel art medium orc monster in idle pose, 48x48 pixels, 16-bit style. Larger version of the goblin design but more muscular and imposing. Same green skin (#2d5016), yellow eyes, pointed ears but bigger build. Brown leather armor pieces, crude sword. Menacing stance, facing left. Maintain visual consistency with small goblin. Classic SNES RPG style, reminiscent of Secret of Mana. Clean pixel art. Transparent PNG background.
```

**Monstre Moyen - Orc Attack** :
```
Create a pixel art medium orc monster in attack pose, 48x48 pixels, 16-bit style. Same orc as idle pose but swinging crude sword in wide arc. Green skin (#2d5016), yellow eyes, pointed ears. Brown leather armor, crude sword extended. Dynamic attacking motion, facing left. Maintain exact same character design as idle pose. Classic SNES RPG style, clean pixel art. Transparent PNG background.
```

**Grand Monstre - Troll Idle** :
```
Create a pixel art large troll monster in idle pose, 64x64 pixels, 16-bit style. Massive version of the goblin/orc design family. Same green skin (#2d5016), yellow eyes, pointed ears but huge muscular build. Minimal brown fur clothing, large stone club. Imposing and threatening, facing left. Maintain visual consistency with smaller monsters. Classic SNES RPG style, reminiscent of Secret of Mana. Clean pixel art. Transparent PNG background.
```

**Grand Monstre - Troll Attack** :
```
Create a pixel art large troll monster in attack pose, 64x64 pixels, 16-bit style. Same troll as idle pose but raising stone club overhead for devastating blow. Green skin (#2d5016), yellow eyes, pointed ears. Brown fur clothing, large stone club raised high. Powerful attacking stance, facing left. Maintain exact same character design as idle pose. Classic SNES RPG style, clean pixel art. Transparent PNG background.
```

#### 👑 Boss Final

**Boss - Dragon Idle** :
```
Create a pixel art dragon boss in idle pose, 96x96 pixels, 16-bit style. Majestic but menacing dragon with dark scales (#1a1a2e), glowing purple eyes (#9d4edd), small wings spread. Sitting/crouched position showing power. Golden chest scales (#f7931e), silver claws (#c0c0c0). Facing left to oppose hero. Epic boss presence but maintaining pixel art simplicity. Classic SNES RPG boss style, reminiscent of Secret of Mana. Clean pixel art. Transparent PNG background.
```

**Boss - Dragon Attack** :
```
Create a pixel art dragon boss in attack pose, 96x96 pixels, 16-bit style. Same dragon as idle pose but rearing back with mouth open, about to breathe fire. Dark scales (#1a1a2e), glowing purple eyes (#9d4edd), wings spread wide. Golden chest scales (#f7931e), silver claws (#c0c0c0). Orange fire glow (#ff6b35) starting in mouth. Maintain exact same character design as idle pose. Classic SNES RPG boss style, clean pixel art. Transparent PNG background.
```

#### 🎯 Interface

**Icône Coeur de Vie** :
```
Create a pixel art health heart icon, 32x32 pixels, 16-bit style. Classic heart shape in bright red (#cc2936) with white highlight and darker red shadow for depth. Simple, clean design suitable for game UI. Style consistent with SNES RPG interfaces. Transparent PNG background.
```

**Icône Épée** :
```
Create a pixel art sword icon, 32x32 pixels, 16-bit style. Simple medieval sword with silver blade (#c0c0c0), brown handle (#8b7355), golden crossguard (#f7931e). Clean design for game UI, matching hero's weapon style. Style consistent with SNES RPG interfaces. Transparent PNG background.
```

**Icône Pièce d'Or** :
```
Create a pixel art gold coin icon, 32x32 pixels, 16-bit style. Round coin in bright gold (#f7931e) with darker gold shading and white highlights. Simple '$' or crown symbol in center. Clean design for game UI showing currency/winnings. Style consistent with SNES RPG interfaces. Transparent PNG background.
```

**Note** : Tous les assets de base ont été générés et intégrés dans `static/assets/sprites/`. Les assets manquants (orc, troll, dragon) utilisent temporairement les sprites de goblin en attendant leur génération.

### 📁 Assets Générés et Intégrés
- [x] background.png - Arrière-plan du donjon
- [x] hero_idle.png - Héros en position d'attente  
- [x] hero_attack.png - Héros en position d'attaque
- [x] hero_hurt.png - Héros blessé
- [x] goblin_idle.png - Petit monstre (gobelin) en attente
- [x] goblin_attack.png - Petit monstre (gobelin) en attaque
- [x] heart.png - Icône de vie pour l'UI
- [x] sword.png - Icône d'épée pour l'UI
- [x] coin.png - Icône de pièce pour l'UI

### 🔧 Corrections Techniques Apportées
- [x] **Configuration des assets** : Migration vers le système `new URL()` identique au projet `lines`
- [x] **Chemins d'assets** : Correction des chemins relatifs (`../../assets/` au lieu de `../../static/assets/`)
- [x] **Résolution Vite** : Élimination des erreurs "outside of Vite serving allow list"
- [x] **Assets manquants** : Ajout des définitions pour éviter les erreurs de texture undefined
- [x] **Context et State** : Système de contexte unifié avec événements et états de jeu
- [x] **Composants de base** : Hero, Dungeon, Game avec gestion d'assets et animations

## 🛠️ Architecture Technique

### 📋 BookEvents Système
Le jeu utilise le système d'événements de Stake Engine :

#### Base Game Events
- `enterRoom` : Le héros entre dans une nouvelle salle
- `fightMonster` : Combat contre un monstre
- `defeatMonster` : Victoire contre un monstre (+multiplicateur)
- `takeDamage` : Le héros subît des dégâts
- `heroDeath` : Mort du héros (fin de l'expédition)

#### Bonus Events
- `bossChallenge` : Défi du boss après la 5ème salle
- `cashOut` : Le joueur décide d'encaisser ses gains
- `fightBoss` : Combat contre le boss final
- `bossVictory` : Victoire contre le boss (multiplicateur géant)
- `bossDefeat` : Défaite contre le boss (perte de tout)

#### Utility Events
- `setTotalWin` : Mise à jour des gains totaux
- `updateMultiplier` : Mise à jour du multiplicateur actuel
- `finalWin` : Gains finaux de l'expédition

### 🎮 Composants Principaux

#### Core Components
- `Game.svelte` : Composant principal du jeu
- `Hero.svelte` : Sprite et animations du héros
- `Dungeon.svelte` : Environnement visuel du donjon
- `Monster.svelte` : Sprites et animations des monstres
- `UI.svelte` : Interface utilisateur (vie, multiplicateur, gains)

#### Specialized Components
- `Room.svelte` : Gestion d'une salle individuelle
- `Combat.svelte` : Système de combat
- `BossChallenge.svelte` : Interface du choix bonus
- `Multiplier.svelte` : Affichage des multiplicateurs
- `WinDisplay.svelte` : Affichage des gains

## 🎲 Exemple de Gameplay

### 🌟 Expédition Type
1. **SPIN** : Le joueur lance une nouvelle expédition
2. **Salle 1** : Le héros affronte 1 petit monstre → +1x multiplicateur
3. **Salle 2** : Le héros affronte 2 petits monstres → +2x multiplicateur
4. **Salle 3** : Le héros affronte 1 monstre moyen → +3x multiplicateur
5. **Salle 4** : Le héros affronte 1 petit + 1 moyen → +5x multiplicateur
6. **Salle 5** : Le héros affronte 1 grand monstre → +10x multiplicateur

### 🏆 Moment Critique
**Choix Bonus** : Le héros peut maintenant :
- **Encaisser** : Récupérer 21x la mise (1+2+3+5+10)
- **Défier le Boss** : Risquer tout pour un multiplicateur de 50x+

### 🎯 Avantages Commerciaux

#### 🚀 Développement
- **Économie d'assets** : Réutilisation maximale des sprites
- **Développement rapide** : Mécaniques simples mais addictives
- **Prototype viable** : Faisable en quelques jours avec le SDK

#### 💰 Rentabilité
- **Expérience unique** : Se démarque totalement de la concurrence
- **Rejouabilité élevée** : Chaque expédition est différente
- **Système de risk/reward** : Encourage les gros paris

#### 🎮 Jouabilité
- **Facile à comprendre** : Mécaniques intuitives
- **Tension constante** : Le joueur est toujours en danger
- **Satisfaction visuelle** : Progression claire et récompenses immédiates

## 📈 Roadmap de Développement

### Phase 1 : Fondations (Semaine 1) ✅ TERMINÉE
- [x] Structure de base du projet
- [x] Système de rooms et progression
- [x] Sprites de base (héros + 1 monstre)
- [x] Combat system basique

### Phase 2 : Core Gameplay (Semaine 2)
- [ ] Système de multiplicateurs
- [ ] 3 types de monstres complets
- [ ] Interface utilisateur complète
- [ ] Système de mort/victoire

### Phase 3 : Bonus System (Semaine 3)
- [ ] Mécanisme de boss challenge
- [ ] Interface choix encaisser/continuer
- [ ] Combat contre boss
- [ ] Système de gains bonus

### Phase 4 : Polish (Semaine 4)
- [ ] Animations et effets visuels
- [ ] Système audio complet
- [ ] Équilibrage des gains
- [ ] Tests et optimisations

## 🔧 Configuration Technique

### Requirements
- Node.js 22.16.0
- pnpm 10.5.0
- Stake Engine Web SDK

### Commands
```bash
# Développement
pnpm run dev --filter=dungeon-spin

# Storybook (pour tester les composants)
pnpm run storybook --filter=dungeon-spin

# Build
pnpm run build --filter=dungeon-spin
```

### 🏗️ État Actuel du Développement

#### ✅ Composants Implémentés
- **Game.svelte** : Composant racine avec gestion des salles et orchestration
- **Hero.svelte** : Héros avec animations (idle, attack, hurt) et barre de vie
- **Monster.svelte** : Monstres avec 3 tailles, animations et barres de vie
- **Combat.svelte** : Système de combat tour par tour automatique
- **Dungeon.svelte** : Arrière-plan du donjon avec overlay atmosphérique
- **LoadingScreen.svelte** : Écran de chargement des assets
- **GameUI.svelte** : Interface utilisateur de base

#### ⚙️ Systèmes Techniques
- **Asset Loading** : Système de chargement d'assets compatible Vite
- **Event System** : EmitterEvent pour communication entre composants
- **State Management** : États de jeu avec Svelte 5 $state
- **Context** : Injection de dépendances unifiée
- **TypeScript** : Types complets pour entities et événements

#### 🎮 Fonctionnalités Disponibles
- **Combat Automatique** : Système de combat tour par tour fonctionnel
- **Progression de Salles** : Génération automatique de monstres par salle
- **Animations Complètes** : Héros et monstres avec états visuels
- **Gestion de la Vie** : Barres de vie dynamiques pour tous les personnages
- **3 Types de Monstres** : Goblin (petit), Orc (moyen), Troll (grand)
- **Système d'Événements** : Communication fluide entre composants
- **Stories Storybook** : Tests visuels pour chaque composant

#### 🔄 Prochaines Étapes (Phase 2)
- Système de multiplicateurs et gains
- Interface utilisateur complète avec indicateurs
- Mécanisme de boss challenge (salle 5+)
- Système de mort/victoire avec récompenses
- Équilibrage des statistiques de combat

## 📊 Métriques de Succès

### 🎯 KPIs Gameplay
- **Temps de session moyen** : Objectif 5+ minutes
- **Taux de bonus trigger** : 15-20% des parties
- **Taux de cash-out vs boss fight** : 60/40 optimal

### 💎 KPIs Business
- **RTP** : 96% (conforme aux standards)
- **Volatilité** : Moyenne-Haute
- **Hit Frequency** : 25-30%

---

*Dungeon Spin - Où chaque spin devient une légende.* ⚔️🏆