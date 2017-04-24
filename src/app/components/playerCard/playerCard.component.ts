import { Component, OnInit } from '@angular/core';

// custom components
import { LifeButtonComponent } from '../lifeButton/lifeButton.component';

@Component({
	selector: 'player-card',
	templateUrl: './playerCard.component.html',
	styleUrls: ['./playerCard.component.scss']
})

export class PlayerCardComponent implements OnInit {
	constructor() {}

	ngOnInit() {

	}

	// array of numbers to determine the value of the lifebuttons
	private values: Array<number> = [-10, -5, -1, 1, 5, 10];

	// filter buttons for placement on the DOM
	private pos: Array<number> = this.values.filter(i => {return i > 0});
	private neg: Array<number> = this.values.filter(i => {return i < 0});

}
