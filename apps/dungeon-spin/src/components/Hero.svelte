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
	import { Container, Sprite, AnimatedSprite } from 'pixi-svelte';
	import * as PIXI from 'pixi.js';
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
				case 'walk':
					// Animation de marche - pas d'effet spécial, juste l'animation
					break;
					
				case 'attack':
					// Animation d'attaque - légère avancée
					position.x += 20;
					setTimeout(() => {
						position.x -= 20;
					}, config.animation.attackDuration / 2);
					break;
					
				case 'hurt':
					// Animation de recul avec tint rouge (sans effet de mouvement pour Storybook)
					tint = 0xff6666;
					// Pas d'effet de mouvement pour ne pas perturber l'animation
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
	
	// Calcul de l'animation à utiliser selon l'état
	const animationName = $derived.by(() => {
		switch (currentState) {
			case 'walk':
				return 'hero_walk';
			case 'attack':
				return 'hero_attack';
			case 'hurt':
				return 'hero_hurt';
			case 'death':
				return 'hero_hurt'; // Même animation que hurt pour l'instant
			case 'victory':
				return 'hero_idle'; // Même animation que idle pour l'instant
			case 'idle':
			default:
				return 'hero_idle';
		}
	});
	
	// Récupération des textures d'animation depuis le spritesheet
	const animationTextures = $derived.by(() => {
		if (!context.stateApp?.loadedAssets?.heroSpritesheetFull) {
			return [];
		}
		
		const fullTexture = context.stateApp.loadedAssets.heroSpritesheetFull as PIXI.Texture;
		
		// Calculer la taille des frames basée sur la taille totale de la texture
		const totalWidth = fullTexture.width;
		const totalHeight = fullTexture.height;
		const frameWidth = Math.floor(totalWidth / 4) - 10; // 4 colonnes avec marge
		const frameHeight = Math.floor(totalHeight / 4); // 4 lignes
		
		// Calculer la ligne selon l'animation
		let row = 0;
		switch (animationName) {
			case 'hero_idle':
				row = 0; // Ligne 0 (idle)
				break;
			case 'hero_walk':
				row = 1; // Ligne 1 (walk)
				break;
			case 'hero_attack':
				row = 2; // Ligne 2 (attack)
				break;
			case 'hero_hurt':
				row = 3; // Ligne 3 (hurt)
				break;
		}
		
		// Créer les frames selon le type d'animation
		const frames: PIXI.Texture[] = [];
		
		if (animationName === 'hero_idle') {
			// Pour idle, seulement la première frame (pas d'animation)
			const rect = new PIXI.Rectangle(
				0 * (frameWidth + 1), // Même logique de marge
				row * frameHeight,
				frameWidth,
				frameHeight
			);
			const frameTexture = new PIXI.Texture({
				source: fullTexture.source,
				frame: rect
			});
			frames.push(frameTexture);
		} else {
			// Pour les autres animations, créer les 4 frames de la ligne
			for (let col = 0; col < 4; col++) {
				const rect = new PIXI.Rectangle(
					col * (frameWidth + 1), // Ajouter 1 pixel de marge entre frames
					row * frameHeight,
					frameWidth,
					frameHeight
				);
				const frameTexture = new PIXI.Texture({
					source: fullTexture.source,
					frame: rect
				});
				frames.push(frameTexture);
			}
		}
		
		return frames;
	});
</script>

{#if show}
	<Container x={position.x} y={position.y} scale={scale}>
		{#if animationTextures.length > 0}
			<AnimatedSprite
				textures={animationTextures}
				anchor={{ x: 0.5, y: 1 }}
				{tint}
				animationSpeed={0.1}
				loop={animationTextures.length > 1}
				play={animationTextures.length > 1}
				onComplete={() => {
					// Empêcher le retour automatique à idle pour certains états
					if (currentState === 'hurt' || currentState === 'attack' || currentState === 'walk') {
						// Ne rien faire, garder l'état actuel
					}
				}}
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