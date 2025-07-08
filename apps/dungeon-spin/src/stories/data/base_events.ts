import type { BookEvent } from '../../game/typesBookEvent';
import type { Monster } from '../../game/types';

// Monstre de test
const testMonster: Monster = {
	id: 'test-monster-1',
	type: 'goblin',
	size: 'small',
	health: 30,
	maxHealth: 30,
	damage: 10,
	reward: 1,
	position: { x: 600, y: 420 },
	state: 'idle',
};

// Événements de base pour les tests Storybook
const baseEvents: Record<string, BookEvent> = {
	enterRoom: {
		index: 0,
		type: 'enterRoom',
		roomNumber: 1,
		monsters: [testMonster],
		multiplier: 2,
	},
	
	fightMonster: {
		index: 1,
		type: 'fightMonster',
		monsterId: 'test-monster-1',
		heroDamage: 25,
		monsterDamage: 10,
	},
	
	defeatMonster: {
		index: 2,
		type: 'defeatMonster',
		monsterId: 'test-monster-1',
		reward: 1,
		multiplier: 2,
	},
	
	takeDamage: {
		index: 3,
		type: 'takeDamage',
		damage: 15,
		remainingHealth: 85,
	},
	
	heroDeath: {
		index: 4,
		type: 'heroDeath',
		finalMultiplier: 0,
		totalWinnings: 0,
	},
	
	bossChallenge: {
		index: 5,
		type: 'bossChallenge',
		bossType: 'dragon',
		currentMultiplier: 15,
		potentialReward: 150,
	},
	
	cashOut: {
		index: 6,
		type: 'cashOut',
		amount: 50,
		multiplier: 10,
	},
	
	fightBoss: {
		index: 7,
		type: 'fightBoss',
		bossType: 'dragon',
		heroDamage: 30,
		bossDamage: 40,
		bossHealth: 260,
	},
	
	bossVictory: {
		index: 8,
		type: 'bossVictory',
		bossType: 'dragon',
		finalMultiplier: 25,
		totalWinnings: 250,
	},
	
	bossDefeat: {
		index: 9,
		type: 'bossDefeat',
		bossType: 'dragon',
		lostAmount: 100,
	},
	
	setTotalWin: {
		index: 10,
		type: 'setTotalWin',
		amount: 50,
	},
	
	updateMultiplier: {
		index: 11,
		type: 'updateMultiplier',
		multiplier: 5,
		roomNumber: 3,
	},
	
	finalWin: {
		index: 12,
		type: 'finalWin',
		amount: 75,
	},
};

export default baseEvents;