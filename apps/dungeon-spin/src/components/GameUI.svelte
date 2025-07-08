<script lang="ts">
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import config from '../game/config';
	
	const context = getContext();
	
	// État local de l'UI
	let show = $state(true);
	let currentRoom = $state(1);
	let currentMultiplier = $state(1);
	let currentWinnings = $state(0);
	let showBossChallenge = $state(false);
	let bossReward = $state(0);
	
	// Gestion des événements UI
	context.eventEmitter.subscribeOnMount({
		uiShow: () => {
			show = true;
		},
		
		uiHide: () => {
			show = false;
		},
		
		uiUpdateRoom: (emitterEvent) => {
			currentRoom = emitterEvent.roomNumber;
		},
		
		uiUpdateMultiplier: (emitterEvent) => {
			currentMultiplier = emitterEvent.multiplier;
		},
		
		uiUpdateWinnings: (emitterEvent) => {
			currentWinnings = emitterEvent.amount;
		},
		
		uiShowBossChallenge: (emitterEvent) => {
			showBossChallenge = true;
			bossReward = emitterEvent.potentialReward;
		},
		
		uiHideBossChallenge: () => {
			showBossChallenge = false;
		},
	});
</script>

{#if show}
	<Container x={0} y={0}>
		<!-- Panneau supérieur - Statistiques -->
		<Container x={10} y={10}>
			<!-- Fond du panneau -->
			<Sprite
				texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
				width={300}
				height={80}
				anchor={{ x: 0, y: 0 }}
				tint={0x000000}
				alpha={0.7}
			/>
			
			<!-- Salle actuelle -->
			<Text
				text={`Room: ${currentRoom}`}
				anchor={{ x: 0, y: 0 }}
				x={10}
				y={10}
				style={{
					fontFamily: 'Arial',
					fontSize: 16,
					fill: 0xffffff,
					fontWeight: 'bold',
				}}
			/>
			
			<!-- Multiplicateur -->
			<Text
				text={`Multiplier: ${currentMultiplier}x`}
				anchor={{ x: 0, y: 0 }}
				x={10}
				y={30}
				style={{
					fontFamily: 'Arial',
					fontSize: 16,
					fill: 0xf7931e,
					fontWeight: 'bold',
				}}
			/>
			
			<!-- Gains actuels -->
			<Text
				text={`Winnings: ${currentWinnings}`}
				anchor={{ x: 0, y: 0 }}
				x={10}
				y={50}
				style={{
					fontFamily: 'Arial',
					fontSize: 16,
					fill: 0x00ff00,
					fontWeight: 'bold',
				}}
			/>
		</Container>
		
		<!-- Barre de vie du héros -->
		<Container x={10} y={config.canvas.height - 60}>
			<!-- Fond -->
			<Sprite
				texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
				width={200}
				height={30}
				anchor={{ x: 0, y: 0 }}
				tint={0x000000}
				alpha={0.7}
			/>
			
			<!-- Label -->
			<Text
				text="Hero Health"
				anchor={{ x: 0, y: 0 }}
				x={10}
				y={5}
				style={{
					fontFamily: 'Arial',
					fontSize: 12,
					fill: 0xffffff,
				}}
			/>
			
			<!-- Barre de vie -->
			<Container x={10} y={18}>
				<!-- Fond de la barre -->
				<Sprite
					texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
					width={180}
					height={8}
					anchor={{ x: 0, y: 0 }}
					tint={0x333333}
				/>
				
				<!-- Barre de vie active -->
				<Sprite
					texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
					width={180 * (context.stateGame.hero.health / context.stateGame.hero.maxHealth)}
					height={8}
					anchor={{ x: 0, y: 0 }}
					tint={context.stateGame.hero.health > 30 ? 0x00ff00 : 0xff0000}
				/>
			</Container>
		</Container>
		
		<!-- Défi du boss -->
		{#if showBossChallenge}
			<Container x={config.canvas.width / 2 - 150} y={config.canvas.height / 2 - 100}>
				<!-- Fond du modal -->
				<Sprite
					texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
					width={300}
					height={200}
					anchor={{ x: 0, y: 0 }}
					tint={0x000000}
					alpha={0.9}
				/>
				
				<!-- Titre -->
				<Text
					text="🐉 BOSS CHALLENGE 🐉"
					anchor={{ x: 0.5, y: 0 }}
					x={150}
					y={20}
					style={{
						fontFamily: 'Arial',
						fontSize: 20,
						fill: 0xff6b35,
						fontWeight: 'bold',
						align: 'center',
					}}
				/>
				
				<!-- Description -->
				<Text
					text="Face the dragon for massive rewards!"
					anchor={{ x: 0.5, y: 0 }}
					x={150}
					y={50}
					style={{
						fontFamily: 'Arial',
						fontSize: 14,
						fill: 0xffffff,
						align: 'center',
					}}
				/>
				
				<!-- Récompense potentielle -->
				<Text
					text={`Potential Reward: ${bossReward}x`}
					anchor={{ x: 0.5, y: 0 }}
					x={150}
					y={80}
					style={{
						fontFamily: 'Arial',
						fontSize: 16,
						fill: 0xf7931e,
						fontWeight: 'bold',
						align: 'center',
					}}
				/>
				
				<!-- Boutons -->
				<Container x={50} y={120}>
					<!-- Bouton Cash Out -->
					<Container x={0} y={0}>
						<Sprite
							texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
							width={80}
							height={30}
							anchor={{ x: 0, y: 0 }}
							tint={0x00ff00}
							interactive={true}
							onclick={() => context.eventEmitter.broadcast({ type: 'cashOut', amount: currentWinnings, multiplier: currentMultiplier })}
						/>
						<Text
							text="Cash Out"
							anchor={{ x: 0.5, y: 0.5 }}
							x={40}
							y={15}
							style={{
								fontFamily: 'Arial',
								fontSize: 12,
								fill: 0x000000,
								fontWeight: 'bold',
							}}
						/>
					</Container>
					
					<!-- Bouton Fight Boss -->
					<Container x={120} y={0}>
						<Sprite
							texture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
							width={80}
							height={30}
							anchor={{ x: 0, y: 0 }}
							tint={0xff0000}
							interactive={true}
							onclick={() => context.eventEmitter.broadcast({ type: 'fightBoss', bossType: 'dragon', heroDamage: context.stateGame.hero.damage, bossDamage: 40, bossHealth: 300 })}
						/>
						<Text
							text="Fight Boss"
							anchor={{ x: 0.5, y: 0.5 }}
							x={40}
							y={15}
							style={{
								fontFamily: 'Arial',
								fontSize: 12,
								fill: 0xffffff,
								fontWeight: 'bold',
							}}
						/>
					</Container>
				</Container>
			</Container>
		{/if}
	</Container>
{/if}