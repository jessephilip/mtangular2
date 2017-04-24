import { Component } from '@angular/core';

// import types
import { Chance } from './types/chance';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {

	// controls the modal to be popped in the mtg-main element
	private showModal: boolean = false;

	// receive the info going to the modalInfo
	private modalInfo: any;

	// emitChance() receives the Chance object from mtgFooter and passes it on to mtgMain
	emitChance(chance:Chance) {
		if (chance)	{

			// give modalInfo chance's values and pass to mtgMain
			this.modalInfo = chance;

			// pass along the showModal value to mtgMain
			this.showModal = true;
		}
		else throw new Error('Error re: object sent to app.component.ts that was intended for the modal.');
	}

	// change the showModal property. sent from mainMTG
	closeModalFromMain(bool:boolean) {
		this.showModal = bool;
	}
}
