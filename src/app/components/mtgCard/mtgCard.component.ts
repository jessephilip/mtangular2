import { Component, Input } from '@angular/core';

@Component({
	selector: 'mtg-card',
	styleUrls: ['./mtgCard.component.scss'],
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
