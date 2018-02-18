export interface Item {
    id: number,
    price: number,
    name: string,
    description: string,
}

export const ITEMS: Item[] = [
    {
        id: 1,
        price: 100,
        name: 'Potion',
        description: 'Heals for some maybe',
    }
]