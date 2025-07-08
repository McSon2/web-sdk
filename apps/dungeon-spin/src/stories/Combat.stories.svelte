<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	
	const { Story } = defineMeta({
		title: 'COMPONENTS/Combat',
	});
</script>

<script lang="ts">
	import { StoryPixiApp } from 'components-storybook';
	
	import assets from '../game/assets';
	import { setContext } from '../game/context';
	import Dungeon from '../components/Dungeon.svelte';
	import Hero from '../components/Hero.svelte';
	import Monster from '../components/Monster.svelte';
	import Combat from '../components/Combat.svelte';
	
	setContext();
	
	// Données de test pour les monstres
	const testMonsters = [
		{
			id: 'goblin-1',
			type: 'goblin',
			size: 'small',
			health: 30,
			maxHealth: 30,
			damage: 10,
			reward: 1,
			position: { x: 600, y: 420 },
			state: 'idle'
		}
	];
</script>

<Story name="Combat Room 1">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<!-- Arrière-plan -->
			<Dungeon />
			
			<!-- Héros -->
			<Hero />
			
			<!-- Monstre -->
			<Monster
				id="goblin-1"
				monsterType="goblin"
				size="small"
				health={30}
				maxHealth={30}
				damage={10}
				reward={1}
				x={600}
				y={420}
			/>
			
			<!-- Système de combat -->
			<Combat
				isActive={true}
				roomNumber={1}
				monsters={testMonsters}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Combat Room 3 - Medium Monster">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<!-- Arrière-plan -->
			<Dungeon />
			
			<!-- Héros -->
			<Hero />
			
			<!-- Monstre -->
			<Monster
				id="orc-1"
				monsterType="orc"
				size="medium"
				health={80}
				maxHealth={80}
				damage={18}
				reward={2}
				x={580}
				y={380}
			/>
			
			<!-- Système de combat -->
			<Combat
				isActive={true}
				roomNumber={3}
				monsters={[{
					id: 'orc-1',
					type: 'orc',
					size: 'medium',
					health: 80,
					maxHealth: 80,
					damage: 18,
					reward: 2,
					position: { x: 580, y: 380 },
					state: 'idle'
				}]}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>