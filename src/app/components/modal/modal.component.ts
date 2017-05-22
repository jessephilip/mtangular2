import {
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	OnChanges,
	Output,
	Renderer2,
	SimpleChanges
} from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';

// services
import { ModalService } from '../../services/modal.service';

@Component({
	selector: 'mtg-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnChanges {

	@Input() modalObject;

	@HostBinding('style.minHeight') height: string;
	@HostBinding('style.minWidth') width: string;
	@HostBinding('style.top') top: string;
	@HostBinding('style.left') left: string;

	@HostListener('click') onClick () {
		if (this.modalObject.type === 'balloon') {
			this.modalService.destroyModal();
		}
	}

	constructor (
		private modalService: ModalService,
		private el: ElementRef,
		private render: Renderer2) { }

	ngOnChanges (changes: SimpleChanges): void {
		// console.log('changes: ', changes);
			this.width = changes.modalObject.currentValue.width;
			this.height = changes.modalObject.currentValue.height;
			this.left = changes.modalObject.currentValue.domX;
			this.top = changes.modalObject.currentValue.domY;
			this.render.removeAttribute(this.el.nativeElement, 'class');
			changes.modalObject.currentValue.classes.forEach(className => {
				this.render.addClass(this.el.nativeElement, className);
			});
	}
}
