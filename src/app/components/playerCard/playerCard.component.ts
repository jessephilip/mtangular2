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
	private classes = 'playerCard';
	private inputLifeTotal = false;

	// local variable for commanderAttack

	private _isCommander: boolean;
	public get isCommander(): boolean { return this._isCommander; }
	public set isCommander(value: boolean) {
		this._isCommander = value;
		this.playerService.setCommander(this.player, value);
	}

	// array of numbers to determine the value of the lifebuttons
	private values = [-10, -5, -1, 1, 5, 10];

	// filter buttons for placement on the DOM
	private pos = this.values.filter(i => { return i > 0; });
	private neg = this.values.filter(i => { return i < 0; });

	constructor (
		private playerService: PlayerService) {}

	ngOnInit () {}

	private confirmName () {
		this.nameConfirm = !this.nameConfirm;
	}

	private removePlayer (player: Player) {
		this.playerService.removePlayer(player);
	}

	private toggleDeleteClass (bool: boolean) {
		this.deleteClass = bool;
	}

	private classManagement (className: string) {
		const string = ' ' + className;
		if (this.classes.indexOf(string) === -1) {
			this.classes += string;
		} else {
			this.classes = this.classes.replace(string, '');
		}
	}

	private toggleInputLifeTotal () {
		this.inputLifeTotal = !this.inputLifeTotal;
		this.player.lifeTotal = Number(this.player.lifeTotal);
		this.playerService.findPlayer(this.player).lifeTotal = this.player.lifeTotal;
	}

	private toggleCommanderAttack () {
		if (this.playerService.setCommander(this.player, !this.isCommander)) {
			this.isCommander = !this.isCommander;
			this.classManagement('commanderAttack');
		}
	}
}

