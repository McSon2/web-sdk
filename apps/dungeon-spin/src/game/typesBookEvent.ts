import type { BetType } from 'rgs-requests';
import type { Monster, Hero, Room, BossType } from './types';

// BookEvents pour Dungeon Spin
type BookEventEnterRoom = {
	index: number;
	type: 'enterRoom';
	roomNumber: number;
	monsters: Monster[];
	multiplier: number;
};

type BookEventFightMonster = {
	index: number;
	type: 'fightMonster';
	monsterId: string;
	heroDamage: number;
	monsterDamage: number;
};

type BookEventDefeatMonster = {
	index: number;
	type: 'defeatMonster';
	monsterId: string;
	reward: number;
	multiplier: number;
};

type BookEventTakeDamage = {
	index: number;
	type: 'takeDamage';
	damage: number;
	remainingHealth: number;
};

type BookEventHeroDeath = {
	index: number;
	type: 'heroDeath';
	finalMultiplier: number;
	totalWinnings: number;
};

type BookEventBossChallenge = {
	index: number;
	type: 'bossChallenge';
	bossType: BossType;
	currentMultiplier: number;
	potentialReward: number;
};

type BookEventCashOut = {
	index: number;
	type: 'cashOut';
	amount: number;
	multiplier: number;
};

type BookEventFightBoss = {
	index: number;
	type: 'fightBoss';
	bossType: BossType;
	heroDamage: number;
	bossDamage: number;
	bossHealth: number;
};

type BookEventBossVictory = {
	index: number;
	type: 'bossVictory';
	bossType: BossType;
	finalMultiplier: number;
	totalWinnings: number;
};

type BookEventBossDefeat = {
	index: number;
	type: 'bossDefeat';
	bossType: BossType;
	lostAmount: number;
};

type BookEventSetTotalWin = {
	index: number;
	type: 'setTotalWin';
	amount: number;
};

type BookEventUpdateMultiplier = {
	index: number;
	type: 'updateMultiplier';
	multiplier: number;
	roomNumber: number;
};

type BookEventFinalWin = {
	index: number;
	type: 'finalWin';
	amount: number;
};

// Union type de tous les BookEvents
export type BookEvent =
	| BookEventEnterRoom
	| BookEventFightMonster
	| BookEventDefeatMonster
	| BookEventTakeDamage
	| BookEventHeroDeath
	| BookEventBossChallenge
	| BookEventCashOut
	| BookEventFightBoss
	| BookEventBossVictory
	| BookEventBossDefeat
	| BookEventSetTotalWin
	| BookEventUpdateMultiplier
	| BookEventFinalWin;

export type Bet = BetType<BookEvent>;
export type BookEventOfType<T> = Extract<BookEvent, { type: T }>;
export type BookEventContext = { bookEvents: BookEvent[] };