const randrange = (start: number, stop: number) => {
	return start + Math.floor(Math.random() * (stop - start));
};

const choice = <T>(list: Array<T>): T => {
	return list[randrange(0, list.length)];
};

const sample = <T>(list: Array<T>, n = 1): T[] => {
	const shuffled = list.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, n);
};

export { randrange, choice, sample };
