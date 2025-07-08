// Types de base pour Dungeon Spin

export type MonsterSize = 'small' | 'medium' | 'large';
export type MonsterType = 'goblin' | 'orc' | 'troll';
export type BossType = 'dragon';

export type CharacterState = 'idle' | 'attack' | 'hurt' | 'death' | 'victory';

export type GamePhase = 'expedition' | 'bossChallenge' | 'gameOver';

export interface Position {
	x: number;
	y: number;
}

export interface Monster {
	id: string;
	type: MonsterType;
	size: MonsterSize;
	health: number;
	maxHealth: number;
	damage: number;
	reward: number;
	position: Position;
	state: CharacterState;
}

export interface Hero {
	health: number;
	maxHealth: number;
	damage: number;
	position: Position;
	state: CharacterState;
	experience: number;
}

export interface Room {
	number: number;
	monsters: Monster[];
	completed: boolean;
	multiplier: number;
}

export interface Expedition {
	currentRoom: number;
	totalRooms: number;
	rooms: Room[];
	totalMultiplier: number;
	isActive: boolean;
}

export interface BossChallenge {
	isActive: boolean;
	bossType: BossType;
	bossHealth: number;
	bossMaxHealth: number;
	potentialReward: number;
}

export interface GameStats {
	roomsCompleted: number;
	monstersDefeated: number;
	totalWinnings: number;
	currentMultiplier: number;
	expeditionActive: boolean;
}