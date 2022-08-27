import { error, type Load } from "@sveltejs/kit";

export const load: Load = ({url}) => {
    const lang = url.searchParams.get("lang") ?? "en";
    const lang_id = { "en": 1, "ru": 11 }[lang];
    if (lang_id === undefined) {
        url.searchParams.delete("lang");
        throw error(405, "wrong lang");
    }
    return {
        lang
    }
}