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

	private hostGame () {
		console.log('host game clicked');
	}

	private joinGame () {
		console.log('join game clicked');
	}

	private deckManager () {
		console.log('deckManager clicked');
	}

	private pointManager () {
		console.log('pointManager clicked');
	}

	private storyBoard () {
		console.log('storyBoard clicked');
	}

	private settings () {
		console.log('settings clicked');
	}
}
