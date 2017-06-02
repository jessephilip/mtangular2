import { Component, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

// services
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

	// variable to control modals
	private _modals: Modal[] = [];
	public get modals(): Modal[] { return this._modals; }
	public set modals(value: Modal[] ) { this._modals = value; }

	// controls the veil. defaults to not shown.
	public showMtgVeil = 'out';

	// controls the modal. defaults to not shown.
	public showMtgModal = false;

	// private _animationStatus = 'in';
	// public get animationStatus (): string { return this._animationStatus; }
	// public set animationStatus (value: string) { this._animationStatus = value; }

	constructor (
		private modalService: ModalService,
		private slidersService: SlidersService) {
	}

	ngOnInit (): void {
		this.toggleVeil();
		this.modals = this.modalService.modals;
	}

	private toggleVeil (): void {
		this.modalService.updateShowVeil.subscribe((value) => {
			this.showMtgVeil = value;

			if (value === 'out') { this.showMtgModal = false; }
		});
	}

	private cancel () {
		this.slidersService.cancel();
	}
}
