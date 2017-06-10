import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'blackTextToSymbol'
})
export class BlackTextToSymbolPipe implements PipeTransform {

	transform (value: any, args?: any): any {
		if (value) {
			if (value.indexOf('{B}') === -1) { return '0'; }
			const black = /\{B\}/g;
			const match = black.exec(value);
			return match.length;
		}
	}
}
