/**
 * This pipe transforms the symbol text coming from mtgApi to an appropriate symbol.
 * Example: {B} would create a black circle, {1} would create a grey circle with a number inside.
 * 
 * @export
 * @class TextToSymbolPipe
 * @implements {PipeTransform}
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'textToSymbol'
})
export class TextToSymbolPipe implements PipeTransform {

	private regMatch = {
		white: /\{W\}/g,
		blue: /\{U\}/g,
		black: /\{B\}/g,
		red: /\{R\}/g,
		green: /\{G\}/g,
		colorless: /\{(\d*?)\}/g,
		tap: /\{T\}/g,
	};

	transform (value: any, args?: any): any {

		const matches = [];

		// for (let key in this.regMatch) {
		// 	if (this.regMatch[key]) {
		// 		const match = this.regMatch[key].exec(value);
		// 		if (match) { matches.push(match); }
		// 	}
		// }

		if (matches && matches.length > 0) { console.log(matches); }
		// console.log(value);
		return value;
	}

}
