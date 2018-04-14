import { Player, Actions } from './Player';
import { Troop } from './Troop';

import * as _ from 'lodash';

const ALLOWED_ACTIONS: Actions[] = ['attack'];

export interface Battle {
    troop: Troop,
};

export function handlePlayerAction(player: Player, action: string, target: number, battle: Battle) {
    if (!_.includes(ALLOWED_ACTIONS, action)) {
        console.log('Unallowed battle action');
    }
    if (!battle.troop.members[target]) {
        console.log('invalid target');
    }
    if (action === 'attack') {
        battle.troop.members[target].hp = battle.troop.members[target].hp - player.stats.attack;
        battle.troop.members.forEach((e) => {
            player.stats.hp = player.stats.hp - e.attack;
        })
    }
}