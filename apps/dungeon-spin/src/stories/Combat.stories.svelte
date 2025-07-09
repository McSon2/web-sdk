<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	
	const { Story } = defineMeta({
		title: 'COMPONENTS/Combat',
	});
</script>

<script lang="ts">
	import { StoryPixiApp } from 'components-storybook';
	import { Container } from 'pixi-svelte';
	
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
		<StoryPixiApp {assets} background="#1a1a2e" width={1200} height={675}>
			<!-- Arrière-plan -->
			<Dungeon canvasWidth={1200} canvasHeight={675} />
			
			<!-- Container avec échelle pour les monstres -->
			<Container scale={{ x: 0.3, y: 0.3 }}>
				<!-- Monstre (retourné pour faire face au héros) -->
				<Monster
					id="goblin-1"
					monsterType="goblin"
					size="small"
					health={30}
					maxHealth={30}
					damage={10}
					reward={1}
					x={2100}
					y={2000}
					flipX={true}
				/>
			</Container>
			
			<!-- Héros avec échelle personnalisée plus grande -->
			<Container scale={{ x: 1, y: 1 }}>
				<Hero x={380} y={560} />
			</Container>
			
			<!-- Système de combat -->
			<Combat
				isActive={true}
				roomNumber={1}
				monsters={testMonsters}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

