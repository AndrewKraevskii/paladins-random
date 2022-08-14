export interface Item {
    name: string;
    image: string;
    incompatible_champions: number[];
}

export const items: Item[] = [
    {
        name: "Illuminate",
        incompatible_champions: [],
        image: "paladins/items/illuminate.png"
    },
    {
        name: "Resilience",
        incompatible_champions: [],
        image: "paladins/items/resilience.png"
    },
    {
        name: "Guardian",
        incompatible_champions: [2147, 2551, 2549, 2548, 2205, 2512, 2550, 2541, 2285, 2480, 2393, 2536, 2254, 2093, 2431, 2420, 2495, 2277, 2094, 2509, 2348, 2267, 2517, 2249, 2493, 2281, 2092, 2362, 2417, 2338, 2481, 2303, 2540, 2056, 2528, 2542, 2543, 2372, 2057, 2438, 2314, 2472, 2529, 2491, 2307],
        image: "paladins/items/guardian.png"
    },
    {
        name: "Haven",
        incompatible_champions: [],
        image: "paladins/items/haven.png"
    },
    {
        name: "Nimble",
        incompatible_champions: [2538],
        image: "paladins/items/nimble.png"
    },
    {
        name: "Master Riding",
        incompatible_champions: [2538],
        image: "paladins/items/master-riding.png"
    },
    {
        name: "Morale Boost",
        incompatible_champions: [],
        image: "paladins/items/morale-boost.png"
    },
    {
        name: "Chronos",
        incompatible_champions: [],
        image: "paladins/items/chronos.png"
    },
    {
        name: "Kill to Heal",
        incompatible_champions: [],
        image: "paladins/items/kill-to-heal.png"
    },
    {
        name: "Life Rip",
        incompatible_champions: [],
        image: "paladins/items/life-rip.png"
    },
    {
        name: "Rejuvenate",
        incompatible_champions: [],
        image: "paladins/items/rejuvenate.png"
    },
    {
        name: "Veteran",
        incompatible_champions: [],
        image: "paladins/items/veteran.png"
    },
    {
        name: "Bulldozer",
        incompatible_champions: [],
        image: "paladins/items/bulldozer.png"
    },
    {
        name: "Deft Hands",
        incompatible_champions: [2254, 2548, 2509, 2481, 2477, 2307, 2538],
        image: "paladins/items/deft-hands.png"
    },
    {
        name: "Lethality",
        incompatible_champions: [],
        image: "paladins/items/lethality.png"
    },
    {
        name: "Wrecker",
        incompatible_champions: [],
        image: "paladins/items/wrecker.png"
    },
]
