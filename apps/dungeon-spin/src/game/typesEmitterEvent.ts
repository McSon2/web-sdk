import type { Monster, Hero, Room, BossType, CharacterState } from './types';

// EmitterEvents pour les composants

// Hero Events
export type EmitterEventHero =
	| { type: 'heroShow' }
	| { type: 'heroHide' }
	| { type: 'heroSetState'; state: CharacterState }
	| { type: 'heroTakeDamage'; damage: number; newHealth: number }
	| { type: 'heroAttack'; targetMonsterId: string }
	| { type: 'heroMove'; x: number; y: number }
	| { type: 'heroReset' };

// Monster Events
export type EmitterEventMonster =
	| { type: 'monsterShow'; monsterId: string }
	| { type: 'monsterHide'; monsterId: string }
	| { type: 'monsterSetState'; monsterId: string; state: CharacterState }
	| { type: 'monsterTakeDamage'; monsterId: string; damage: number; newHealth: number }
	| { type: 'monsterAttack'; monsterId: string; targetType: 'hero' }
	| { type: 'monsterDeath'; monsterId: string; reward: number }
	| { type: 'monsterReset'; monsterId: string }
	| { type: 'monsterSpawn'; monster: Monster };

// Room Events
export type EmitterEventRoom =
	| { type: 'enterRoom'; roomNumber: number; monsters: Monster[]; multiplier: number }
	| { type: 'roomEnter'; room: Room }
	| { type: 'roomExit' }
	| { type: 'roomComplete'; room: Room }
	| { type: 'roomReset' };

// Combat Events
export type EmitterEventCombat =
	| { type: 'combatStart'; roomNumber: number }
	| { type: 'combatEnd'; roomNumber: number; victory: boolean }
	| { type: 'combatRound'; attacker: 'hero' | 'monster'; targetId?: string }
	| { type: 'combatTurn'; currentTurn: 'hero' | 'monster' }
	| { type: 'combatPause' }
	| { type: 'combatResume' }
	| { type: 'combatReset' };

// Boss Events
export type EmitterEventBoss =
	| { type: 'bossShow'; bossType: BossType }
	| { type: 'bossHide' }
	| { type: 'bossSetState'; state: CharacterState }
	| { type: 'bossTakeDamage'; damage: number; newHealth: number }
	| { type: 'bossAttack' }
	| { type: 'bossDeath' }
	| { type: 'bossReset' };

// UI Events
export type EmitterEventUI =
	| { type: 'uiShow' }
	| { type: 'uiHide' }
	| { type: 'uiUpdateHealth'; health: number; maxHealth: number }
	| { type: 'uiUpdateMultiplier'; multiplier: number }
	| { type: 'uiUpdateRoom'; roomNumber: number }
	| { type: 'uiUpdateWinnings'; amount: number }
	| { type: 'uiShowBossChallenge'; potentialReward: number }
	| { type: 'uiHideBossChallenge' };

// Expedition Events
export type EmitterEventExpedition =
	| { type: 'expeditionStart' }
	| { type: 'expeditionEnd'; totalWinnings: number }
	| { type: 'expeditionReset' };

// Union type de tous les EmitterEvents du jeu
export type EmitterEventGame =
	| EmitterEventHero
	| EmitterEventMonster
	| EmitterEventRoom
	| EmitterEventCombat
	| EmitterEventBoss
	| EmitterEventUI
	| EmitterEventExpedition;