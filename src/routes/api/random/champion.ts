import { champions } from "$src/data/champions";
import type { RequestHandler } from "@sveltejs/kit"


export const GET: RequestHandler = () => {
    const len = champions.length;
    const random_champion = champions[Math.floor(Math.random() * len)];
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: JSON.stringify({
            champion: random_champion
        })
    }
}