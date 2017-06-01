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
	public nameConfirm = false;
	public deleteClass = false;
	public inputLifeTotal = false;

	public currentCommander: Player;

	// local variable for commanderAttack

	private _isCommander: boolean;
	public get isCommander(): boolean { return this._isCommander; }
	public set isCommander(value: boolean) { this._isCommander = value; }

	// array of numbers to determine the value of the lifebuttons
	private values = [-10, -5, -1, 1, 5, 10];

	// filter buttons for placement on the DOM
	public pos = this.values.filter(i => { return i > 0; });
	public neg = this.values.filter(i => { return i < 0; });

	constructor (
		private playerService: PlayerService) {}

	ngOnInit () {
		this.playerService.commanderWatch.subscribe(value => {
			this.isCommander = value === this.player;
		});
	}

	private confirmName () {
		this.nameConfirm = !this.nameConfirm;
	}

	public removePlayer (player: Player) {
		this.playerService.removePlayer(player);
	}

	private toggleInputLifeTotal () {
		this.inputLifeTotal = !this.inputLifeTotal;
		this.player.lifeTotal = Number(this.player.lifeTotal);
		this.playerService.findPlayer(this.player).lifeTotal = this.player.lifeTotal;
	}

	public toggleCommanderAttack () {
			this.playerService.setCommander(this.player);
	}
}

