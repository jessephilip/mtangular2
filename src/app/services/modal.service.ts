	/* NOTE: types of Modals
	*	Full-Screen
	*	Toast - full width, small height. no buttons. close button only.
	*	Balloon: Balloons have a geometric shape, are small in width and height,
	*			display relative to the component causing them, and only have one button:
	*			a close button.
	*	Centered Dialog - substantial height and width. provided buttons.
	*/

import { EventEmitter, Injectable } from '@angular/core';
import { Modal } from '../types/modal.model';
import { PlayerService } from 'app/services/player.service';

@Injectable()

export class ModalService {

	// maintains the modals to be displayed

	private _modals: Modal[] = [];
	public get modals(): Modal[] { return this._modals; }
	public set modals(value: Modal[]) {
		this._modals = value;
		this.emitModals.emit(value);
	}
	public emitModals = new EventEmitter<Modal[]>();

	private _isMulti = false;
	public get isMulti (): boolean { return this._isMulti; }
	public set isMulti (value: boolean) { this._isMulti = value; }

	// showVeil provides a link to the showVeil property on app.component
	private _showVeil: string;
	public get showVeil (): string { return this._showVeil; }
	public set showVeil (value: string) {
		this._showVeil = value;
		this.updateShowVeil.emit(value);
	}
	public updateShowVeil = new EventEmitter<string>();

	constructor (private playerService: PlayerService) {}

	// receiveModal receives the modal properties and information
	// FIXME: look at incoming type of modal, and build the modal here.
	public receiveModal (modalFrame: { event: any, details: any, type: string }) {
		let modal;

		switch (modalFrame.type) {

			case 'balloon-input':
				modal = this.balloonInput(modalFrame);
				break;
			case 'balloon':
				modal = this.balloonModal(modalFrame);
				break;
			case 'createGameModal':
				modal = this.createGameModal(modalFrame);
				break;
			default:
				console.log('modal service switch went wrong!');
		}

		if (modal) { this.modals.push(modal); }
		if (modalFrame.details.showVeil) { this.updateShowVeil.emit('in'); }
	}

	public destroyModal () {
		this.modals.pop();
	}

	public destroyAllModals () {
		this.modals = [];
	}

	// functions to create modals

	// create the basic balloon modal
	private balloonModal (modalFrame): Modal {
		let modal;
		const verticalOffset = 10
		,	classes = ['modal', 'balloon']
		,	domX = modalFrame.event.target.offsetLeft
		,	domY = modalFrame.event.target.offsetTop - modalFrame.event.target.clientHeight - verticalOffset
		,	width = modalFrame.event.target.clientWidth + 'px'
		,	height = modalFrame.event.target.clientHeight + 'px'
		,	showVeil = false;

		// add additional classes
		if (modalFrame.details.crit && modalFrame.details.crit.toString() === modalFrame.details.result) {
			classes.push('crit');
		}

		if (modalFrame.details.fail && modalFrame.details.fail.toString() === modalFrame.details.result) {
			classes.push('fail');
		}

		// finalize building the modal
		modal = new Modal(
			modalFrame.type, // type
			classes, // classes
			[''], // animations
			domX + 'px', // domX
			domY + 'px', // domY
			width + 'px', // width
			height + 'px', // height
			showVeil, // show veil
			modalFrame.details // modal contents
		);

		return modal;
	}

	// create the input balloon
	private balloonInput (modalFrame) {
		const modal = this.balloonModal(modalFrame);
		modal.type = 'balloon-input';
		modal.classes = ['modal', 'balloon-input'];
		return modal;
	}

	private createGameModal (modalFrame) {

		const details = {
			'buttons': [
				{
					name: 'Cancel',
					class: 'cancel',
					fx: () => {
						console.log('cancel');
						this.destroyAllModals();
						this.showVeil = 'out';
					}
				},
				{
					name: 'Submit',
					class: 'submit',
					fx: (func) => {
						console.log('submit');
						this.destroyAllModals();
						this.showVeil = 'out';

						func();
					}
				}
			]
		};

		const modal = new Modal(
			'createGameModal',
			['modal', '.createGameModal'],
			[],
			'20%',
			'20%',
			'60%',
			'60%',
			true,
			details
		);
		return modal;
	}
}
