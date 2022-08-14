<script lang="ts">
import type { Card } from '$src/data/cards';

	import type { Champion } from '$src/data/champions';
	import type { Item } from '$src/data/items';
	import type { Talent } from '$src/data/talents';

	let item: Item | null = null;
	let champion: Champion | null = null;
	let talent: Talent | null = null;
	let cards: Card[] = [];

	async function generateItem() {
		const resp = await fetch(`/api/random/item?champion=${champion?.id}`);
		const data = await resp.json();
		item = data.item;
	}

	async function generateChampion() {
		const resp = await fetch('/api/random/champion');
		const data = await resp.json();
		champion = data.champion;
	}

	async function generateCards() {
		const resp = await fetch(`/api/random/cards?champion=${champion?.id}`);
		const data = await resp.json();
		cards = data.cards;
	}
	async function generateTalent() {
		const resp = await fetch(`/api/random/talent?champion=${champion?.id}`);
		const data = await resp.json();
		talent = data.talent;
	}
	
	async function generateAll() {
		await generateChampion();
		generateCards()
		generateItem()
		generateTalent()
	}
</script>

{#if item}
	<h3>{item.name}</h3>
	<img src={item.image} width="100px" alt={item.name} />
{/if}

{#if champion}
	<h3>{champion.name}</h3>
	<img src={champion.image} width="100px" alt={champion.name} />
{/if}

{#if talent}
	<h3>{talent.name}</h3>
	<img src={talent.image} width="100px" alt={talent.name} />
{/if}
{#each cards as card}
	 <h3>{card.name}: {card.rank}</h3><img src={card.image} alt={card.name} height="20px">
{:else}
{/each}

<button on:click={generateAll}>Generate All</button>
<button on:click={generateItem}>Generate Item</button>
<button on:click={generateChampion}>Generate Champion</button>
<button on:click={generateTalent}>Generate Talent</button>
<button on:click={generateCards}>Generate Cards</button>
