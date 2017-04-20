import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MtgApiService } from '../../services/mtgApi.service';

@Component({
	providers: [MtgApiService],
	selector: 'mtg-main',
	styleUrls: ['./mtgMain.component.scss'],
	templateUrl: './mtgMain.component.html'
})

export class MtgMainComponent {
	constructor(private mtgService:MtgApiService) {}
	private title:string = 'Main';
	private cards = [];
	private showPop = true;
	private mtgMainDom = document.getElementsByTagName('mtg-main')[0];

	@Input() showModal: boolean = false;
	@Output() closeModalToApp = new EventEmitter<boolean>();

	closeModal(bool:boolean) {
		console.log('changedModal status:', bool);
		this.showModal = bool;
		this.closeModalToApp.emit(false);
	}

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
