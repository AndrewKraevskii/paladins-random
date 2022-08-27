import { nameToSlug } from "$src/routes/utils";
import { error, json, redirect, type RequestHandler } from "@sveltejs/kit";

interface ChampionInfo {
    id: number;
    name: string;
    feName: string;
    title: string;
    role: string;
    feRole: FeRole;
    image: string;
    latest: 'y' | 'n';
}

enum FeRole {
    PaladinsDamage = "Paladins Damage",
    PaladinsFlanker = "Paladins Flanker",
    PaladinsFrontLine = "Paladins Front Line",
    PaladinsSupport = "Paladins Support",
}

export interface Champion {
    id: number,
    name: string,
    role_slug: string,
    role: string,
    slug: string,
}

export const GET: RequestHandler = async ({ url }) => {
    const lang = url.searchParams.get("lang") ?? "en";
    const lang_id = { "en": 1, "ru": 11 }[lang];
    if (lang_id === undefined) {
        url.searchParams.delete("lang");
        throw redirect(303, url.href);
    }
    try {
        const resp = await fetch(`https://cms.paladins.com/wp-json/api/champion-hub/${lang_id}`);
        const champions: ChampionInfo[] = await resp.json()

        return json(champions.map((champion) => {
            return {
                id: champion.id,
                name: champion.name.trim(),
                role_slug: champion.feRole.trim(),
                role: champion.role.trim(),
                slug: nameToSlug(champion.feName).trim(),
            } as Champion
        }));
    }
    catch (err) {
        throw error(500, "Paladins site did't respond")
    }
}