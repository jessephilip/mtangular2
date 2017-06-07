import { Component, Input, OnInit } from '@angular/core';
import { MtgApiService } from '../../services/mtgApi.service';
import { ModalService } from '../../services/modal.service';

@Component({
	selector: 'mtg-deck-manager',
	templateUrl: './deck-manager.component.html',
	styleUrls: ['./deck-manager.component.scss']
})
export class DeckManagerComponent implements OnInit {
	@Input() searchText: string;

	/**
	 * Results is the variable containing the results of the mtgApi search.
	 * 
	 * @private
	 * 
	 * @memberof DeckManagerComponent
	 */
	private _results;
	public get results () { return this._results; }
	public set results (value) { this._results = value; }

	private _deck = [];
	public get deck () { return this._deck; }
	public set deck (value) { this._deck = value; }

	constructor (private api: MtgApiService, private modalService: ModalService) { }

	ngOnInit () {}

	public search (): void {
		this.api.getCardByName(this.searchText).subscribe(value => {
			this.results = value.cards;
			this.searchText = '';
		});
	}

	public resultClick (result) {
		this.deck.push(result);
	}

	public showCard (imgUrl: string) {
		this.modalService.destroyModal();

		const details = {
			type: 'image',
			imgUrl: imgUrl
		};

		const modalFrame = {
			event: event,
			details: details,
			type: details.type
		};

		// send modal object to the modal service
		this.modalService.receiveModal(modalFrame);
	}

}
