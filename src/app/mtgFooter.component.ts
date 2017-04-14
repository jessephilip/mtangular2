import { Component, OnInit } from '@angular/core';

// classes
import { Life } from './types/life';

@Component({
	selector: 'mtg-footer',
	styleUrls: ['./css/mtgFooter.component.css'],
	templateUrl: './views/mtgFooter.component.html'
})

export class MtgFooterComponent implements OnInit {

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

}
