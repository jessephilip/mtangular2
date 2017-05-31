import { Component } from '@angular/core';

// services
import { FirebaseService } from '../../../services/firebase.service';

@Component({
	selector: 'mtg-left-slider',
	styleUrls: ['./leftSlider.component.scss'],
	templateUrl: './leftSlider.component.html'
})

export class LeftSliderComponent {

	private items: any[] = [
		{
			class: 'fa-pencil-square-o',
			name: 'Storyboard'
		},
		{
			class: 'fa-cog',
			name: 'Settings'
		}
	];

	constructor (private firebaseService: FirebaseService) {}

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
