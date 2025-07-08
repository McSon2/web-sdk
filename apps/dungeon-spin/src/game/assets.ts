// Helper function to get asset path - works differently in Storybook vs dev/prod
const getAssetPath = (path: string) => {
	// In Storybook, staticDirs makes assets available at root
	if (typeof window !== 'undefined' && window.location.port === '6002') {
		return path.replace('../../assets/', '/assets/');
	}
	// In dev/prod, use the standard URL resolution
	return new URL(`../../assets/${path.replace('../../assets/', '')}`, import.meta.url).href;
};

export default {
	// Arrière-plan
	background: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/background.png'),
		preload: true,
	},

	// Héros
	heroIdle: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/hero_idle.png'),
		preload: true,
	},
	heroAttack: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/hero_attack.png'),
		preload: true,
	},
	heroHurt: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/hero_hurt.png'),
		preload: true,
	},

	// Monstres - Gobelin
	goblinIdle: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/goblin_idle.png'),
		preload: true,
	},
	goblinAttack: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/goblin_attack.png'),
		preload: true,
	},

	// Monstres manquants - Pour l'instant on duplique goblin
	orcIdle: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/goblin_idle.png'),
		preload: true,
	},
	orcAttack: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/goblin_attack.png'),
		preload: true,
	},
	trollIdle: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/goblin_idle.png'),
		preload: true,
	},
	trollAttack: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/goblin_attack.png'),
		preload: true,
	},
	dragonIdle: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/goblin_idle.png'),
		preload: true,
	},
	dragonAttack: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/goblin_attack.png'),
		preload: true,
	},

	// Interface utilisateur
	heart: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/heart.png'),
		preload: true,
	},
	sword: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/sword.png'),
		preload: true,
	},
	coin: {
		type: 'sprite',
		src: getAssetPath('../../assets/sprites/coin.png'),
		preload: true,
	},
} as const;