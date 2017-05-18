import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'mtg-full-modal',
	templateUrl: './full-modal.component.html',
	styleUrls: ['./full-modal.component.scss']
})

export class FullModalComponent implements OnInit {

	// receives the information for the modal passed by mtgMain
	@Input() modalInfo: any;

	// emits the event that changes the showModal on mtgMain to false (closing the modal)
	@Output() closeModal = new EventEmitter<boolean>();

	// variable for the header at the top of the modal
	private title: string;

	// placeholder variable and type for the main portion of the modal
	private main: string;

	constructor () {}

	ngOnInit () {
		try {
			this.title = this.modalInfo.name || 'Placeholder Title';
			this.main = this.modalInfo.result || 'Placeholder Result';
		} catch (e) {
			console.log(e);
		}
	}

	// click function. operates when user clicks on cancel button. sends false boolean to mtgMain
	private cancel (): void {
		console.log('clicked cancel');
		this.closeModal.emit(false);
	}

	// click function. operates when user clicks on ok button. sends false boolean to mtgMain
	private ok (): void {
		console.log('clicked ok');
		this.closeModal.emit(false);
	}
}
