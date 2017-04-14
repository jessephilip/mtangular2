import { Component, Input } from '@angular/core';
import { MtgApiService } from './services/mtgApi.service';

@Component({
	providers: [MtgApiService],
	selector: 'mtg-main',
	styleUrls: ['./css/mtgMain.component.css'],
	template:
	`
		<main>
			<mtg-card
				*ngFor="let card of cards"
				[card]="card">
			</mtg-card>
			<button (click)="getFeldon()">Get Feldon</button>
		</main>
	`
})

export class MtgMainComponent {
	constructor(private mtgService:MtgApiService) {}
	private title:string = 'Main';
	private cards = [];

	public getFeldon() {
		this.mtgService.getCardByName('feldon').subscribe(result => {
			console.log(result.cards);
			this.cards = result.cards;
		});

	}

}
