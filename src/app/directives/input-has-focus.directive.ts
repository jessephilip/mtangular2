import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[mtgInputHasFocus]'
})
export class InputHasFocusDirective {
	@HostListener('focus', ['$event']) inputFocused () {
		console.log('input focused');
	}

	constructor (private el: ElementRef) {
		console.log(el.nativeElement);
	}

}
