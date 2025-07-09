<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'COMPONENTS/Game',
	});
</script>

<script lang="ts">
	import { StoryPixiApp, StoryLocale } from 'components-storybook';
	
	import Game from '../components/Game.svelte';
	import assets from '../game/assets';
	import { setContext } from '../game/context';
	
	// Configuration du contexte pour Storybook
	setContext();
</script>

<Story name="component">
	{#snippet template()}
		<StoryLocale lang="en">
			<StoryPixiApp {assets} background="#1a1a2e" width={1200} height={675}>
				<Game canvasWidth={1200} canvasHeight={675} />
			</StoryPixiApp>
		</StoryLocale>
	{/snippet}
</Story>

<Story name="skipLoadingScreen">
	{#snippet template()}
		<StoryLocale lang="en">
			<StoryPixiApp {assets} background="#1a1a2e" width={1200} height={675}>
				<Game skipLoadingScreen={true} canvasWidth={1200} canvasHeight={675} />
			</StoryPixiApp>
		</StoryLocale>
	{/snippet}
</Story>