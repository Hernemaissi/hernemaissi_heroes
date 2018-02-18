import * as _ from 'lodash';

import { Player } from './Player';
import { Item, ITEMS } from './Item'; 

export interface BuySuccess {
    kind: 'success',
    player: Player,
    item: Item,
}

export interface BuyFailure {
    kind: 'failure',
    reason: string,
}

export function buyItem(strIndex: string, player: Player): BuySuccess | BuyFailure {
    const index = parseInt(strIndex, 10);
    if (isNaN(index)) {
        return {
            kind: 'failure',
            reason: 'malformed query',
        };
    }
    if (player.currentScene.name !== 'shop') {
        return {
            kind: 'failure',
            reason: 'No mail service here, buddy',
        };
    }
    if (index < 0 || index >= ITEMS.length) {
        return {
            kind:'failure',
            reason: 'Outside index range',
        };
    }
    const item = ITEMS[index];
    if (player.gold < item.price ) {
        return {
            kind: 'failure',
            reason: 'Not enough money',
        };
    }
    let newPlayer = _.cloneDeep(player);
    newPlayer.gold = newPlayer.gold - item.price;
    newPlayer.inventory.push(item);
    return {
        kind: 'success',
        player: newPlayer,
        item: item,
    };
}