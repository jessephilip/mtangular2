import { Component, Input } from '@angular/core';

@Component({
	selector: 'mtg-card',
	styleUrls: ['./css/mtgCard.component.css'],
	template:
	`
	<div *ngIf="card.imageUrl">
		<img [src]="card.imageUrl" alt="{{card.name}} art" />
	</div>

	`
})

export class MtgCardComponent {
	// constructor
	constructor() {}

	@Input() card;

}
