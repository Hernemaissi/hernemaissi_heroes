export interface Enemy {
    hp: number,
    attack: number,
    name: string,
};

export const ENEMY_LIST: Enemy[] =
    [
        {
            name: 'bat',
            hp: 5,
            attack: 1,
        }
    ]