import type { Bet } from '../../game/typesBookEvent';
import type { Monster } from '../../game/types';

// Exemple de monstres pour les tests
const createTestMonster = (id: string, type: 'goblin' | 'orc' | 'troll' = 'goblin'): Monster => ({
	id,
	type,
	size: 'small',
	health: 30,
	maxHealth: 30,
	damage: 10,
	reward: 1,
	position: { x: 600, y: 420 },
	state: 'idle',
});

// Livre de test pour une expédition basique
export const baseBooks: Bet[] = [
	{
		id: 1,
		payoutMultiplier: 5.0,
		state: [
			{
				index: 0,
				type: 'enterRoom',
				roomNumber: 1,
				monsters: [createTestMonster('monster1')],
				multiplier: 2,
			},
			{
				index: 1,
				type: 'fightMonster',
				monsterId: 'monster1',
				heroDamage: 25,
				monsterDamage: 10,
			},
			{
				index: 2,
				type: 'defeatMonster',
				monsterId: 'monster1',
				reward: 1,
				multiplier: 2,
			},
			{
				index: 3,
				type: 'setTotalWin',
				amount: 20,
			},
			{
				index: 4,
				type: 'finalWin',
				amount: 20,
			},
		],
		criteria: '1 room cleared',
		baseGameWins: 20.0,
		freeGameWins: 0.0,
	},
	{
		id: 2,
		payoutMultiplier: 0.0,
		state: [
			{
				index: 0,
				type: 'enterRoom',
				roomNumber: 1,
				monsters: [createTestMonster('monster1'), createTestMonster('monster2')],
				multiplier: 3,
			},
			{
				index: 1,
				type: 'fightMonster',
				monsterId: 'monster1',
				heroDamage: 25,
				monsterDamage: 15,
			},
			{
				index: 2,
				type: 'takeDamage',
				damage: 15,
				remainingHealth: 85,
			},
			{
				index: 3,
				type: 'fightMonster',
				monsterId: 'monster2',
				heroDamage: 25,
				monsterDamage: 20,
			},
			{
				index: 4,
				type: 'takeDamage',
				damage: 20,
				remainingHealth: 65,
			},
			{
				index: 5,
				type: 'fightMonster',
				monsterId: 'monster1',
				heroDamage: 25,
				monsterDamage: 15,
			},
			{
				index: 6,
				type: 'takeDamage',
				damage: 35,
				remainingHealth: 30,
			},
			{
				index: 7,
				type: 'heroDeath',
				finalMultiplier: 0,
				totalWinnings: 0,
			},
			{
				index: 8,
				type: 'finalWin',
				amount: 0,
			},
		],
		criteria: 'Hero died in room 1',
		baseGameWins: 0.0,
		freeGameWins: 0.0,
	},
];

export default baseBooks;