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
	
	// Override position and scale for better Storybook display
	const centerHero = () => {
		if (context.eventEmitter) {
			context.eventEmitter.broadcast({ 
				type: 'heroMove', 
				x: 400, // Center horizontally (800/2)
				y: 550  // Center vertically (considering anchor is bottom-center)
			});
		}
	};
	
	const scaleHero = () => {
		if (context.eventEmitter) {
			context.eventEmitter.broadcast({ 
				type: 'heroSetScale', 
				x: 0.5, // Reduce to 50% size
				y: 0.5
			});
		}
	};
	
	onMount(() => {
		// Center and scale hero once assets are loaded
		setTimeout(centerHero, 100);
		setTimeout(scaleHero, 200);
	});
</script>

<Story name="idle">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Hero />
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="walk">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Hero />
			{#if context.eventEmitter}
				{onMount(() => {
					// Center and scale hero for walk story
					setTimeout(centerHero, 100);
					setTimeout(scaleHero, 200);
					setTimeout(() => {
						context.eventEmitter.broadcast({ type: 'heroSetState', state: 'walk' });
					}, 1000);
				})}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="attack">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Hero />
			{#if context.eventEmitter}
				{onMount(() => {
					// Center and scale hero for attack story
					setTimeout(centerHero, 100);
					setTimeout(scaleHero, 200);
					setTimeout(() => {
						context.eventEmitter.broadcast({ type: 'heroSetState', state: 'attack' });
					}, 1000);
				})}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="hurt">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={800} height={600}>
			<Hero />
			{#if context.eventEmitter}
				{onMount(() => {
					// Center and scale hero for hurt story
					setTimeout(centerHero, 100);
					setTimeout(scaleHero, 200);
					setTimeout(() => {
						context.eventEmitter.broadcast({ type: 'heroSetState', state: 'hurt' });
					}, 1000);
				})}
			{/if}
		</StoryPixiApp>
	{/snippet}
</Story>