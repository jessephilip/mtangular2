import { Component, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

// services
import { FirebaseService } from './services/firebase.service';
import { SlidersService } from './services/sliders.service';
import { ModalService } from './services/modal.service';

import { Modal } from './types/modal.model';

@Component({
	animations: [
		trigger('fadeIn', [
			state('in', style({opacity: 1})),
			transition(':enter', [
				style({opacity: 0}),
				animate(100)
			]),
			transition(':leave', [
				animate(100, style({opacity: 0}))
			])
		])
	],
	// tslint:disable-next-line:component-selector
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

	// holds the modal information to be passed to the modal component
	private modal;

	// controls the veil. defaults to not shown.
	public showMtgVeil = 'out';
	public showMtgModal = false;

	// private _animationStatus = 'in';
	// public get animationStatus (): string { return this._animationStatus; }
	// public set animationStatus (value: string) { this._animationStatus = value; }

	constructor (
		private modalService: ModalService,
		private slidersService: SlidersService) {
	}

	ngOnInit (): void {
		this.prepareModal();
		this.toggleVeil();
	}

	private toggleVeil (): void {
		this.modalService.updateShowVeil.subscribe((value) => {
			this.showMtgVeil = value;

			if (value === 'out') { this.showMtgModal = false; }
		});
	}

	// prepare modal properties and content to send to modal component
	private prepareModal () {
		this.modalService.updateShowModal.subscribe((showModal) => {
			this.showMtgModal = false;
		});
		this.modalService.sendModal.subscribe((value) => {
			this.modal = {
				type: value.type,
				classes: value.classes,
				domX: value.domX,
				domY: value.domY,
				width: value.width,
				height: value.height,
				buttons: value.buttons,
				showVeil: value.showVeil,
				details: value.details
			};

			// show modal component
			this.showMtgModal = !!value ? true : false;
		});
	}

	private cancel () {
		this.slidersService.cancel();
	}
}
