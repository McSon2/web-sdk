<script lang="ts">
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import config from '../game/config';
	
	interface Props {
		onloaded: () => void;
		canvasWidth?: number;
		canvasHeight?: number;
	}
	
	const { 
		onloaded,
		canvasWidth = config.canvas.width,
		canvasHeight = config.canvas.height 
	}: Props = $props();
	const context = getContext();
	
	// Simule le chargement
	let loadingProgress = $state(0);
	let loadingText = $state('Loading...');
	
	// Animation de chargement
	const startLoading = () => {
		const interval = setInterval(() => {
			loadingProgress += Math.random() * 10;
			
			if (loadingProgress >= 100) {
				loadingProgress = 100;
				loadingText = 'Click to enter the dungeon!';
				clearInterval(interval);
			}
		}, 100);
	};
	
	// Démarrer le chargement
	startLoading();
	
	// Gérer le clic pour continuer
	const handleClick = () => {
		if (loadingProgress >= 100) {
			onloaded();
		}
	};
</script>

<Container x={0} y={0}>
	<!-- Fond noir -->
	<Sprite
		texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
		width={canvasWidth}
		height={canvasHeight}
		anchor={{ x: 0, y: 0 }}
		tint={0x000000}
		interactive={true}
		onclick={handleClick}
	/>
	
	<!-- Titre du jeu -->
	<Text
		text="⚔️ DUNGEON SPIN ⚔️"
		anchor={{ x: 0.5, y: 0.5 }}
		x={canvasWidth / 2}
		y={canvasHeight / 2 - 100}
		style={{
			fontFamily: 'Arial',
			fontSize: 48,
			fontWeight: 'bold',
			fill: 0xffffff,
			align: 'center',
		}}
	/>
	
	<!-- Sous-titre -->
	<Text
		text="Where every spin is a quest!"
		anchor={{ x: 0.5, y: 0.5 }}
		x={canvasWidth / 2}
		y={canvasHeight / 2 - 50}
		style={{
			fontFamily: 'Arial',
			fontSize: 24,
			fill: 0xcccccc,
			align: 'center',
		}}
	/>
	
	<!-- Barre de progression -->
	<Container x={canvasWidth / 2 - 150} y={canvasHeight / 2 + 50}>
		<!-- Fond de la barre -->
		<Sprite
			texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
			width={300}
			height={20}
			anchor={{ x: 0, y: 0 }}
			tint={0x333333}
		/>
		
		<!-- Barre de progression -->
		<Sprite
			texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
			width={300 * (loadingProgress / 100)}
			height={20}
			anchor={{ x: 0, y: 0 }}
			tint={0xff6b35}
		/>
	</Container>
	
	<!-- Texte de chargement -->
	<Text
		text={loadingText}
		anchor={{ x: 0.5, y: 0.5 }}
		x={canvasWidth / 2}
		y={canvasHeight / 2 + 100}
		style={{
			fontFamily: 'Arial',
			fontSize: 18,
			fill: 0xffffff,
			align: 'center',
		}}
	/>
	
	<!-- Pourcentage -->
	<Text
		text={`${Math.floor(loadingProgress)}%`}
		anchor={{ x: 0.5, y: 0.5 }}
		x={canvasWidth / 2}
		y={canvasHeight / 2 + 130}
		style={{
			fontFamily: 'Arial',
			fontSize: 14,
			fill: 0xcccccc,
			align: 'center',
		}}
	/>
</Container>