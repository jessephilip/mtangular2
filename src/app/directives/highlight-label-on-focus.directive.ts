/**
 * This directive is used to style an input and label together, and when giving the input
 * focus, its corresponding label changes style accordingly.
 *
 * @export
 * @class MtgHighlightLabelOnFocusDirective
 */
import { Directive, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mtgHighlightLabelOnFocus]'
})
export class MtgHighlightLabelOnFocusDirective {
  @HostListener('focus', ['$event']) inputFocused ($event) {
    const label = document.querySelector(`[for="${$event.srcElement.name}"]`);
    this.renderer.addClass(label, 'selected');
  }

  @HostListener('focusout', ['$event']) inputUnfocused ($event) {
    const label = document.querySelector(`[for="${$event.srcElement.name}"]`);
    this.renderer.removeClass(label, 'selected');
  }

  constructor (private renderer: Renderer2) {}
}
