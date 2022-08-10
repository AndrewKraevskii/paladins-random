import { getChampionsInfo } from "$api/getchampioninfo"


export async function GET() {
    return {
        status: 200,
        body: await getChampionsInfo()
    }
}