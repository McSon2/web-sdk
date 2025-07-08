import { createEventEmitter } from 'utils-event-emitter';
import type { EmitterEventGame } from './typesEmitterEvent';

// Import des types d'événements partagés
import type { EmitterEventUi } from 'components-ui-pixi';
import type { EmitterEventHotKey } from 'components-shared';

// Union type de tous les événements
export type EmitterEvent = EmitterEventUi | EmitterEventHotKey | EmitterEventGame;

// Création de l'event emitter
export const { eventEmitter } = createEventEmitter<EmitterEvent>();