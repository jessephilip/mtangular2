import { Component, OnInit } from '@angular/core';

// classes
import { Life } from './types/life';

// services
import { RandomToolsService } from './services/randomTools.service';

@Component({
	providers: [RandomToolsService],
	selector: 'mtg-footer',
	styleUrls: ['./css/mtgFooter.component.css'],
	templateUrl: './views/mtgFooter.component.html'
})

export class MtgFooterComponent implements OnInit {
	constructor(public tools:RandomToolsService){}

	// number of buttons
	private values: Array<number> = [-10, -5, -1, 1, 5, 10];
	private pos: Array<number> = this.values.filter(i => {return i > 0});
	private neg: Array<number> = this.values.filter(i => {return i < 0});

	private playerLife: Life = new Life;

	ngOnInit() {
		// TODO: get life from the database
		// set player's life = 40
		this.playerLife.life = 40;
	}

	clicked(value: number) {
		this.playerLife.life += value;
		// TODO: update life in the database
	}

	// random tools functions

	private coinFlip() {
		console.log(this.tools.coinFlip());
	}

	// TODO: set up this for user input
	private multiFlip() {
		console.log(this.tools.coinFlips(8));
	}

	private d6() {
		console.log(this.tools.randomizer(6));
	}

	private d20() {
		console.log(this.tools.randomizer(20));
	}

	// TODO: set up this for user input
	private multi20() {
		console.log(this.tools.multiple(6, 20));
	}
}
