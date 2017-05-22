	/* NOTE: types of Modals
	*	Full-Screen
	*	Toast - full width, small height. no buttons. close button only.
	*	Balloon: Balloons have a geometric shape, are small in width and height,
	*			display relative to the component causing them, and only have one button:
	*			a close button.
	*	Centered Dialog - substantial height and width. provided buttons.
	*/

import { EventEmitter } from '@angular/core';
import { Modal } from '../types/modal.model';

export class ModalService {

	// showModal provides a link to the showModal property on app.component
	private _showModal: boolean;
	public get showModal (): boolean { return this._showModal; }
	public set showModal (value: boolean) {
		this._showModal = value;
		this.updateShowModal.emit(value);
	}
	public updateShowModal = new EventEmitter<boolean>();

	// showVeil provides a link to the showVeil property on app.component
	private _showVeil: string;
	public get showVeil (): string { return this._showVeil; }
	public set showVeil (value: string) {
		this._showVeil = value;
		this.updateShowVeil.emit(value);
	}
	public updateShowVeil = new EventEmitter<string>();

	// sendModal sends the modal properties and information to modalObject on app.component
	public sendModal = new EventEmitter<Modal>();

	// receiveModal receives the modal properties and information
	public receiveModal (modal: Modal) {
		if (modal.showVeil) { this.updateShowVeil.emit('in'); }
		this.sendModal.emit(modal);
	}

	public destroyModal () {
		this.updateShowModal.emit(false);
	}
}
