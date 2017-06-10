import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'greenTextToSymbol'
})
export class GreenTextToSymbolPipe implements PipeTransform {

	transform (value: any, args?: any): any {
		if (value) {
			if (value.indexOf('{G}') === -1) { return '0'; }
				const green = /\{G\}/g;
				const match = value.match(green);
			return match.length;
		}
	}
}
