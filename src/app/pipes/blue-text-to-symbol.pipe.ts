import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'blueTextToSymbol'
})
export class BlueTextToSymbolPipe implements PipeTransform {

	transform (value: any, args?: any): any {
		if (value) {
			if (value.indexOf('{U}') === -1) { return '0'; }
				const blue = /\{U\}/g;
				const match = value.match(blue);
			return match.length;
		}
	}
}
