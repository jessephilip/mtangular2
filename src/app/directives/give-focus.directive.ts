import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[givefocus]'
})
export class GiveFocusDirective implements OnInit {

	constructor (private renderer: Renderer, private el: ElementRef) {}

	ngOnInit (): void {
		this.renderer.invokeElementMethod(
			this.el.nativeElement, 'focus', []);
	}
}
