import { setContextEventEmitter, getContextEventEmitter } from 'utils-event-emitter';
import { setContextXstate, getContextXstate } from 'utils-xstate';
import { setContextLayout, getContextLayout } from 'utils-layout';
import { setContextApp, getContextApp } from 'pixi-svelte';

import { eventEmitter, type EmitterEvent } from './eventEmitter';
import { stateGame, stateGameDerived, gameActions } from './stateGame.svelte';
import { stateApp } from './stateApp';
import { stateLayout, stateLayoutDerived } from './stateLayout';
import { stateXstate, stateXstateDerived } from './stateXstate';

// Configuration du contexte pour Dungeon Spin
export const setContext = () => {
	// Configuration des contextes
	setContextEventEmitter<EmitterEvent>({ eventEmitter });
	setContextXstate({ stateXstate, stateXstateDerived });
	setContextLayout({ stateLayout, stateLayoutDerived });
	setContextApp({ stateApp });
};

// Hook pour récupérer le contexte
export const getContext = () => {
	const eventEmitterContext = getContextEventEmitter<EmitterEvent>();
	const xstateContext = getContextXstate();
	const layoutContext = getContextLayout();
	const appContext = getContextApp();

	return {
		stateGame,
		stateGameDerived,
		gameActions,
		...eventEmitterContext,
		...xstateContext,
		...layoutContext,
		...appContext,
	};
};