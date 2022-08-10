<script lang="ts">
	import type { Card, ChampionInfo } from '$api/getchampioninfo';
	import { choice, randrange, sample } from '$lib/utils';

	export let champions: ChampionInfo[];
	let champion: {
		name: string;
        talent: string;
        cards: Card[];
        nums: number[]
	} | null = null;

    function getRandomNumbers(n: number, start: number, stop: number) {
        let nums = null;
        while (1) {
            nums = new Array(n).fill(n).map(_=> randrange(start, stop + 1));
            if (nums.reduce((p, c)=>p+c) === (start + stop) / 2 * n) return nums;
        }
        return []
    }

	function getRandom() {
		const c = choice(champions);
		const name = c.api_information.Name;
		const talant = choice(c.cards.filter(card => card.rarity === "Legendary"));
        const cards = sample(c.cards.filter(card => card.rarity === "Common"), 5);
        champion = {
            name,
            talent: talant.card_name,
            cards,
            nums: getRandomNumbers(5, 1, 5)
        }
	}
</script>

{#if champion !== null}
	Name: {champion.name}<br/>
    Talent: {champion.talent}<br/>
    Cards: 
    {#each champion.cards as card, index}
         {card.card_name}:{champion.nums[index]}, 
    {/each}<br/>
{/if}

<button on:click={getRandom}>Get random</button>
