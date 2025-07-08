<script lang="ts" module>
	import type { CharacterState } from '../game/types';
	
	export type EmitterEventHero =
		| { type: 'heroShow' }
		| { type: 'heroHide' }
		| { type: 'heroSetState'; state: CharacterState }
		| { type: 'heroTakeDamage'; damage: number; newHealth: number }
		| { type: 'heroAttack'; targetMonsterId: string }
		| { type: 'heroMove'; x: number; y: number }
		| { type: 'heroSetScale'; x: number; y: number }
		| { type: 'heroReset' };
</script>

<script lang="ts">
	import { Container, Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import config from '../game/config';
	
	type Props = {
		x?: number;
		y?: number;
	};
	let { 
		x = config.positions.hero.x, 
		y = config.positions.hero.y 
	}: Props = $props();
	
	const context = getContext();
	
	// État local du héros
	let show = $state(true);
	let currentState: CharacterState = $state('idle');
	let position = $state({ x, y });
	let scale = $state({ x: 1, y: 1 });
	let tint = $state(0xffffff);
	
	// Gestion des événements
	context.eventEmitter.subscribeOnMount({
		heroShow: () => {
			show = true;
		},
		
		heroHide: () => {
			show = false;
		},
		
		heroSetState: (emitterEvent) => {
			currentState = emitterEvent.state;
			
			// Effets visuels selon l'état
			switch (emitterEvent.state) {
				case 'attack':
					// Animation d'attaque - légère avancée
					position.x += 20;
					setTimeout(() => {
						position.x -= 20;
					}, config.animation.attackDuration / 2);
					break;
					
				case 'hurt':
					// Animation de recul avec tint rouge
					tint = 0xff6666;
					position.x -= 10;
					setTimeout(() => {
						position.x += 10;
						tint = 0xffffff;
					}, config.animation.hurtDuration);
					break;
					
				case 'death':
					// Animation de mort
					scale.y = 0.5;
					tint = 0x666666;
					break;
					
				case 'victory':
					// Animation de victoire
					scale.y = 1.2;
					break;
					
				case 'idle':
				default:
					// Retour à l'état normal
					scale = { x: 1, y: 1 };
					tint = 0xffffff;
					break;
			}
		},
		
		heroTakeDamage: async (emitterEvent) => {
			// Effet de shake
			const originalX = position.x;
			const shakeAmount = 5;
			
			for (let i = 0; i < 6; i++) {
				position.x = originalX + (Math.random() - 0.5) * shakeAmount;
				await new Promise(resolve => setTimeout(resolve, 50));
			}
			
			position.x = originalX;
		},
		
		heroAttack: (emitterEvent) => {
			// Animation d'attaque dirigée vers le monstre
			// Cette fonction peut être étendue pour diriger l'attaque
			currentState = 'attack';
		},
		
		heroMove: (emitterEvent) => {
			position.x = emitterEvent.x;
			position.y = emitterEvent.y;
		},
		
		heroSetScale: (emitterEvent) => {
			scale.x = emitterEvent.x;
			scale.y = emitterEvent.y;
		},
		
		heroReset: () => {
			currentState = 'idle';
			position = { x, y };
			scale = { x: 1, y: 1 };
			tint = 0xffffff;
			show = true;
		},
	});
	
	// Calcul du sprite à afficher selon l'état
	const spriteTexture = $derived.by(() => {
		// Vérifier que les assets sont chargés
		if (!context.stateApp?.loadedAssets) {
			return null;
		}
		
		switch (currentState) {
			case 'attack':
				return config.assets.hero.attack;
			case 'hurt':
				return config.assets.hero.hurt;
			case 'death':
				return config.assets.hero.hurt; // Même sprite que hurt pour l'instant
			case 'victory':
				return config.assets.hero.idle; // Même sprite que idle pour l'instant
			case 'idle':
			default:
				return config.assets.hero.idle;
		}
	});
</script>

{#if show}
	<Container x={position.x} y={position.y} scale={scale}>
		{#if spriteTexture}
			<Sprite
				key={spriteTexture}
				anchor={{ x: 0.5, y: 1 }}
				{tint}
			/>
		{/if}
		
		<!-- Barre de vie au-dessus du héros -->
		{#if context.stateGame.hero.health < context.stateGame.hero.maxHealth}
			<Container x={0} y={-80}>
				<!-- Fond de la barre de vie -->
				<Sprite
					texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
					width={60}
					height={6}
					anchor={{ x: 0.5, y: 0.5 }}
					tint={0x333333}
				/>
				<!-- Barre de vie -->
				<Sprite
					texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
					width={60 * (context.stateGame.hero.health / context.stateGame.hero.maxHealth)}
					height={4}
					anchor={{ x: 0.5, y: 0.5 }}
					tint={0x00ff00}
				/>
			</Container>
		{/if}
	</Container>
{/if}