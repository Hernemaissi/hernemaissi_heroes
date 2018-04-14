import { Scene, SCENES } from './Scene';
import { Item } from './item';
import { PlayerStats } from './PlayerStats';

export type Actions = 'shop' | 'adventure' | 'attack' | 'battle';

export interface Player {
    index: number;
    currentScene: Scene;
    previousScene: Scene | null;
    inventory: Item[],
    gold: number,
    stats: PlayerStats
}

export function initPlayer(index: number): Player {
    return {
        index: index,
        currentScene: SCENES['town'],
        previousScene: null,
        inventory: [],
        gold: 1000,
        stats: {
            hp: 10,
            attack: 2,
        },
    }
}