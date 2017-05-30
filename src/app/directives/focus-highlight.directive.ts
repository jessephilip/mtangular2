import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
	selector: '[mtgFocusHighlight]'
})
export class FocusHighlightDirective {

	@HostListener('focus') focused () {
		this.el.nativeElement.select();
	};

	constructor (private el: ElementRef) {}

}
