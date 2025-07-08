<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'COMPONENTS/Hero',
	});
</script>

<script lang="ts">
	import { StoryPixiApp } from 'components-storybook';
	import { onMount } from 'svelte';
	
	import Hero from '../components/Hero.svelte';
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

<Story name="idle">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Hero />
			<!-- Debug info -->
			<div style="position: absolute; top: 10px; left: 10px; color: white; font-size: 12px; background: rgba(0,0,0,0.5); padding: 5px;">
				Debug: {debugInfo}
			</div>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="attack">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Hero />
			{#if context.eventEmitter}
				{onMount(() => {
					setTimeout(() => {
						context.eventEmitter.broadcast({ type: 'heroSetState', state: 'attack' });
					}, 1000);
				})}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>