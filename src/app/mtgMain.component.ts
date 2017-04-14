import { Component, Input } from '@angular/core';
import { MtgApiService } from './services/mtgApi.service';

@Component({
	providers: [MtgApiService],
	selector: 'mtg-main',
	styleUrls: ['./css/mtgMain.component.css'],
	templateUrl: './views/mtgMain.component.html'

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
