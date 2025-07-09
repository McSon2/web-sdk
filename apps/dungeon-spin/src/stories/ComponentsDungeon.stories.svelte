<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'COMPONENTS/Dungeon',
	});
</script>

<script lang="ts">
	import { StoryPixiApp } from 'components-storybook';
	
	import Dungeon from '../components/Dungeon.svelte';
	import assets from '../game/assets';
	import { setContext } from '../game/context';
	
	// Configuration du contexte pour Storybook
	setContext();
	
</script>

<Story name="Background">
	{#snippet template()}
		<StoryPixiApp {assets} background="#1a1a2e" width={1200} height={675}>
			<Dungeon canvasWidth={1200} canvasHeight={675} />
		</StoryPixiApp>
	{/snippet}
</Story>