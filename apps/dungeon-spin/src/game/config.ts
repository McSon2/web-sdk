import type { MonsterType, MonsterSize } from './types';

// Configuration du jeu
export const config = {
	// Dimensions du canvas
	canvas: {
		width: 800,
		height: 600,
	},

	// Positions des personnages
	positions: {
		hero: {
			x: 200,
			y: 400,
		},
		monsters: {
			small: { x: 600, y: 420 },
			medium: { x: 580, y: 380 },
			large: { x: 560, y: 340 },
		},
		boss: {
			x: 550,
			y: 300,
		},
	},

	// Statistiques des monstres
	monsters: {
		goblin: {
			small: { health: 30, damage: 10, reward: 1 },
			medium: { health: 60, damage: 15, reward: 2 },
			large: { health: 100, damage: 20, reward: 3 },
		},
		orc: {
			small: { health: 40, damage: 12, reward: 1 },
			medium: { health: 80, damage: 18, reward: 2 },
			large: { health: 120, damage: 25, reward: 3 },
		},
		troll: {
			small: { health: 50, damage: 15, reward: 1 },
			medium: { health: 100, damage: 22, reward: 2 },
			large: { health: 150, damage: 30, reward: 3 },
		},
	} as Record<MonsterType, Record<MonsterSize, { health: number; damage: number; reward: number }>>,

	// Statistiques du héros
	hero: {
		maxHealth: 100,
		damage: 25,
		startingHealth: 100,
	},

	// Statistiques du boss
	boss: {
		dragon: {
			health: 300,
			damage: 40,
			reward: 50,
		},
	},

	// Paramètres de progression
	progression: {
		roomsForBossChallenge: 5,
		baseMultiplier: 1,
		maxRooms: 10,
	},

	// Paramètres d'animation
	animation: {
		attackDuration: 800,
		hurtDuration: 500,
		deathDuration: 1000,
		moveSpeed: 200,
	},

	// Assets keys (correspond aux clés dans assets.ts)
	assets: {
		background: 'background',
		hero: {
			idle: 'heroIdle',
			attack: 'heroAttack',
			hurt: 'heroHurt',
		},
		monsters: {
			goblin: {
				idle: 'goblinIdle',
				attack: 'goblinAttack',
			},
			orc: {
				idle: 'orcIdle',
				attack: 'orcAttack',
			},
			troll: {
				idle: 'trollIdle',
				attack: 'trollAttack',
			},
		},
		boss: {
			dragon: {
				idle: 'dragonIdle',
				attack: 'dragonAttack',
			},
		},
		ui: {
			heart: 'heart',
			sword: 'sword',
			coin: 'coin',
		},
	},
};

export default config;