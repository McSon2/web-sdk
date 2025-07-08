<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'COMPONENTS/Monster',
	});
</script>

<script lang="ts">
	import { StoryPixiApp } from 'components-storybook';
	
	import Monster from '../components/Monster.svelte';
	import assets from '../game/assets';
	import { setContext } from '../game/context';
	
	setContext();
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
				y={400}
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
				y={400}
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
				y={400}
			/>
		</StoryPixiApp>
	{/snippet}
</Story>