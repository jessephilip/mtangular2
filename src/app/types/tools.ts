export class Tools {

	// returns a random number between 1 and the given number
	public randomizer = function(max: number): number {
		return Math.floor(Math.random() * max) + 1;
	}

	// simulates a coin flip
	public coinFlip = function():string {
		let result;
		this.randomizer(2) == 1 ? result = 'tails' : result = 'heads';
		return result;
	}

	public coinFlips = function(num:number):Array<string> {
		let array:Array<string> = new Array<string>();

		// perform coin flip num times
		for (let i = 0; i < num; i++) {
			array.push(this.coinFlip());
		}

		// return converted array
		return array;

	}

	// simulates multiple randoms
	public multiple(num: number, max: number):Array<number> {
		let array:Array<number> = new Array<number>();

		// perform randomizer num times
		for (let i = 0; i < num; i++) {
			array.push(this.randomizer(max));
		}

		// return array of results
		return array;
	}
}
