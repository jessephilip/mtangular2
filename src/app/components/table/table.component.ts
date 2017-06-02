import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


// custom components
import { PlayerCardComponent } from '../playerCard/playerCard.component';

// services
import { PlayerService } from 'app/services/player.service';

// types
import { Player } from 'app/types/player.model';

@Component({
	animations: [
		trigger('fadeout', [
			state('true', style({opacity: 1})),
			transition(':leave', [
				animate(500, style({opacity: 0}))
			])
		])
	],
	selector: 'mtg-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

	public opponents: Player[];

	constructor (private playerService: PlayerService) { }

	ngOnInit () {
		this.opponents = this.playerService.opponents;
		console.log('table opponents', this.opponents);
		if (!this.opponents || this.opponents.length === 0) {
			this.opponents = [
				new Player('Opponent 1', 40),
				new Player('Opponent 2', 40),
				new Player('Opponent 3', 40)
			];
			this.playerService.opponents = this.playerService.opponents.concat(this.opponents);
		}
	}

	ngOnChanges (changes: SimpleChanges): void {
		console.log('on changes:', changes);
	}

}
