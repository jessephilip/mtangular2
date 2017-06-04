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

	public buttons = [
		{
			class: 'fa fa-2x fa-desktop',
			link: '/table',
			title: 'Current Game'
		},
		{
			class: 'fa fa-2x fa-cloud',
			link: '/host',
			title: 'Host Game'
		},
		{
			class: 'fa fa-2x fa-group',
			link: '/join',
			title: 'Join Game'
		},
		{
			class: 'fa fa-2x fa-book',
			link: '/decks',
			title: 'Deck Manager'
		},
		{
			class: 'fa fa-2x fa-line-chart',
			link: '/points',
			title: 'Point Manager'
		},
		{
			class: 'fa fa-2x fa-pencil-square-o',
			link: '/story',
			title: 'Storyboard'
		},
		{
			class: 'fa fa-2x fa-cog',
			link: '/settings',
			title: 'Settings'
		},
	];

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

	public closeSlider () {
		this.slidersService.leftSliderStatus = false;
		this.modalService.showVeil = 'out';
		this.modalService.destroyModal();
	}
}
