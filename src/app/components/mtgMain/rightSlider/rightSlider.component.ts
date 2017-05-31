import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'app/services/player.service';
import { Player } from 'app/types/player.model';

@Component({
	selector: 'mtg-right-slider',
	styleUrls: ['./rightSlider.component.scss'],
	templateUrl: './rightSlider.component.html'
})

export class RightSliderComponent implements OnInit {

	public opponents: Player[];

	constructor (private playerService: PlayerService) {}

	ngOnInit (): void {
		this.opponents = this.playerService.opponents;
	}
}
