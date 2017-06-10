import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'greyTextToSymbol'
})
export class GreyTextToSymbolPipe implements PipeTransform {

	transform (value: any, args?: any): any {
		if (value) {
			const grey = /\d/g;
			let match = value.match(grey);
			if (match) {
				match = match.join();
				return match;
			} else {
				return '0';
			}
		}
	}
}
