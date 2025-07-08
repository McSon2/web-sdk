<script lang="ts" module>
	export type EmitterEventCombat =
		| { type: 'combatStart'; roomNumber: number }
		| { type: 'combatEnd'; roomNumber: number; victory: boolean }
		| { type: 'combatRound'; attacker: 'hero' | 'monster'; targetId?: string }
		| { type: 'combatTurn'; currentTurn: 'hero' | 'monster' }
		| { type: 'combatPause' }
		| { type: 'combatResume' };
</script>

<script lang="ts">
	import { getContext } from '../game/context';
	import config from '../game/config';
	import type { Monster } from '../game/types';
	
	interface Props {
		isActive?: boolean;
		roomNumber?: number;
		monsters?: Monster[];
	}
	
	let {
		isActive = false,
		roomNumber = 1,
		monsters = []
	}: Props = $props();
	
	const context = getContext();
	
	// État du combat
	let combatActive = $state(false);
	let currentTurn: 'hero' | 'monster' = $state('hero');
	let combatTimer: number | null = $state(null);
	let roundCount = $state(0);
	
	// Statistiques du combat
	let aliveMonsters = $derived(monsters.filter(m => m.health > 0));
	let allMonstersDead = $derived(aliveMonsters.length === 0);
	let heroAlive = $derived(context.stateGame.hero.health > 0);
	
	// Démarrer le combat quand activé
	$effect(() => {
		if (isActive && monsters.length > 0 && !combatActive) {
			startCombat();
		} else if (!isActive && combatActive) {
			endCombat();
		}
	});
	
	// Vérifier les conditions de fin de combat
	$effect(() => {
		if (combatActive) {
			if (allMonstersDead && heroAlive) {
				// Victoire du héros
				setTimeout(() => {
					context.eventEmitter.broadcast({
						type: 'combatEnd',
						roomNumber,
						victory: true
					});
					endCombat();
				}, 1000);
			} else if (!heroAlive) {
				// Défaite du héros
				setTimeout(() => {
					context.eventEmitter.broadcast({
						type: 'combatEnd',
						roomNumber,
						victory: false
					});
					endCombat();
				}, 1000);
			}
		}
	});
	
	function startCombat() {
		combatActive = true;
		currentTurn = 'hero';
		roundCount = 0;
		
		context.eventEmitter.broadcast({
			type: 'combatStart',
			roomNumber
		});
		
		// Démarrer le premier tour
		startTurn();
	}
	
	function endCombat() {
		combatActive = false;
		if (combatTimer) {
			clearTimeout(combatTimer);
			combatTimer = null;
		}
	}
	
	function startTurn() {
		if (!combatActive) return;
		
		context.eventEmitter.broadcast({
			type: 'combatTurn',
			currentTurn
		});
		
		// Délai avant l'action (pour l'animation)
		combatTimer = setTimeout(() => {
			if (currentTurn === 'hero') {
				heroAttack();
			} else {
				monsterAttack();
			}
		}, 800);
	}
	
	function heroAttack() {
		if (!combatActive || aliveMonsters.length === 0) return;
		
		// Sélectionner un monstre aléatoire vivant
		const targetMonster = aliveMonsters[Math.floor(Math.random() * aliveMonsters.length)];
		
		// Animation d'attaque du héros
		context.eventEmitter.broadcast({
			type: 'heroSetState',
			state: 'attack'
		});
		
		context.eventEmitter.broadcast({
			type: 'heroAttack',
			targetMonsterId: targetMonster.id
		});
		
		// Dégâts au monstre après un délai
		setTimeout(() => {
			const newHealth = Math.max(0, targetMonster.health - context.stateGame.hero.damage);
			
			context.eventEmitter.broadcast({
				type: 'monsterTakeDamage',
				monsterId: targetMonster.id,
				damage: context.stateGame.hero.damage,
				newHealth
			});
			
			if (newHealth <= 0) {
				context.eventEmitter.broadcast({
					type: 'monsterSetState',
					monsterId: targetMonster.id,
					state: 'death'
				});
			} else {
				context.eventEmitter.broadcast({
					type: 'monsterSetState',
					monsterId: targetMonster.id,
					state: 'hurt'
				});
			}
			
			// Retour à l'état idle après l'attaque
			setTimeout(() => {
				context.eventEmitter.broadcast({
					type: 'heroSetState',
					state: 'idle'
				});
				
				if (newHealth > 0) {
					context.eventEmitter.broadcast({
						type: 'monsterSetState',
						monsterId: targetMonster.id,
						state: 'idle'
					});
				}
				
				// Tour suivant
				nextTurn();
			}, 500);
			
		}, config.animation.attackDuration / 2);
	}
	
	function monsterAttack() {
		if (!combatActive || !heroAlive || aliveMonsters.length === 0) return;
		
		// Sélectionner un monstre aléatoire pour attaquer
		const attacker = aliveMonsters[Math.floor(Math.random() * aliveMonsters.length)];
		
		// Animation d'attaque du monstre
		context.eventEmitter.broadcast({
			type: 'monsterSetState',
			monsterId: attacker.id,
			state: 'attack'
		});
		
		context.eventEmitter.broadcast({
			type: 'monsterAttack',
			monsterId: attacker.id,
			targetType: 'hero'
		});
		
		// Dégâts au héros après un délai
		setTimeout(() => {
			const newHealth = Math.max(0, context.stateGame.hero.health - attacker.damage);
			
			context.eventEmitter.broadcast({
				type: 'heroTakeDamage',
				damage: attacker.damage,
				newHealth
			});
			
			if (newHealth <= 0) {
				context.eventEmitter.broadcast({
					type: 'heroSetState',
					state: 'death'
				});
			} else {
				context.eventEmitter.broadcast({
					type: 'heroSetState',
					state: 'hurt'
				});
			}
			
			// Retour à l'état idle après l'attaque
			setTimeout(() => {
				context.eventEmitter.broadcast({
					type: 'monsterSetState',
					monsterId: attacker.id,
					state: 'idle'
				});
				
				if (newHealth > 0) {
					context.eventEmitter.broadcast({
						type: 'heroSetState',
						state: 'idle'
					});
				}
				
				// Tour suivant
				nextTurn();
			}, 500);
			
		}, config.animation.attackDuration / 2);
	}
	
	function nextTurn() {
		if (!combatActive) return;
		
		roundCount++;
		
		// Alterner les tours
		currentTurn = currentTurn === 'hero' ? 'monster' : 'hero';
		
		// Démarrer le prochain tour après un court délai
		setTimeout(() => {
			startTurn();
		}, 1000);
	}
	
	// Gestion des événements de combat
	context.eventEmitter.subscribeOnMount({
		combatPause: () => {
			if (combatTimer) {
				clearTimeout(combatTimer);
				combatTimer = null;
			}
		},
		
		combatResume: () => {
			if (combatActive) {
				startTurn();
			}
		},
		
		monsterDeath: (emitterEvent) => {
			// Le monstre mort est automatiquement retiré par le derived aliveMonsters
			console.log(`Monster ${emitterEvent.monsterId} died, reward: ${emitterEvent.reward}`);
		}
	});
</script>

<!-- Le composant Combat est invisible - il gère seulement la logique -->
{#if combatActive}
	<!-- Indicator visuel optionnel du combat actif -->
	<div style="position: absolute; top: 10px; left: 10px; color: white; font-size: 12px;">
		Combat Room {roomNumber} - Round {roundCount} - Turn: {currentTurn}
		<br />
		Monsters alive: {aliveMonsters.length}
		<br />
		Hero HP: {context.stateGame.hero.health}/{context.stateGame.hero.maxHealth}
	</div>
{/if}