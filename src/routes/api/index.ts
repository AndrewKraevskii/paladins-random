import { getChampionsInfo } from "$api/getchampioninfo"


export async function GET() {
    return {
        status: 200,
        headers: {
            'cache-control': 'public, max-age=3600'
        },
        body: await getChampionsInfo()
    }
}