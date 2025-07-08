import { type BookEventHandlerMap } from 'utils-book';
import { stateBet } from 'state-shared';

import { eventEmitter } from './eventEmitter';
import { stateGame, stateGameDerived, gameActions } from './stateGame.svelte';
import { roomUtils, generateMonstersForRoom, calculateRoomMultiplier } from './utils';
import type { BookEvent, BookEventOfType, BookEventContext } from './typesBookEvent';

// Handlers pour les événements du livre
export const bookEventHandlerMap: BookEventHandlerMap<BookEvent, BookEventContext> = {
	// Le héros entre dans une nouvelle salle
	enterRoom: async (bookEvent: BookEventOfType<'enterRoom'>) => {
		const { roomNumber, monsters, multiplier } = bookEvent;
		
		// Mise à jour de l'état
		stateGame.expedition.currentRoom = roomNumber;
		stateGame.activeMonsters = monsters;
		
		// Création de la salle
		const room = {
			number: roomNumber,
			monsters: [...monsters],
			completed: false,
			multiplier,
		};
		
		// Ajouter la salle à l'expédition
		if (stateGame.expedition.rooms.length < roomNumber) {
			stateGame.expedition.rooms.push(room);
		}
		
		// Événements UI
		eventEmitter.broadcast({ type: 'roomEnter', room });
		eventEmitter.broadcast({ type: 'uiUpdateRoom', roomNumber });
		eventEmitter.broadcast({ type: 'uiUpdateMultiplier', multiplier: stateGameDerived.getCurrentMultiplier() });
		
		// Faire apparaître les monstres
		monsters.forEach(monster => {
			eventEmitter.broadcast({ type: 'monsterSpawn', monster });
		});
		
		// Démarrer le combat
		eventEmitter.broadcast({ type: 'combatStart', monsters });
	},

	// Combat contre un monstre
	fightMonster: async (bookEvent: BookEventOfType<'fightMonster'>) => {
		const { monsterId, heroDamage, monsterDamage } = bookEvent;
		
		// Le héros attaque le monstre
		eventEmitter.broadcast({ type: 'heroSetState', state: 'attack' });
		eventEmitter.broadcast({ type: 'heroAttack', targetMonsterId: monsterId });
		
		// Appliquer les dégâts au monstre
		gameActions.updateMonsterHealth(monsterId, 
			stateGame.activeMonsters.find(m => m.id === monsterId)!.health - heroDamage
		);
		
		await eventEmitter.broadcastAsync({ type: 'monsterTakeDamage', monsterId, damage: heroDamage, newHealth: stateGame.activeMonsters.find(m => m.id === monsterId)!.health });
		
		// Si le monstre n'est pas mort, il contre-attaque
		const monster = stateGame.activeMonsters.find(m => m.id === monsterId);
		if (monster && monster.health > 0) {
			eventEmitter.broadcast({ type: 'monsterSetState', monsterId, state: 'attack' });
			eventEmitter.broadcast({ type: 'monsterAttack', monsterId });
			
			// Appliquer les dégâts au héros
			gameActions.updateHeroHealth(stateGame.hero.health - monsterDamage);
			
			await eventEmitter.broadcastAsync({ type: 'heroTakeDamage', damage: monsterDamage, newHealth: stateGame.hero.health });
			eventEmitter.broadcast({ type: 'uiUpdateHealth', health: stateGame.hero.health, maxHealth: stateGame.hero.maxHealth });
		}
		
		// Retour à l'état idle
		eventEmitter.broadcast({ type: 'heroSetState', state: 'idle' });
		if (monster && monster.health > 0) {
			eventEmitter.broadcast({ type: 'monsterSetState', monsterId, state: 'idle' });
		}
	},

	// Défaite d'un monstre
	defeatMonster: async (bookEvent: BookEventOfType<'defeatMonster'>) => {
		const { monsterId, reward, multiplier } = bookEvent;
		
		// Marquer le monstre comme mort
		eventEmitter.broadcast({ type: 'monsterSetState', monsterId, state: 'death' });
		await eventEmitter.broadcastAsync({ type: 'monsterDeath', monsterId });
		
		// Mise à jour des statistiques
		stateGame.stats.monstersDefeated++;
		
		// Ajouter les récompenses
		stateGame.stats.currentMultiplier += multiplier;
		eventEmitter.broadcast({ type: 'uiUpdateMultiplier', multiplier: stateGameDerived.getCurrentMultiplier() });
		
		// Vérifier si tous les monstres sont morts
		if (stateGameDerived.areAllMonstersDead()) {
			const currentRoom = stateGameDerived.getCurrentRoom();
			if (currentRoom) {
				currentRoom.completed = true;
				stateGame.stats.roomsCompleted++;
				eventEmitter.broadcast({ type: 'roomComplete', room: currentRoom });
				eventEmitter.broadcast({ type: 'combatEnd', victory: true });
			}
		}
	},

	// Le héros subît des dégâts
	takeDamage: async (bookEvent: BookEventOfType<'takeDamage'>) => {
		const { damage, remainingHealth } = bookEvent;
		
		gameActions.updateHeroHealth(remainingHealth);
		
		eventEmitter.broadcast({ type: 'heroSetState', state: 'hurt' });
		await eventEmitter.broadcastAsync({ type: 'heroTakeDamage', damage, newHealth: remainingHealth });
		eventEmitter.broadcast({ type: 'uiUpdateHealth', health: remainingHealth, maxHealth: stateGame.hero.maxHealth });
		
		// Si le héros survit, retour à l'état idle
		if (remainingHealth > 0) {
			eventEmitter.broadcast({ type: 'heroSetState', state: 'idle' });
		}
	},

	// Mort du héros
	heroDeath: async (bookEvent: BookEventOfType<'heroDeath'>) => {
		const { finalMultiplier, totalWinnings } = bookEvent;
		
		// Animation de mort
		eventEmitter.broadcast({ type: 'heroSetState', state: 'death' });
		await eventEmitter.broadcastAsync({ type: 'combatEnd', victory: false });
		
		// Fin de l'expédition
		gameActions.endExpedition(totalWinnings);
		eventEmitter.broadcast({ type: 'expeditionEnd', totalWinnings });
		eventEmitter.broadcast({ type: 'uiUpdateWinnings', amount: totalWinnings });
	},

	// Défi du boss
	bossChallenge: async (bookEvent: BookEventOfType<'bossChallenge'>) => {
		const { bossType, currentMultiplier, potentialReward } = bookEvent;
		
		// Activer le défi du boss
		gameActions.activateBossChallenge();
		stateGame.bossChallenge.bossType = bossType;
		stateGame.bossChallenge.potentialReward = potentialReward;
		
		// Afficher l'interface de choix
		eventEmitter.broadcast({ type: 'uiShowBossChallenge', potentialReward });
	},

	// Encaisser les gains
	cashOut: async (bookEvent: BookEventOfType<'cashOut'>) => {
		const { amount, multiplier } = bookEvent;
		
		// Terminer l'expédition avec les gains
		gameActions.endExpedition(amount);
		eventEmitter.broadcast({ type: 'expeditionEnd', totalWinnings: amount });
		eventEmitter.broadcast({ type: 'uiUpdateWinnings', amount });
		eventEmitter.broadcast({ type: 'uiHideBossChallenge' });
	},

	// Combat contre le boss
	fightBoss: async (bookEvent: BookEventOfType<'fightBoss'>) => {
		const { bossType, heroDamage, bossDamage, bossHealth } = bookEvent;
		
		// Le héros attaque le boss
		eventEmitter.broadcast({ type: 'heroSetState', state: 'attack' });
		eventEmitter.broadcast({ type: 'bossSetState', state: 'hurt' });
		
		// Appliquer les dégâts au boss
		stateGame.bossChallenge.bossHealth = bossHealth;
		await eventEmitter.broadcastAsync({ type: 'bossTakeDamage', damage: heroDamage, newHealth: bossHealth });
		
		// Si le boss n'est pas mort, il contre-attaque
		if (bossHealth > 0) {
			eventEmitter.broadcast({ type: 'bossSetState', state: 'attack' });
			eventEmitter.broadcast({ type: 'bossAttack' });
			
			// Appliquer les dégâts au héros
			gameActions.updateHeroHealth(stateGame.hero.health - bossDamage);
			
			await eventEmitter.broadcastAsync({ type: 'heroTakeDamage', damage: bossDamage, newHealth: stateGame.hero.health });
			eventEmitter.broadcast({ type: 'uiUpdateHealth', health: stateGame.hero.health, maxHealth: stateGame.hero.maxHealth });
		}
		
		// Retour à l'état idle
		eventEmitter.broadcast({ type: 'heroSetState', state: 'idle' });
		if (bossHealth > 0) {
			eventEmitter.broadcast({ type: 'bossSetState', state: 'idle' });
		}
	},

	// Victoire contre le boss
	bossVictory: async (bookEvent: BookEventOfType<'bossVictory'>) => {
		const { bossType, finalMultiplier, totalWinnings } = bookEvent;
		
		// Animation de victoire
		eventEmitter.broadcast({ type: 'heroSetState', state: 'victory' });
		eventEmitter.broadcast({ type: 'bossSetState', state: 'death' });
		await eventEmitter.broadcastAsync({ type: 'bossDeath' });
		
		// Fin de l'expédition avec victoire
		gameActions.endExpedition(totalWinnings);
		eventEmitter.broadcast({ type: 'expeditionEnd', totalWinnings });
		eventEmitter.broadcast({ type: 'uiUpdateWinnings', amount: totalWinnings });
		eventEmitter.broadcast({ type: 'uiHideBossChallenge' });
	},

	// Défaite contre le boss
	bossDefeat: async (bookEvent: BookEventOfType<'bossDefeat'>) => {
		const { bossType, lostAmount } = bookEvent;
		
		// Animation de défaite
		eventEmitter.broadcast({ type: 'heroSetState', state: 'death' });
		eventEmitter.broadcast({ type: 'bossSetState', state: 'victory' });
		
		// Fin de l'expédition avec défaite
		gameActions.endExpedition(0);
		eventEmitter.broadcast({ type: 'expeditionEnd', totalWinnings: 0 });
		eventEmitter.broadcast({ type: 'uiUpdateWinnings', amount: 0 });
		eventEmitter.broadcast({ type: 'uiHideBossChallenge' });
	},

	// Mise à jour des gains totaux
	setTotalWin: async (bookEvent: BookEventOfType<'setTotalWin'>) => {
		stateBet.winBookEventAmount = bookEvent.amount;
		eventEmitter.broadcast({ type: 'uiUpdateWinnings', amount: bookEvent.amount });
	},

	// Mise à jour du multiplicateur
	updateMultiplier: async (bookEvent: BookEventOfType<'updateMultiplier'>) => {
		const { multiplier, roomNumber } = bookEvent;
		
		stateGame.stats.currentMultiplier = multiplier;
		eventEmitter.broadcast({ type: 'uiUpdateMultiplier', multiplier });
	},

	// Gains finaux
	finalWin: async (bookEvent: BookEventOfType<'finalWin'>) => {
		const { amount } = bookEvent;
		
		stateGame.stats.totalWinnings = amount;
		eventEmitter.broadcast({ type: 'uiUpdateWinnings', amount });
	},
};