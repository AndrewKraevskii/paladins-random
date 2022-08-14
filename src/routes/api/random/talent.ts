import { talents, type Talent } from "$src/data/talents";
import type { RequestHandler } from "@sveltejs/kit"


export const GET: RequestHandler = ({ url }) => {
    const champion = url.searchParams.get("champion");
    let random_talents: Talent;

    if (champion === null) {
        const len = talents.length;
        random_talents = talents[Math.floor(Math.random() * len)]
    }
    else {
        const number_of_talents_per_champ = 3;
        random_talents = talents.filter(talent => talent.champion_id === +champion)[Math.floor(Math.random() * number_of_talents_per_champ)];
    }
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: JSON.stringify({
            talent: random_talents
        })
    }
}