<script lang="ts">
	import { Container, Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import config from '../game/config';
	
	type Props = {
		canvasWidth?: number;
		canvasHeight?: number;
	};
	
	let { 
		canvasWidth = config.canvas.width,
		canvasHeight = config.canvas.height 
	}: Props = $props();
	
	const context = getContext();
	
	// État local du donjon
	let show = $state(true);
	
	// Calculer les positions et dimensions basées sur les props
	const centerX = $derived(canvasWidth / 2);
	const centerY = $derived(canvasHeight / 2);
	
	
</script>

{#if show}
	<Container x={0} y={0}>
		<!-- Arrière-plan du donjon -->
		{#if context.stateApp?.loadedAssets?.background}
			<Sprite
				key="background"
				anchor={{ x: 0.5, y: 0.5 }}
				x={centerX}
				y={centerY}
				width={canvasWidth}
				height={canvasHeight}
			/>
		{/if}
		
		<!-- Overlay sombre pour l'atmosphère -->
		<Sprite
			texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
			width={canvasWidth}
			height={canvasHeight}
			anchor={{ x: 0.5, y: 0.5 }}
			x={centerX}
			y={centerY}
			tint={0x000000}
			alpha={0.2}
		/>
	</Container>
{/if}