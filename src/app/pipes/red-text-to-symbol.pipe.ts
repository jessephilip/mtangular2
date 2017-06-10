import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'redTextToSymbol'
})
export class RedTextToSymbolPipe implements PipeTransform {

	transform (value: any, args?: any): any {
		if (value) {
			if (value.indexOf('{R}') === -1) { return '0'; }
				const red = /\{R\}/g;
				const match = value.match(red);
			return match.length;
		}
	}
}
