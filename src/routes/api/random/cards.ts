import { cards, type Card } from "$src/data/cards";
import type { RequestHandler } from "@sveltejs/kit"

function getRandomNumbers(n: number, start: number, stop: number, sum: number) {
    let nums = null;
    while (1) {
        nums = new Array(n).fill(n).map((_) => Math.floor(start + Math.random() * (stop + 1 - start)));
        if (nums.reduce((p, c) => p + c) === sum) return nums;
    }
    return [];
}

export const GET: RequestHandler = ({ url }) => {
    const champion = url.searchParams.get("champion");

    if (champion === null) return { status: 400 };
    console.log(+champion);

    const numbers = getRandomNumbers(5, 1, 5, 15);
    const random_cards: Card[] = cards.filter(card => card.champion_id === +champion).sort(() => Math.random() - 0.5).slice(0, 5);
    random_cards.forEach((card, index) => card.rank = numbers[index])

    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: JSON.stringify({
            cards: random_cards
        })
    }
}

