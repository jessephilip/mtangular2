import { Component } from '@angular/core';

@Component({
	selector: 'mtg-left-slider',
	styleUrls: ['./leftSlider.component.scss'],
	templateUrl: './leftSlider.component.html'
})

export class LeftSliderComponent {

	private items: any[] = [
		{
			class: 'fa-cloud',
			name: 'Host Game',
			func: function () {
				console.log(this.name);
			}
		},
		{
			class: 'fa-group',
			name: 'Join Game',
			func: function () {
				console.log(this.name);
			}
		},
		{
			class: 'fa-book',
			name: 'Deck Manager',
			func: function () {
				console.log(this.name);
			}
		},
		{
			class: 'fa-line-chart',
			name: 'Point Manager',
			func: function () {
				console.log(this.name);
			}
		},
		{
			class: 'fa-pencil-square-o',
			name: 'Storyboard',
			func: function () {
				console.log(this.name);
			}
		},
		{
			class: 'fa-cog',
			name: 'Settings',
			func: function () {
				console.log(this.name);
			}
		}
	];

	constructor () {}
}
