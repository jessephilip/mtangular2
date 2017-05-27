import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'app/types/player.model';
import { PlayerService } from "app/services/player.service";

@Component({
	selector: 'mtg-life-button',
	styleUrls: ['./lifeButton.component.scss'],
	template:
	`
		<button
			[ngClass]="value > 0 ? 'life-gain' : 'life-loss'"
			(click)="changeLife()">
			{{ value > 0 ? '+' + value : value }}
		</button>
	`
})
export class LifeButtonComponent implements OnInit {

	@Input() value: number;
	@Input() player: Player;

	constructor (private playerService: PlayerService) {}

	ngOnInit () {}

	private changeLife (): void {
		this.playerService.findPlayer(this.player).lifeTotal += this.value;
	}
}
