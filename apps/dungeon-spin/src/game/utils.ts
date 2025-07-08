import _ from 'lodash';
import { stateBet } from 'state-shared';
import { createPlayBookUtils } from 'utils-book';

import { eventEmitter } from './eventEmitter';
import type { Bet, BookEventOfType } from './typesBookEvent';
import { bookEventHandlerMap } from './bookEventHandlerMap';
import type { Monster, MonsterType, MonsterSize } from './types';
import config from './config';

// Utilitaires généraux
export const { playBookEvent, playBookEvents } = createPlayBookUtils({ bookEventHandlerMap });
export const playBet = async (bet: Bet) => {
	stateBet.winBookEventAmount = 0;
	await playBookEvents(bet.state);
	eventEmitter.broadcast({ type: 'stopButtonEnable' });
};

// Générateur d'ID unique
export const generateId = (): string => {
	return Math.random().toString(36).substr(2, 9);
};

// Génère un monstre aléatoire
export const generateRandomMonster = (roomNumber: number): Monster => {
	const monsterTypes: MonsterType[] = ['goblin', 'orc', 'troll'];
	const monsterSizes: MonsterSize[] = ['small', 'medium', 'large'];
	
	// Plus on avance, plus les gros monstres sont probables
	const sizeWeights = {
		small: Math.max(1, 5 - roomNumber),
		medium: Math.min(5, roomNumber),
		large: Math.max(0, roomNumber - 3),
	};
	
	const totalWeight = sizeWeights.small + sizeWeights.medium + sizeWeights.large;
	const rand = Math.random() * totalWeight;
	
	let size: MonsterSize;
	if (rand < sizeWeights.small) {
		size = 'small';
	} else if (rand < sizeWeights.small + sizeWeights.medium) {
		size = 'medium';
	} else {
		size = 'large';
	}
	
	const type = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
	const stats = config.monsters[type][size];
	
	return {
		id: generateId(),
		type,
		size,
		health: stats.health,
		maxHealth: stats.health,
		damage: stats.damage,
		reward: stats.reward,
		position: { ...config.positions.monsters[size] },
		state: 'idle',
	};
};

// Génère les monstres pour une salle donnée
export const generateMonstersForRoom = (roomNumber: number): Monster[] => {
	const monsters: Monster[] = [];
	
	// Logique de génération basée sur le numéro de salle
	if (roomNumber <= 2) {
		// Salles 1-2: 1-2 petits monstres
		const count = Math.floor(Math.random() * 2) + 1;
		for (let i = 0; i < count; i++) {
			monsters.push(generateRandomMonster(roomNumber));
		}
	} else if (roomNumber <= 4) {
		// Salles 3-4: 1-2 monstres moyens ou un mélange
		const count = Math.floor(Math.random() * 2) + 1;
		for (let i = 0; i < count; i++) {
			monsters.push(generateRandomMonster(roomNumber));
		}
	} else {
		// Salles 5+: monstres plus difficiles
		const count = Math.floor(Math.random() * 3) + 1;
		for (let i = 0; i < count; i++) {
			monsters.push(generateRandomMonster(roomNumber));
		}
	}
	
	// Ajuste les positions pour éviter les chevauchements
	monsters.forEach((monster, index) => {
		monster.position.x += index * 50;
		monster.position.y += (index % 2) * 30;
	});
	
	return monsters;
};

// Calcule le multiplicateur pour une salle
export const calculateRoomMultiplier = (roomNumber: number, monsters: Monster[]): number => {
	const baseMultiplier = roomNumber;
	const monsterBonus = monsters.reduce((total, monster) => total + monster.reward, 0);
	return baseMultiplier + monsterBonus;
};

// Vérifie si le héros peut survivre au combat
export const canHeroSurviveCombat = (heroHealth: number, monsters: Monster[]): boolean => {
	const totalMonsterDamage = monsters.reduce((total, monster) => total + monster.damage, 0);
	return heroHealth > totalMonsterDamage;
};

// Calcule les dégâts d'un combat
export const calculateCombatDamage = (attacker: { damage: number }, defender: { health: number }): number => {
	const baseDamage = attacker.damage;
	const variance = Math.random() * 0.2 - 0.1; // ±10% de variance
	return Math.floor(baseDamage * (1 + variance));
};

// Détermine si un monstre attaque en premier
export const monsterAttacksFirst = (): boolean => {
	return Math.random() < 0.3; // 30% de chance que le monstre attaque en premier
};

// Calcule le temps d'attente entre les attaques
export const getAttackDelay = (): number => {
	return 1000 + Math.random() * 500; // 1-1.5 secondes
};

// Utilitaires pour les animations
export const animationUtils = {
	// Calcule la durée d'une animation basée sur la distance
	getMoveDuration: (distance: number): number => {
		return Math.max(200, distance / config.animation.moveSpeed * 1000);
	},
	
	// Calcule une position d'attaque
	getAttackPosition: (attacker: { x: number; y: number }, target: { x: number; y: number }) => {
		const dx = target.x - attacker.x;
		const dy = target.y - attacker.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const ratio = 0.7; // S'approcher à 70% de la distance
		
		return {
			x: attacker.x + dx * ratio,
			y: attacker.y + dy * ratio,
		};
	},
};

// Utilitaires pour les salles
export const roomUtils = {
	// Génère une salle complète
	generateRoom: (roomNumber: number) => {
		const monsters = generateMonstersForRoom(roomNumber);
		const multiplier = calculateRoomMultiplier(roomNumber, monsters);
		
		return {
			number: roomNumber,
			monsters,
			completed: false,
			multiplier,
		};
	},
	
	// Vérifie si une salle est complète
	isRoomComplete: (monsters: Monster[]): boolean => {
		return monsters.every(monster => monster.health <= 0);
	},
};