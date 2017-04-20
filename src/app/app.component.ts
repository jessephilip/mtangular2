import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {

	// controls the modal to be popped in the mtg-main element
	private showModal: boolean;

	emitModal(bool:boolean) {
		this.showModal = bool;
	}

	closeModalFromMain(bool:boolean) {
		console.log(this.showModal);
		this.showModal = bool;
	}
}
