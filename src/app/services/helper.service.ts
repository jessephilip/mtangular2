export class HelperService {

	public createId (): number {
		return Date.now() + Math.floor(Math.random() * 1000000) + 1;
	}

	/** API HELPERS */
	public stringBuilder (input: string[]): string {
		let string = '';
		input.forEach(value => string += value + ',');
		string = string.substring(0, string.length - 1);
		return string;
	}

	/** CARD HELPERS */

	/**
	 * Returns an array of colors pulled from the colorIdentity, text, and/or the casting colors of an MtgApi.io card
	 * @public
	 * @param {any} card = Accepts an MTG card as delivered from MtgApi.io
	 * @returns {string[]}
	 */
	public getColorIdentity (card): string[] {
		const basicColorTags = [
			'{W', 'W}',
			'{U', 'U}',
			'{B', 'B}',
			'{R', 'R}',
			'{G', 'G}'
		],	cardIdentity = card.colors ? card.colors : []
		;

		let colorIdentity = card.colorIdentity ? card.colorIdentity : [];

		if (colorIdentity.length === 0) {

			basicColorTags.forEach(value => {
				switch (value) {
					case '{W':
					case 'W}':
						if (card.text.indexOf(value) > 0) {
							if (colorIdentity.indexOf('W') === -1) { colorIdentity.push('W'); }
						}
					break;
					case '{U':
					case 'U}':
						if (card.text.indexOf(value) > 0) {
							if (colorIdentity.indexOf('U') === -1) { colorIdentity.push('U'); }
						}
					break;
					case '{B':
					case 'B}':
						if (card.text.indexOf(value) > 0) {
							if (colorIdentity.indexOf('L') === -1) { colorIdentity.push('L'); }
						}
					break;
					case '{R':
					case 'R}':
						if (card.text.indexOf(value) > 0) {
							if (colorIdentity.indexOf('R') === -1) { colorIdentity.push('R'); }
						}
					break;
					case '{G':
					case 'G}':
						if (card.text.indexOf(value) > 0) {
							if (colorIdentity.indexOf('G') === -1) { colorIdentity.push('G'); }
						}
					break;
				}
			});

			if (cardIdentity) {
				cardIdentity.forEach(value => {
					switch (value) {
						case 'White':
							if (colorIdentity.indexOf('W') === -1) { colorIdentity.push('W'); }
						break;
						case 'Blue':
							if (colorIdentity.indexOf('U') === -1) { colorIdentity.push('U'); }
						break;
						case 'Black':
							if (colorIdentity.indexOf('L') === -1) { colorIdentity.push('L'); }
						break;
						case 'Red':
							if (colorIdentity.indexOf('R') === -1) { colorIdentity.push('R'); }
						break;
						case 'Green':
							if (colorIdentity.indexOf('G') === -1) { colorIdentity.push('G'); }
						break;
					}
				});
			}
		}

		colorIdentity = this.convertColorTags(colorIdentity);

		return colorIdentity;
	}

	/**
	 * Used in the colorIdentity function. Converts the tag symbols to english colors.
	 * {W} = White, {U} = Blue, {B/L} = Black, {Red}, {Green}
	 *
	 * @public
	 * @param {string[]} array
	 * @returns {string[]}
	 *
	 * @memberof DeckManagerComponent
	 */
	public convertColorTags (array: string[]): string[] {
		const colorTags = [];
		const replaceBlack = array.indexOf('B');
		if (replaceBlack !== -1) { array[replaceBlack] = 'L'; }

		array.forEach(value => {
			if (value === 'W' && colorTags.indexOf('White') === -1) { colorTags.push('White'); }
			if (value === 'U' && colorTags.indexOf('Blue') === -1) { colorTags.push('Blue'); }
			if (value === 'L' && colorTags.indexOf('Black') === -1) { colorTags.push('Black'); }
			if (value === 'R' && colorTags.indexOf('Red') === -1) { colorTags.push('Red'); }
			if (value === 'G' && colorTags.indexOf('Green') === -1) { colorTags.push('Green'); }
		});

		return colorTags;
	}

	/**
	 * ExcludeColors evaluates the cards given to it and the color scheme that list should fit and filters out those
	 * cards that do not match the color scheme.
	 *
	 * @param {any} cardList
	 * @param {string[]} colorTheme = lower case array of strings
	 * @return array of Mtg.io cards
	 * @memberof HelperService
	 */
	public excludeColors (cardList, colorTheme: string[]) {
		const newList = [];

		cardList.forEach(card => {
			const colorIdentity = this.getColorIdentity(card);
			const colorsMatch = colorIdentity.map(color => colorTheme.indexOf(color.toLowerCase())).filter(value => value === -1);
			if (colorsMatch.length === 0) { newList.push(card); }
		});

		return newList;
	}

}
