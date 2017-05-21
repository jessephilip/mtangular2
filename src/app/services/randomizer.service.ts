// NOTE: Use arrow functions to preserve this context
export class RandomizerService {

	// returns a random number between 1 and the given number
	public randomNumber = (max: number): number => {
		return Math.floor(Math.random() * max) + 1;
	}

	// simulates a coin flip
	public coinFlip = (): string => {
		return this.randomNumber(2) === 1 ? 'Tails' : 'Heads';
	}

	// simulates a planar die roll
	public planar = () => {
		switch (this.randomNumber(6)) {
			case 1:
				return 'Planeswalker';
			case 2:
				return 'Chaos';
			default:
				return 'Blank';
		}
	}

	// perform passed function num times.
	public multi = (num: number, func): any[] => {
		const results: any[] = [];
		for (let i = 0; i < num; i++) {
			results.push(func());
		}
		return results;
	}
}
