export interface Champion {
    id:     number;
    name:   string;
    feName: string;
    title:  string;
    role:   Role;
    feRole: Role;
    image:  string;
    latest: Latest;
}

export enum Role {
    PaladinsDamage = "Paladins Damage",
    PaladinsFlanker = "Paladins Flanker",
    PaladinsFrontLine = "Paladins Front Line",
    PaladinsSupport = "Paladins Support",
}

export enum Latest {
    N = "n",
    Y = "y",
}


const getChampions = async () => {
    const res = await fetch("https://cms.paladins.com/wp-json/api/champion-hub/1");
    if (!res.ok) {
        throw new Error(await res.json())
    }
    return await res.json() as Champion[];
}
const getTalents = () => {

}
// const getChampions = () => {

// }

export { getChampions }