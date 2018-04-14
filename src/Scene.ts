import { Actions } from './Player';
import { Battle } from './Battle';

export interface BasicScene {
    name: 'town' | 'shop' | 'adventure' | 'start';
    allowedActions: Actions[];
    allowedTransitions: Scene[];
}

export interface BattleScene  {
    name: 'battle',
    allowedActions: Actions[];
    battle: Battle;
}

export type Scene = BasicScene | BattleScene

export const SCENES: { [name: string]: Scene } = {
    town:
        {
            name: 'town',
            allowedActions: ['shop', 'adventure', 'battle'],
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