<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'COMPONENTS/Monster',
	});
</script>

<script lang="ts">
	import { StoryPixiApp } from 'components-storybook';
	import { onMount } from 'svelte';
	
	import Monster from '../components/Monster.svelte';
	import assets from '../game/assets';
	import { setContext, getContext } from '../game/context';
	
	// Configuration du contexte pour Storybook
	setContext();
	const context = getContext();
	
	// Override position and scale for better Storybook display
	const centerMonster = (monsterId: string) => {
		if (context.eventEmitter) {
			context.eventEmitter.broadcast({ 
				type: 'monsterMove', 
				monsterId,
				x: 400, // Center horizontally (800/2)
				y: 550  // Center vertically (considering anchor is bottom-center)
			});
		}
	};
	
	const scaleMonster = (monsterId: string) => {
		if (context.eventEmitter) {
			context.eventEmitter.broadcast({ 
				type: 'monsterSetScale', 
				monsterId,
				x: 0.5, // Reduce to 50% size
				y: 0.5
			});
		}
	};
	
	onMount(() => {
		// Center and scale monsters once assets are loaded
		setTimeout(() => centerMonster('goblin-idle'), 100);
		setTimeout(() => scaleMonster('goblin-idle'), 200);
	});
</script>

<Story name="Goblin Idle">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Monster
				id="goblin-idle"
				monsterType="goblin"
				size="small"
				health={30}
				maxHealth={30}
				damage={10}
				reward={1}
				x={400}
				y={400}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Goblin Attack">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Monster
				id="goblin-attack"
				monsterType="goblin"
				size="small"
				health={30}
				maxHealth={30}
				damage={10}
				reward={1}
				x={400}
				y={400}
			/>
			{#if context.eventEmitter}
				{onMount(() => {
					// Center and scale goblin for attack story
					setTimeout(() => centerMonster('goblin-attack'), 100);
					setTimeout(() => scaleMonster('goblin-attack'), 200);
					setTimeout(() => {
						context.eventEmitter.broadcast({ type: 'monsterSetState', monsterId: 'goblin-attack', state: 'attack' });
					}, 1000);
				})}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Orc Idle">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Monster
				id="orc-idle"
				monsterType="orc"
				size="medium"
				health={80}
				maxHealth={80}
				damage={18}
				reward={2}
				x={400}
				y={500}
			/>
			{#if context.eventEmitter}
				{onMount(() => {
					setTimeout(() => centerMonster('orc-idle'), 100);
					setTimeout(() => scaleMonster('orc-idle'), 200);
				})}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Orc Attack">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Monster
				id="orc-attack"
				monsterType="orc"
				size="medium"
				health={80}
				maxHealth={80}
				damage={18}
				reward={2}
				x={400}
				y={500}
			/>
			{#if context.eventEmitter}
				{onMount(() => {
					setTimeout(() => centerMonster('orc-attack'), 100);
					setTimeout(() => scaleMonster('orc-attack'), 200);
					setTimeout(() => {
						context.eventEmitter.broadcast({ type: 'monsterSetState', monsterId: 'orc-attack', state: 'attack' });
					}, 1000);
				})}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Troll Idle">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Monster
				id="troll-idle"
				monsterType="troll"
				size="large"
				health={150}
				maxHealth={150}
				damage={30}
				reward={3}
				x={400}
				y={500}
			/>
			{#if context.eventEmitter}
				{onMount(() => {
					setTimeout(() => centerMonster('troll-idle'), 100);
					setTimeout(() => scaleMonster('troll-idle'), 200);
				})}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Troll Attack">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Monster
				id="troll-attack"
				monsterType="troll"
				size="large"
				health={150}
				maxHealth={150}
				damage={30}
				reward={3}
				x={400}
				y={500}
			/>
			{#if context.eventEmitter}
				{onMount(() => {
					setTimeout(() => centerMonster('troll-attack'), 100);
					setTimeout(() => scaleMonster('troll-attack'), 200);
					setTimeout(() => {
						context.eventEmitter.broadcast({ type: 'monsterSetState', monsterId: 'troll-attack', state: 'attack' });
					}, 1000);
				})}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>