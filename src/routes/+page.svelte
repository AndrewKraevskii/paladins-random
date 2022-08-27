<script lang="ts">
	import type { Champion } from '$src/routes/api/champions/+server';
	import type { Champion as CardInfo } from '$src/routes/api/talants_and_cards/[champion]/+server';
import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { cardsRanks, choice, multyChoice } from './utils';

	export let data: { lang: string };
	const { lang } = data;

	let champions: Champion[] | null = null;

	let random_data: {
		champion: {
			slug: string;
			name: string;
			image: string;
		};
		talant: {
			name: string;
			image: string;
		};
		cards: {
			name: string;
			image: string;
			rank: number;
		}[];
	} | null = null;

	let generating = false;

	
	async function genCards() {
		if (random_data === null || generating) return;
		generating = true;
		try {

			const cardinfo = (await (
				await fetch(`/api/talants_and_cards/${random_data.champion.slug}?lang=${lang}`)
				).json()) as CardInfo;
				const random_cards = multyChoice(cardinfo.cards, 5);
				const ranks = cardsRanks();
				random_data!.cards = random_cards.map((card, index) => ({
					name: card.name,
					image: `https://webcdn.hirezstudios.com/paladins/champion-cards/${card.slug}.jpg`,
					rank: ranks[index]
				}))
				random_data = random_data;
				generating = false;
		} catch {
			generating = false;
			setTimeout(genCards, 0);
		}
	}
	async function getRandom() {
		if (generating) return;
		generating = true;

		try {

			if (champions === null) {
				champions = await (await fetch(`/api/champions?lang=${lang}`)).json();
			}
			const champion = choice(champions!);
			const cardinfo = (await (
				await fetch(`/api/talants_and_cards/${champion.slug}?lang=${lang}`)
			).json()) as CardInfo;
	
			const talant = choice(cardinfo.talants);
			const random_cards = multyChoice(cardinfo.cards, 5);
			const ranks = cardsRanks();
			random_data = {
				champion: {
					name: champion.name,
					image: `https://webcdn.hirezstudios.com/paladins/champion-icons/${champion.slug}.jpg`,
					slug: champion.slug
				},
				talant: {
					name: talant.name,
					image: `https://webcdn.hirezstudios.com/paladins/champion-legendaries-badge/${talant.slug}.png`
				},
				cards: random_cards.map((card, index) => ({
					name: card.name,
					image: `https://webcdn.hirezstudios.com/paladins/champion-cards/${card.slug}.jpg`,
					rank: ranks[index]
				}))
			};
			generating = false;
		} catch {
			generating = false;
			setTimeout(getRandom, 0);
		}
	}

	onMount(() => {
		getRandom();
	});
</script>

<main class="flex flex-col items-center">
	<div class="container bg-teal-600 text-white">
		<div class="flex flex-col items-center m-4 space-y-4">
			<div class="flex space-x-3">
				<img class="w-44" src={random_data?.champion.image} alt={random_data?.champion.name} />
				<span class="text-2xl self-center">{random_data?.champion.name ?? ''}</span>
			</div>
			<div class="flex">
				<img class="w-24" src={random_data?.talant.image} alt={random_data?.talant.name} />
				<span class="text-xl self-center">{random_data?.talant.name ?? ''}</span>
			</div>
			<div>
				<ul class="space-y-2">
					{#each random_data?.cards ?? [] as card}
						<li class="flex space-x-3">
							<span class="text-4xl self-center">{card.rank}</span>
							<img class="w-24 h-20" src={card.image} alt={card.name} />
							<span class="self-center">{card.name}</span>
						</li>
					{/each}
				</ul>
			</div>
			{#if generating || random_data === null}
				<span class="text-4xl">⟳</span>
			{:else}
				<button class="bg-cyan-800 p-2" disabled={generating} on:click={getRandom}
					>{lang !== 'ru' ? 'Randomize All' : 'Рандомизировать всё'}</button
				>
				<button class="bg-cyan-800 p-2" disabled={generating} on:click={genCards}
					>{lang !== 'ru' ? 'Randomize Cards' : 'Рандомизировать карты'}</button
				>
			{/if}
		</div>
	</div>
</main>
