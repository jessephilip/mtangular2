import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'whiteTextToSymbol'
})
export class WhiteTextToSymbolPipe implements PipeTransform {

	transform (value: any, args?: any): any {
		if (value) {
			if (value.indexOf('{W}') === -1) { return '0'; }
				const white = /\{W\}/g;
				const match = value.match(white);
			return match.length;
		}
	}
}
