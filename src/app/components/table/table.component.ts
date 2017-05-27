import { Component, OnInit } from '@angular/core';

// custom components
import { PlayerCardComponent } from '../playerCard/playerCard.component';

// services
import { PlayerService } from 'app/services/player.service';

// types
import { Player } from 'app/types/player.model';

@Component({
	selector: 'mtg-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

	private opponents: Player[];

	constructor (private playerService: PlayerService) { }

	ngOnInit () {
		this.opponents = this.playerService.opponents;
		if (!this.opponents || this.opponents.length === 0) {
			this.opponents = [
				new Player('Opponent 1', 40),
				new Player('Opponent 2', 40),
				new Player('Opponent 3', 40)
			];
			this.playerService.opponents = this.opponents;
		}
	}

}
