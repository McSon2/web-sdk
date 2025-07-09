<script lang="ts">
	import { onMount } from 'svelte';
	
	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Text, REM, Container } from 'pixi-svelte';
	import { stateModal } from 'state-shared';
	
	import { UI, UiGameName } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';
	
	import { getContext } from '../game/context';
	import Dungeon from './Dungeon.svelte';
	import Hero from './Hero.svelte';
	import Monster from './Monster.svelte';
	import Combat from './Combat.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import GameUI from './GameUI.svelte';
	import config from '../game/config';
	import type { Monster as MonsterType } from '../game/types';
	
	type Props = {
		skipLoadingScreen?: boolean;
		canvasWidth?: number;
		canvasHeight?: number;
	};
	
	let { 
		skipLoadingScreen = false,
		canvasWidth = config.canvas.width,
		canvasHeight = config.canvas.height 
	}: Props = $props();
	
	const context = getContext();
	
	// État du jeu
	let currentRoom = $state(1);
	let combatActive = $state(false);
	let roomMonsters: MonsterType[] = $state([]);
	
	// Générer les monstres pour la salle actuelle
	function generateRoomMonsters(roomNumber: number): MonsterType[] {
		const monsters: MonsterType[] = [];
		
		// Logique simple de génération de monstres selon la salle
		if (roomNumber <= 2) {
			// Salles 1-2: Petits monstres
			monsters.push({
				id: `goblin-${roomNumber}-1`,
				type: 'goblin',
				size: 'small',
				health: config.monsters.goblin.small.health,
				maxHealth: config.monsters.goblin.small.health,
				damage: config.monsters.goblin.small.damage,
				reward: config.monsters.goblin.small.reward,
				position: { x: config.positions.monsters.small.x, y: config.positions.monsters.small.y },
				state: 'idle'
			});
		} else if (roomNumber <= 4) {
			// Salles 3-4: Mélange petit/moyen
			monsters.push({
				id: `orc-${roomNumber}-1`,
				type: 'orc',
				size: 'medium',
				health: config.monsters.orc.medium.health,
				maxHealth: config.monsters.orc.medium.health,
				damage: config.monsters.orc.medium.damage,
				reward: config.monsters.orc.medium.reward,
				position: { x: config.positions.monsters.medium.x, y: config.positions.monsters.medium.y },
				state: 'idle'
			});
		} else {
			// Salle 5+: Gros monstres
			monsters.push({
				id: `troll-${roomNumber}-1`,
				type: 'troll',
				size: 'large',
				health: config.monsters.troll.large.health,
				maxHealth: config.monsters.troll.large.health,
				damage: config.monsters.troll.large.damage,
				reward: config.monsters.troll.large.reward,
				position: { x: config.positions.monsters.large.x, y: config.positions.monsters.large.y },
				state: 'idle'
			});
		}
		
		return monsters;
	}
	
	// Démarrer une nouvelle salle
	function startRoom(roomNumber: number) {
		currentRoom = roomNumber;
		roomMonsters = generateRoomMonsters(roomNumber);
		combatActive = true;
		
		context.eventEmitter.broadcast({
			type: 'enterRoom',
			roomNumber,
			monsters: roomMonsters,
			multiplier: roomNumber
		});
	}
	
	// Gestion des événements de combat
	context.eventEmitter.subscribeOnMount({
		combatEnd: (emitterEvent) => {
			combatActive = false;
			
			if (emitterEvent.victory) {
				// Victoire - passer à la salle suivante
				setTimeout(() => {
					startRoom(currentRoom + 1);
				}, 2000);
			} else {
				// Défaite - fin du jeu
				console.log('Game Over!');
			}
		}
	});
	
	onMount(() => {
		context.stateLayout.showLoadingScreen = !skipLoadingScreen;
		
		// Démarrer la première salle après le chargement
		setTimeout(() => {
			if (!context.stateLayout.showLoadingScreen) {
				startRoom(1);
			}
		}, 1000);
	});
</script>

<App>
	<EnableHotkey />
	<EnablePixiExtension />
	
	<!-- Arrière-plan du donjon -->
	<Dungeon {canvasWidth} {canvasHeight} />
	
	{#if context.stateLayout.showLoadingScreen}
		<LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} {canvasWidth} {canvasHeight} />
	{:else}
		<MainContainer>
			<!-- Héros avec échelle personnalisée plus grande -->
			<Container scale={{ x: 1, y: 1 }}>
				<Hero x={380} y={560} />
			</Container>
			
			<!-- Container avec échelle pour les monstres -->
			<Container scale={{ x: 0.3, y: 0.3 }}>
				<!-- Monstres de la salle actuelle -->
				{#each roomMonsters as monster (monster.id)}
					<Monster
						id={monster.id}
						monsterType={monster.type}
						size={monster.size}
						bind:health={monster.health}
						maxHealth={monster.maxHealth}
						damage={monster.damage}
						reward={monster.reward}
						x={2100}
						y={2000}
						flipX={true}
					/>
				{/each}
			</Container>
			
			<!-- Système de combat -->
			<Combat
				isActive={combatActive}
				roomNumber={currentRoom}
				monsters={roomMonsters}
			/>
			
			<!-- Interface utilisateur du jeu -->
			<GameUI />
		</MainContainer>
		
		<!-- UI principale de Stake Engine -->
		<UI>
			{#snippet gameName()}
				<UiGameName name="DUNGEON SPIN" />
			{/snippet}
			{#snippet logo()}
				<Text
					anchor={{ x: 1, y: 0 }}
					text="⚔️ DUNGEON SPIN"
					style={{
						fontFamily: 'proxima-nova',
						fontSize: REM * 1.5,
						fontWeight: '600',
						lineHeight: REM * 2,
						fill: 0xffffff,
					}}
				/>
			{/snippet}
		</UI>
	{/if}
</App>

<Modals>
	{#snippet version()}
		<GameVersion version="0.1.0" />
	{/snippet}
</Modals>