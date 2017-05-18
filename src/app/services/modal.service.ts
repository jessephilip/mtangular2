import { EventEmitter } from '@angular/core';

export class ModalService {

	private _showStatus: boolean;
	public get showStatus(): boolean { return this._showStatus; }
	public set showStatus(value: boolean) {
		this._showStatus = value;
		this.updateShowStatus.emit(value);
	}
	public updateShowStatus = new EventEmitter<boolean>();
}
