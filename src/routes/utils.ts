export const nameToSlug = (name: string) => name.trim().toLocaleLowerCase().replaceAll(' ', '-')
    .replace("'s", "s")
    .replace("'s", "s");

export const choice = <T>(items: T[]): T => {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}

export const multyChoice = <T>(items: T[], N: number): T[] => {
    return items.sort(() => Math.random() - 0.5).slice(0, N);
}

export const cardsRanks = () => {
    let nums = null;
    while (1) {
        nums = new Array(5).fill(5).map((_) => Math.floor(Math.random() * 5 + 1));
        if (nums.reduce((p, c) => p + c) === 15) return nums;
    }
    return [];
}