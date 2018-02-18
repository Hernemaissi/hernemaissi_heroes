import { Actions } from './Player';

export interface Scene {
    name: string;
    allowedActions: Actions[];
    allowedTransitions: Scene[];
}

export const SCENES: {[name: string]: Scene} = {
    town:
        {
            name: 'town',
            allowedActions: ['shop', 'adventure'],
            allowedTransitions: []
        },
    shop:
        {
            name: 'shop',
            allowedActions: ['shop', 'adventure'],
            allowedTransitions: []
        },
    adventure:
        {
            name: 'adventure',
            allowedActions: ['shop', 'adventure'],
            allowedTransitions: []
        }
    }