import { type Hero, type Monster, type Room, type Expedition, type BossChallenge, type GameStats } from './types';

// État principal du jeu
export const stateGame = $state({
	// Héros
	hero: {
		health: 100,
		maxHealth: 100,
		damage: 20,
		position: { x: 200, y: 300 },
		state: 'idle' as const,
		experience: 0,
	} as Hero,

	// Expédition actuelle
	expedition: {
		currentRoom: 0,
		totalRooms: 0,
		rooms: [] as Room[],
		totalMultiplier: 0,
		isActive: false,
	} as Expedition,

	// Défi du boss
	bossChallenge: {
		isActive: false,
		bossType: 'dragon' as const,
		bossHealth: 200,
		bossMaxHealth: 200,
		potentialReward: 0,
	} as BossChallenge,

	// Statistiques du jeu
	stats: {
		roomsCompleted: 0,
		monstersDefeated: 0,
		totalWinnings: 0,
		currentMultiplier: 1,
		expeditionActive: false,
	} as GameStats,

	// Monstres actifs dans la salle courante
	activeMonsters: [] as Monster[],

	// Phase de jeu actuelle
	gamePhase: 'expedition' as const,
});

// État dérivé pour des calculs complexes
export const stateGameDerived = {
	// Vérifie si le héros est vivant
	isHeroAlive: () => stateGame.hero.health > 0,

	// Vérifie si tous les monstres de la salle sont morts
	areAllMonstersDead: () => stateGame.activeMonsters.every((monster) => monster.health <= 0),

	// Calcule le multiplicateur total actuel
	getCurrentMultiplier: () => {
		const roomMultipliers = stateGame.expedition.rooms
			.slice(0, stateGame.expedition.currentRoom)
			.reduce((total, room) => total + room.multiplier, 0);
		return Math.max(1, roomMultipliers);
	},

	// Obtient la salle actuelle
	getCurrentRoom: () => {
		if (stateGame.expedition.currentRoom > 0 && stateGame.expedition.currentRoom <= stateGame.expedition.rooms.length) {
			return stateGame.expedition.rooms[stateGame.expedition.currentRoom - 1];
		}
		return null;
	},

	// Vérifie si on peut déclencher le boss challenge
	canTriggerBossChallenge: () => {
		return stateGame.expedition.currentRoom >= 5 && stateGame.expedition.isActive && stateGameDerived.isHeroAlive();
	},

	// Calcule les gains potentiels si on encaisse maintenant
	getPotentialWinnings: () => {
		return stateGameDerived.getCurrentMultiplier() * 10; // Base multiplier
	},
};

// Fonctions utilitaires pour modifier l'état
export const gameActions = {
	// Réinitialise le jeu
	resetGame: () => {
		stateGame.hero.health = stateGame.hero.maxHealth;
		stateGame.hero.state = 'idle';
		stateGame.expedition.currentRoom = 0;
		stateGame.expedition.rooms = [];
		stateGame.expedition.isActive = false;
		stateGame.activeMonsters = [];
		stateGame.bossChallenge.isActive = false;
		stateGame.gamePhase = 'expedition';
		stateGame.stats.expeditionActive = false;
	},

	// Démarre une nouvelle expédition
	startExpedition: () => {
		gameActions.resetGame();
		stateGame.expedition.isActive = true;
		stateGame.stats.expeditionActive = true;
		stateGame.gamePhase = 'expedition';
	},

	// Passe à la salle suivante
	nextRoom: () => {
		stateGame.expedition.currentRoom++;
		stateGame.activeMonsters = [];
	},

	// Ajoute un monstre à la salle actuelle
	addMonster: (monster: Monster) => {
		stateGame.activeMonsters.push(monster);
	},

	// Met à jour la santé du héros
	updateHeroHealth: (newHealth: number) => {
		stateGame.hero.health = Math.max(0, Math.min(stateGame.hero.maxHealth, newHealth));
		if (stateGame.hero.health <= 0) {
			stateGame.hero.state = 'death';
		}
	},

	// Met à jour la santé d'un monstre
	updateMonsterHealth: (monsterId: string, newHealth: number) => {
		const monster = stateGame.activeMonsters.find((m) => m.id === monsterId);
		if (monster) {
			monster.health = Math.max(0, newHealth);
			if (monster.health <= 0) {
				monster.state = 'death';
				stateGame.stats.monstersDefeated++;
			}
		}
	},

	// Active le défi du boss
	activateBossChallenge: () => {
		stateGame.bossChallenge.isActive = true;
		stateGame.bossChallenge.potentialReward = stateGameDerived.getPotentialWinnings() * 3;
		stateGame.gamePhase = 'bossChallenge';
	},

	// Termine l'expédition
	endExpedition: (totalWinnings: number) => {
		stateGame.expedition.isActive = false;
		stateGame.stats.expeditionActive = false;
		stateGame.stats.totalWinnings = totalWinnings;
		stateGame.gamePhase = 'gameOver';
	},
};