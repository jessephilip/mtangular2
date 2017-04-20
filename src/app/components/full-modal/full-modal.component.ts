import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-full-modal',
	templateUrl: './full-modal.component.html',
	styleUrls: ['./full-modal.component.scss']
})
export class FullModalComponent implements OnInit {
	constructor() { }

	@Output() closeModal = new EventEmitter<boolean>();

	ngOnInit() {
	}

	private cancel():void {
		console.log('clicked cancel');
		this.closeModal.emit(false);
	}

	private ok(): void {
		console.log('clicked ok');
		this.closeModal.emit(false);
	}

}
