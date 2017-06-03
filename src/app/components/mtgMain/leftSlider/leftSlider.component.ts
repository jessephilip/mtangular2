import { Component, OnInit } from '@angular/core';

// services
import { ModalService } from '../../../services/modal.service';
import { DatabaseService } from '../../../services/database.service';
import { AuthService } from '../../../services/auth.service';
import { SlidersService } from '../../../services/sliders.service';

// types
import { Game } from 'app/types/game.model';


@Component({
	selector: 'mtg-left-slider',
	styleUrls: ['./leftSlider.component.scss'],
	templateUrl: './leftSlider.component.html'
})
export class LeftSliderComponent implements OnInit {

	private _photoURL: string;
	public get photoURL(): string { return this._photoURL; }
	public set photoURL(value: string) { this._photoURL = value; }

	private _userName: string;
	public get userName(): string { return this._userName; }
	public set userName(value: string) { this._userName = value; }

	private game: Game;

	constructor (
		private db: DatabaseService,
		private af: AuthService,
		private modalService: ModalService,
		private slidersService: SlidersService) {}

	ngOnInit (): void {
		this.af.user.subscribe(value => {
			if (value) {
				this.photoURL = value.photoURL;
				this.userName = value.displayName;
			}
		});
	}

	public hostGame (event) {
		this.slidersService.leftSliderStatus = false;
		this.modalService.destroyModal();

		const modalFrame = {
			event: event,
			details: {showVeil: true},
			type: 'createGameModal'
		};

		// send modal object to the modal service
		this.modalService.receiveModal(modalFrame);
	}

	public joinGame () {
		console.log('join game clicked', this.game);
		this.db.removeGame(this.game);
	}

	public deckManager () {
		console.log('deckManager clicked');
	}

	public pointManager () {
		console.log('pointManager clicked');
	}

	public storyBoard () {
		console.log('storyBoard clicked');
	}

	public settings () {
		console.log('settings clicked');
	}
}
