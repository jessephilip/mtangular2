import { Component, OnInit } from '@angular/core';

// services
import { SlidersService } from '../../services/sliders.service';
import { ModalService } from '../../services/modal.service';
import { PlayerService } from '../../services/player.service';
import { Player } from "app/types/player.model";

@Component({
	selector: 'mtg-header',
	styleUrls: ['./mtgHeader.component.scss'],
	templateUrl: 'mtgHeader.component.html'
})

export class MtgHeaderComponent implements OnInit {

	private me: Player;
	private showPlayerNameInput = true;

	constructor (
		private slidersService: SlidersService,
		private modalService: ModalService,
		private playerService: PlayerService) {}

	ngOnInit (): void {
		this.me = this.playerService.me;
	}

	private submitPlayerName () {
		this.showPlayerNameInput = !this.showPlayerNameInput;
	}

	private toggleLeftSlider (): void {
		this.slidersService.leftSliderStatus = !this.slidersService.leftSliderStatus;
		this.modalService.showVeil =
			this.modalService.showVeil === 'in' ? 'out' : 'in';
	}

	private toggleRightSlider (): void {
		this.slidersService.rightSliderStatus = !this.slidersService.rightSliderStatus;
		// TODO: Determine if the veil should pop up with a right slider
		this.modalService.showVeil =
			this.modalService.showVeil === 'in' ? 'out' : 'in';
	}
}
