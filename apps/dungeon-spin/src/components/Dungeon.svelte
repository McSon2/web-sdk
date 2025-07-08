<script lang="ts">
	import { Container, Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import config from '../game/config';
	
	const context = getContext();
	
	// État local du donjon
	let show = $state(true);
</script>

{#if show}
	<Container x={0} y={0}>
		<!-- Arrière-plan du donjon -->
		{#if context.stateApp?.loadedAssets?.background}
			<Sprite
				key={config.assets.background}
				anchor={{ x: 0, y: 0 }}
				width={config.canvas.width}
				height={config.canvas.height}
			/>
		{/if}
		
		<!-- Overlay sombre pour l'atmosphère -->
		<Sprite
			texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
			width={config.canvas.width}
			height={config.canvas.height}
			anchor={{ x: 0, y: 0 }}
			tint={0x000000}
			alpha={0.2}
		/>
	</Container>
{/if}