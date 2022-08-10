<script lang="ts">
	import type { Card, ChampionInfo } from '$lib/paladins_api/getchampioninfo';
	import { choice, randrange, sample } from '$lib/utils';

	export let champions: ChampionInfo[];
	let champion: {
		name: string;
		talent: string;
        cards: {
            name: string;
            level: number
        }[];
		items: string[];
	} | null = null;

	function getRandomNumbers(n: number, start: number, stop: number) {
		let nums = null;
		while (1) {
			nums = new Array(n).fill(n).map((_) => randrange(start, stop + 1));
			if (nums.reduce((p, c) => p + c) === ((start + stop) / 2) * n) return nums;
		}
		return [];
	}

	function getRandom() {
		const c = choice(champions);
		const name = c.api_information.Name;
		const talant = choice(c.cards.filter((card) => card.rarity === 'Legendary'));
		const cards = sample(
			c.cards.filter((card) => card.rarity === 'Common'),
			5
		);
		let items = [
			'Освещение',
			'Устойчивость',
			'Страж',
			'Укрытие',
			'Гибкость',
			'Мастер Езды',
			'Боевой Дух',
			'Хронос',
			'Целебные Убийства',
			'Вырывание Жизни',
			'Омоложение',
			'Ветеран',
			'Бульдозер',
			'Ловкие пальцы',
			'Смертоносность',
			'Крушитель'
		];
		if (
			[
				'Бак',
				'Лилит',
				'VII',
				'Азаан',
				'Андроксус',
				'Атлас',
				'Бетти Ля Бомба',
				'Вату',
				'Виктро',
				'Вивиан',
				'Вилло',
				'Вора',
				'Гровер',
				'Грок',
				'Дженос',
				'Дзин',
				'Дредж',
				'Дрогоз',
				'Иви',
				'Имани',
				'Инара',
				'Инь',
				'Ио',
				'Кинесса',
				'Кога',
				'Король Бомб',
				'Кэсси',
				'Лекс',
				'Лиан',
				'Мейв',
				'Моджи',
				'Мэл Дэмба',
				'Октавия',
				'Пип',
				'Раум',
				'Рей',
				'Саати',
				'Серис',
				'Скай',
				'Стрикс',
				'Тайра',
				'Талус',
				'Тибериус',
				'Фурия',
				'Ша Линь'
			].includes(c.api_information.Name)
		) {
			items = items.filter((name) => name !== 'Страж');
		}
		if (
			['Гровер', 'Азаан', 'Имани', 'Моджи', 'Терминус', 'Ша Линь', 'Ягорат'].includes(
				c.api_information.Name
			)
		) {
			items = items.filter((name) => name !== 'Ловкие Пальцы');
		}
		if (['Ягорат'].includes(c.api_information.Name)) {
			items = items.filter((name) => name !== 'Гибкость');
			items = items.filter((name) => name !== 'Мастер Езды');
		}

		items = sample(items, 4);
        const nums = getRandomNumbers(5, 1, 5);
		champion = {
			name,
			talent: talant.card_name,
			cards: cards.map((card, index)=>{return {name: card.card_name, level: nums[index]};}),
			items
		};
	}
</script>

{#if champion !== null}
	Name: {champion.name}<br />
	Talent: {champion.talent}<br />
	Cards:
	{#each champion.cards as card}
		{card.name}:{card.level},
	{/each}<br />
	Items:
	{#each champion.items as item, index}
		{item},
	{/each}<br />
{/if}

<button on:click={getRandom}>Get random</button>
