import { getChampions } from "./getchampions";

export interface ChampionInfo {
    id: number;
    // date: Date;
    // date_gmt: Date;
    // guid: GUID;
    // modified: Date;
    // modified_gmt: Date;
    slug: string;
    // status: string;
    // type: string;
    // link: string;
    // title: {
    //     rendered: string;
    // };
    // content: Content;
    // template: string;
    // acf: Acf;
    api_information: APIInformation; // abilities
    // frontend_info: FrontendInfo;
    // relative_champions: RelativeChampions;
    // skins: Skin[];
    cards: Card[]; // talents and cards
    // _links: Links;
}

export interface Links {
    self: About[];
    collection: About[];
    about: About[];
    "wp:attachment": About[];
    curies: Cury[];
}

export interface About {
    href: string;
}

export interface Cury {
    name: string;
    href: string;
    templated: boolean;
}

export interface Acf {
    champion_id: string;
    header_image: boolean;
    teaser_video: string;
    ability_video: string;
    ab_1: string;
    ab_2: string;
    ab_3: string;
    ab_4: string;
    ab_5: string;
    featured_blog_image: boolean;
    title_en_US: string;
    author_en_US: string;
    post_en_US: string;
    title_fr_FR: string;
    author_fr_FR: string;
    post_fr_FR: string;
    title_de_DE: string;
    author_de_DE: string;
    post_de_DE: string;
    title_es_LA: string;
    author_es_LA: string;
    post_es_LA: string;
    title_pl_PL: string;
    author_pl_PL: string;
    post_pl_PL: string;
    title_ru_RU: string;
    author_ru_RU: string;
    post_ru_RU: string;
    title_pt_BR: string;
    author_pt_BR: string;
    post_pt_BR: string;
    title_tr_TR: string;
    author_tr_TR: string;
    post_tr_TR: string;
    title_zh_CN: string;
    author_zh_CN: string;
    post_zh_CN: string;
    color_picker: string;
}

export interface APIInformation {
    Ability1: string;
    Ability2: string;
    Ability3: string;
    Ability4: string;
    Ability5: string;
    AbilityId1: number;
    AbilityId2: number;
    AbilityId3: number;
    AbilityId4: number;
    AbilityId5: number;
    Ability_1: Ability;
    Ability_2: Ability;
    Ability_3: Ability;
    Ability_4: Ability;
    Ability_5: Ability;
    ChampionAbility1_URL: string;
    ChampionAbility2_URL: string;
    ChampionAbility3_URL: string;
    ChampionAbility4_URL: string;
    ChampionAbility5_URL: string;
    ChampionCard_URL: string;
    ChampionIcon_URL: string;
    Cons: string;
    Health: number;
    Lore: string;
    Name: string;
    Name_English: NameEnglish;
    OnFreeRotation: string;
    OnFreeWeeklyRotation: string;
    Pantheon: string;
    Pros: string;
    Roles: string;
    Speed: number;
    Title: string;
    Type: string;
    abilityDescription1: string;
    abilityDescription2: string;
    abilityDescription3: string;
    abilityDescription4: string;
    abilityDescription5: string;
    id: number;
    latestChampion: LatestChampion;
    ret_msg: null;
}

export interface Ability {
    Description: string;
    Id: number;
    Summary: string;
    URL: string;
    damageType: string;
    rechargeSeconds: number;
}

export enum NameEnglish {
    Androxus = "Androxus",
}

export enum LatestChampion {
    N = "n",
}

export interface Card {
    active_flag_activation_schedule: ActiveFlag;
    active_flag_lti: ActiveFlag;
    card_description: string;
    card_id1: number;
    card_id2: number;
    card_name: string;
    card_name_english: string;
    championCard_URL: string;
    championIcon_URL: string;
    championTalent_URL: null | string;
    champion_id: number;
    champion_name: NameEnglish;
    exclusive: LatestChampion;
    rank: number;
    rarity: CardRarity;
    recharge_seconds: number;
    ret_msg: null;
}

export enum ActiveFlag {
    Y = "y",
}

export enum CardRarity {
    Common = "Common",
    Legendary = "Legendary",
}

export interface Content {
    rendered: string;
    protected: boolean;
}

export interface FrontendInfo {
    id: number;
    name: NameEnglish;
    pantheon: string;
    role: string;
    ab_1_name: string;
    ab_2_name: string;
    ab_3_name: string;
    ab_4_name: string;
    ab_5_name: string;
    color_picker: string;
}

export interface RelativeChampions {
    next_champ: Champ;
    next_next_champ: null;
    prev_champ: Champ;
    prev_prev_champ: null;
}

export interface Champ {
    id: number;
    name: null;
    feName: null;
    title: null;
    role: null;
    feRole: null;
    image: null;
    latest: null;
}

export interface Skin {
    champion_id: number;
    champion_name: NameEnglish;
    rarity: SkinRarity;
    ret_msg: null;
    skin_id1: number;
    skin_id2: number;
    skin_name: string;
    skin_name_english: string;
}

export enum SkinRarity {
    Common = "Common",
    Empty = "",
    Epic = "Epic",
    Rare = "Rare",
}



const getChampionsInfo = async (lang = 11) => {
    const heros = (await getChampions()).length;
    const batch_size = 10;

    const responses = Promise.all(new Array(Math.ceil(heros / batch_size)).fill(0).map((_, i) =>
        fetch(`https://cms.paladins.com/wp-json/wp/v2/champions?page=${i + 1}&lang_id=${lang}`)
    ));
    const res = (await responses).map(response => response.json());
    const res2 = await Promise.all(res) as ChampionInfo[][]
    return await res2.flat();
}
export {getChampionsInfo}