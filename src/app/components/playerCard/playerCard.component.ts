import { Component, Input, OnInit } from '@angular/core';

// custom components
import { LifeButtonComponent } from '../lifeButton/lifeButton.component';
import { PlayerService } from 'app/services/player.service';
import { Player } from 'app/types/player.model';

@Component({
	selector: 'mtg-player-card',
	templateUrl: './playerCard.component.html',
	styleUrls: ['./playerCard.component.scss']
})

export class PlayerCardComponent implements OnInit {

	@Input() player;
	private nameConfirm = false;
	private deleteClass = false;
	private inputLifeTotal = false;

	// array of numbers to determine the value of the lifebuttons
	private values = [-10, -5, -1, 1, 5, 10];

	// filter buttons for placement on the DOM
	private pos = this.values.filter(i => { return i > 0; });
	private neg = this.values.filter(i => { return i < 0; });

	constructor (private playerService: PlayerService) {}
	ngOnInit () {}

	confirmName () {
		this.nameConfirm = !this.nameConfirm;
	}

	findPlayer (player: Player) {
		console.log(player);
		console.log(this.playerService.findPlayer(player));
	}

	removePlayer (player: Player) {
		this.playerService.removePlayer(player);
	}

	toggleDeleteClass (bool: boolean) {
		console.log(this.deleteClass);
		this.deleteClass = bool;
	}

	private toggleInputLifeTotal () {
		this.inputLifeTotal = !this.inputLifeTotal;
		this.player.lifeTotal = Number(this.player.lifeTotal);
		this.playerService.findPlayer(this.player).lifeTotal = this.player.lifeTotal;
	}
}

