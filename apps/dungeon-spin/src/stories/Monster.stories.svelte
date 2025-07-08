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
	
	// Debug: Vérifions ce qui se passe
	let debugInfo = $state('Initializing...');
	
	onMount(() => {
		const checkAssets = () => {
			if (context.stateApp?.loadedAssets) {
				debugInfo = `Assets loaded: ${Object.keys(context.stateApp.loadedAssets).join(', ')}`;
			} else {
				debugInfo = `Assets not loaded yet. stateApp: ${context.stateApp ? 'exists' : 'null'}`;
				setTimeout(checkAssets, 500);
			}
		};
		checkAssets();
	});
</script>

<Story name="Goblin Small">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Monster
				id="goblin-1"
				monsterType="goblin"
				size="small"
				health={30}
				maxHealth={30}
				damage={10}
				reward={1}
				x={400}
				y={400}
			/>
			<!-- Debug info -->
			<div style="position: absolute; top: 10px; left: 10px; color: white; font-size: 12px; background: rgba(0,0,0,0.5); padding: 5px;">
				Debug: {debugInfo}
			</div>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Orc Medium">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Monster
				id="orc-1"
				monsterType="orc"
				size="medium"
				health={80}
				maxHealth={80}
				damage={18}
				reward={2}
				x={400}
				y={500}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Troll Large">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Monster
				id="troll-1"
				monsterType="troll"
				size="large"
				health={150}
				maxHealth={150}
				damage={30}
				reward={3}
				x={400}
				y={500}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="Injured Goblin">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Monster
				id="injured-goblin"
				monsterType="goblin"
				size="small"
				health={10}
				maxHealth={30}
				damage={10}
				reward={1}
				x={400}
				y={500}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>