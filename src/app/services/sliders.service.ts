import { EventEmitter, Injectable } from '@angular/core';
import { ModalService } from './modal.service';

@Injectable()
export class SlidersService {

	/**
	 * Controls the reveal status of the left slider
	 *
	 * @private
	 * @type {boolean}
	 * @memberof SlidersService
	 */

	private _leftSliderStatus: boolean;
	public get leftSliderStatus (): boolean { return this._leftSliderStatus; }
	public set leftSliderStatus (value: boolean) {
		this._leftSliderStatus = value;
		this.leftSliderUpdated.emit(value);
	}
	public leftSliderUpdated = new EventEmitter<boolean>();

	/**
	 * Controls the reveal status of the right slider
	 *
	 * @private
	 * @type {boolean}
	 * @memberof SlidersService
	 */

	private _rightSliderStatus: boolean;
	public get rightSliderStatus (): boolean { return this._rightSliderStatus; }
	public set rightSliderStatus (value: boolean) {
		this._rightSliderStatus = value;
		this.rightSliderUpdated.emit(value);
	}
	public rightSliderUpdated = new EventEmitter<boolean>();

	constructor (private modalService: ModalService) {}

	public cancel () {
		this.leftSliderStatus = false;
		this.rightSliderStatus = false;
		this.modalService.showVeil = 'out';
		this.modalService.destroyAllModals();
	}
}
