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

		// player.commanderDamage should be an array of damage objects
		// [{id: number,  amount: number}, {id: number, amount: number}]

		// get the current commander
		const currentCommander = this.playerService.findCommander();

		// if there is a commander and if the commander is not this player
		if (currentCommander && currentCommander !== this.player) {

			// has this commander hit this player before?
			const hitBefore = this.player.commanderDamage.find(element => {
				return element.id === currentCommander.id;
			});

			if (hitBefore) {
				hitBefore.amount += this.value;
			} else {
				this.player.commanderDamage.push({id: currentCommander.id, amount: this.value});
			}
		}

		// change value of this.player's life
		this.playerService.findPlayer(this.player).lifeTotal += this.value;
	}
}
