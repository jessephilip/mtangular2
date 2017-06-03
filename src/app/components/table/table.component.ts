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

	public players: Player[];

	constructor (private playerService: PlayerService) { }

	ngOnInit () {
		this.players = this.playerService.players;
		if (!this.players || this.players.length === 1) {
			this.players = this.players.concat([
				new Player('Opponent 1', 40),
				new Player('Opponent 2', 40),
				new Player('Opponent 3', 40)
			]);
			this.playerService.players = this.players;
		}
	}

	ngOnChanges (changes: SimpleChanges): void {
		console.log('on changes:', changes);
	}

}
