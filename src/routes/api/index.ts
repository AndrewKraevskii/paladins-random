import { getChampionsInfo, type ChampionInfo } from "$api/getchampioninfo"

let data: ChampionInfo[] | null = null;

export async function GET() {
    if (data === null) 
    {
        data = await getChampionsInfo();
        setTimeout(() => {

        }, 3600 * 1000)
    }
    return {
        status: 200,
        headers: {
            'cache-control': 'public, max-age=3600'
        },
        body: data
    }
}