import { Scene, SCENES } from './Scene';
import { Item } from './item';

export type Actions = 'shop' | 'adventure'

export interface Player {
    index: number;
    currentScene: Scene;
    previousScene: Scene | null;
    inventory: Item[],
    gold: number,
}

export function initPlayer(index: number): Player {
    return {
        index: index,
        currentScene: SCENES['town'],
        previousScene: null,
        inventory: [],
        gold: 1000,
    }
}