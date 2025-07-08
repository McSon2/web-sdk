<script lang="ts" module>
	import type { CharacterState, MonsterType, MonsterSize } from '../game/types';
	
	export type EmitterEventMonster =
		| { type: 'monsterShow'; monsterId: string }
		| { type: 'monsterHide'; monsterId: string }
		| { type: 'monsterSetState'; monsterId: string; state: CharacterState }
		| { type: 'monsterTakeDamage'; monsterId: string; damage: number; newHealth: number }
		| { type: 'monsterAttack'; monsterId: string; targetType: 'hero' }
		| { type: 'monsterDeath'; monsterId: string; reward: number }
		| { type: 'monsterReset'; monsterId: string };

	export interface MonsterProps {
		id: string;
		monsterType: MonsterType;
		size: MonsterSize;
		health: number;
		maxHealth: number;
		damage: number;
		reward: number;
		x?: number;
		y?: number;
	}
</script>

<script lang="ts">
	import { Container, Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import config from '../game/config';
	
	type Props = MonsterProps;
	let {
		id,
		monsterType,
		size,
		health = $bindable(),
		maxHealth,
		damage,
		reward,
		x = config.positions.monsters[size].x,
		y = config.positions.monsters[size].y
	}: Props = $props();
	
	const context = getContext();
	
	// État local du monstre
	let show = $state(true);
	let currentState: CharacterState = $state('idle');
	let position = $state({ x, y });
	let scale = $state({ x: 1, y: 1 });
	let tint = $state(0xffffff);
	
	// Gestion des événements
	context.eventEmitter.subscribeOnMount({
		monsterShow: (emitterEvent) => {
			if (emitterEvent.monsterId === id) {
				show = true;
			}
		},
		
		monsterHide: (emitterEvent) => {
			if (emitterEvent.monsterId === id) {
				show = false;
			}
		},
		
		monsterSetState: (emitterEvent) => {
			if (emitterEvent.monsterId === id) {
				currentState = emitterEvent.state;
				
				// Effets visuels selon l'état
				switch (emitterEvent.state) {
					case 'attack':
						// Animation d'attaque - légère avancée vers le héros
						position.x -= 20;
						setTimeout(() => {
							position.x += 20;
						}, config.animation.attackDuration / 2);
						break;
						
					case 'hurt':
						// Animation de recul avec tint rouge
						tint = 0xff6666;
						position.x += 10;
						setTimeout(() => {
							position.x -= 10;
							tint = 0xffffff;
						}, config.animation.hurtDuration);
						break;
						
					case 'death':
						// Animation de mort
						scale.y = 0.5;
						tint = 0x666666;
						setTimeout(() => {
							show = false;
						}, config.animation.deathDuration);
						break;
						
					case 'idle':
					default:
						// Retour à l'état normal
						scale = { x: 1, y: 1 };
						tint = 0xffffff;
						break;
				}
			}
		},
		
		monsterTakeDamage: async (emitterEvent) => {
			if (emitterEvent.monsterId === id) {
				health = emitterEvent.newHealth;
				
				// Effet de shake
				const originalX = position.x;
				const shakeAmount = 3;
				
				for (let i = 0; i < 4; i++) {
					position.x = originalX + (Math.random() - 0.5) * shakeAmount;
					await new Promise(resolve => setTimeout(resolve, 50));
				}
				
				position.x = originalX;
				
				// Vérifier si le monstre est mort
				if (health <= 0) {
					context.eventEmitter.emit({
						type: 'monsterDeath',
						monsterId: id,
						reward
					});
				}
			}
		},
		
		monsterAttack: (emitterEvent) => {
			if (emitterEvent.monsterId === id) {
				currentState = 'attack';
			}
		},
		
		monsterDeath: (emitterEvent) => {
			if (emitterEvent.monsterId === id) {
				currentState = 'death';
			}
		},
		
		monsterReset: (emitterEvent) => {
			if (emitterEvent.monsterId === id) {
				currentState = 'idle';
				position = { x, y };
				scale = { x: 1, y: 1 };
				tint = 0xffffff;
				show = true;
				health = maxHealth;
			}
		}
	});
	
	// Calcul du sprite à afficher selon le type, la taille et l'état
	const spriteTexture = $derived.by(() => {
		// Vérifier que les assets sont chargés
		if (!context.stateApp?.loadedAssets) {
			return null;
		}
		
		// Sélectionner le bon asset selon le type de monstre et son état
		const assetKey = currentState === 'attack' 
			? config.assets.monsters[monsterType].attack
			: config.assets.monsters[monsterType].idle;
		
		return assetKey;
	});
	
	// Calcul de l'échelle selon la taille du monstre
	const monsterScale = $derived(() => {
		const baseScale = scale;
		const sizeMultiplier = size === 'small' ? 0.8 : size === 'medium' ? 1.0 : 1.3;
		
		return {
			x: baseScale.x * sizeMultiplier,
			y: baseScale.y * sizeMultiplier
		};
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
		
		<!-- Barre de vie au-dessus du monstre (seulement si blessé) -->
		{#if health < maxHealth && health > 0}
			<Container x={0} y={-60}>
				<!-- Fond de la barre de vie -->
				<Sprite
					texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
					width={40}
					height={4}
					anchor={{ x: 0.5, y: 0.5 }}
					tint={0x333333}
				/>
				<!-- Barre de vie -->
				<Sprite
					texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
					width={40 * (health / maxHealth)}
					height={3}
					anchor={{ x: 0.5, y: 0.5 }}
					tint={0xff0000}
				/>
			</Container>
		{/if}
	</Container>
{/if}