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
	private showPop = true;
	private mtgMainDom = document.getElementsByTagName('mtg-main')[0];


	public getFeldon() {
		this.mtgService.getCardByName('feldon').subscribe(result => {
			console.log(result.cards);
			this.cards = result.cards;
		});

	}

	removePop(show:boolean) {
		this.showPop = show;
	}

	createPopBar():void {
		console.log('create pop');
		console.log(this.mtgMainDom);
		let popBarDom = document.createElement('pop-bar');
		this.mtgMainDom.appendChild(popBarDom);
	}

}
