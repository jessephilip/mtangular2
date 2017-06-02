import { Component, OnInit } from '@angular/core';

// services
import { DatabaseService } from '../../../services/database.service';
import { AuthService } from '../../../services/auth.service';

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

	constructor (private db: DatabaseService, private af: AuthService) {}

	ngOnInit (): void {
		this.af.user.subscribe(value => {
			if (value) {
				this.photoURL = value.photoURL;
				this.userName = value.displayName;
			}
		});
	}

	public hostGame () {
		console.log('host game clicked');
	}

	public joinGame () {
		console.log('join game clicked');
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
