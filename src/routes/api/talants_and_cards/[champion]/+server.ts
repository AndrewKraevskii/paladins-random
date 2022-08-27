import { nameToSlug } from "$src/routes/utils";
import { error, json, redirect, type RequestHandler } from "@sveltejs/kit";

interface ChampionInfo {
    slug: string;
    cards: CardOrTalent[];
}

interface CardOrTalent {
    card_name: string;
    card_name_english: string;
    championCard_URL: string;
    championIcon_URL: string;
    championTalent_URL: string;
    champion_id: number;
    rarity: "Common" | "Legendary";
}

export interface Champion {
    id: number;
    slug: string;
    talants: Talant[];
    cards: Card[];
}

export interface Talant {
    slug: string;
    name: string;
}

export interface Card {
    slug: string;
    name: string;
}

export const GET: RequestHandler = async ({ url, params }) => {
    const lang = url.searchParams.get("lang") ?? "en";
    const lang_id = { "en": 1, "ru": 11 }[lang];
    if (lang_id === undefined) {
        url.searchParams.delete("lang");
        throw redirect(303, url.href);
    }

    if (params.champion === "") {
        throw error(500, "wrond")
    }
    try {
        const resp = await fetch(`https://cms.paladins.com/wp-json/wp/v2/champions?slug=${params.champion}&lang_id=${lang_id}`);
        if (!resp.ok) return error(500, "error fetching data")
        const data = await resp.json() as ChampionInfo[];
        if (data.length === 0) return error(500, "error fetching data")
        const info = data[0];
        return json({
            id: info.cards[0].champion_id,
            slug: info.slug,
            talants: info.cards.filter(card => card.rarity === "Legendary").map(card => {
                return {
                    slug: nameToSlug(card.card_name_english),
                    name: card.card_name,
                }
            }),
            cards: info.cards.filter(card => card.rarity === "Common").map(card => {
                return {
                    slug: nameToSlug(card.card_name_english),
                    name: card.card_name,
                }
            })
        });
    }
    catch (err) {
        throw error(500, "Paladins site did't respond")
    }
}