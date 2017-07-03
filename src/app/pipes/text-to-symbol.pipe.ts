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

	transform (value: any, args?: any): any {
		if (value) {
			console.log('textToSymbol', value);
		}


		return value;
	}

}
