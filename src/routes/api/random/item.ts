import type { RequestHandler } from "@sveltejs/kit"
import { items, type Item } from "$src/data/items"

export const GET: RequestHandler = ({url}) => {
    const champion = url.searchParams.get("champion");
    const len = items.length;
    let random_item: Item = items[Math.floor(Math.random() * len)];
    while (champion !== null && random_item.incompatible_champions.includes(+champion)) {
        random_item = items[Math.floor(Math.random() * len)];
    }

    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: JSON.stringify({
            item: random_item,
        })
    }
}