<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'COMPONENTS/Game',
	});
</script>

<script lang="ts">
	import { StoryLocale } from 'components-storybook';
	
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	
	// Configuration du contexte pour Storybook
	setContext();
</script>

<Story name="component">
	{#snippet template()}
		<StoryLocale lang="en">
			<Game />
		</StoryLocale>
	{/snippet}
</Story>

<Story name="skipLoadingScreen">
	{#snippet template()}
		<StoryLocale lang="en">
			<Game skipLoadingScreen={true} />
		</StoryLocale>
	{/snippet}
</Story>