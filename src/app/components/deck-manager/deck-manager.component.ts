import { Component, Input, OnInit } from '@angular/core';
import { MtgApiService } from '../../services/mtgApi.service';
import { ModalService } from '../../services/modal.service';
import { DeckCard } from 'app/types/deckCard.model';

@Component({
	selector: 'mtg-deck-manager',
	templateUrl: './deck-manager.component.html',
	styleUrls: ['./deck-manager.component.scss']
})
export class DeckManagerComponent implements OnInit {

	@Input() nameSearch: string;
	@Input() typeSearch: string;
	@Input() subtypesSearch: string;
	@Input() textSearch: string;
	@Input() supertypesSearch: string;
	@Input() raritySearch: any;

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

	private _deck: DeckCard[] = [];
	public get deck () { return this._deck; }
	public set deck (value) { this._deck = value; }

	private _deckTotal: number;
	public get deckTotal(): number { return this._deckTotal; }
	public set deckTotal(value: number) { this._deckTotal = value; }

	public rarityInputs = [
		{ value: 'Common', selected: false },
		{ value: 'Uncommon', selected: false },
		{ value: 'Rare', selected: false },
		{ value: 'Mythic Rare', selected: false },
		{ value: 'Special', selected: false }
	];

	public colorInputs = [
		{ value: 'White', selected: false },
		{ value: 'Blue', selected: false },
		{ value: 'Black', selected: false },
		{ value: 'Red', selected: false },
		{ value: 'Green', selected: false }
	];

	constructor (private api: MtgApiService, private modalService: ModalService) { }

	ngOnInit () {}

	public search (): void {
		const searchObject = {};
		const rarityCheck = this.rarityInputs.find(value => {
				return value.selected;
		});
		const colorCheck = this.colorInputs.find(value => {
			return value.selected;
		});

		if (this.nameSearch) { searchObject['name'] = this.nameSearch; }
		if (this.typeSearch) { searchObject['type'] = this.typeSearch; }
		if (this.subtypesSearch) { searchObject['subtypes'] = this.subtypesSearch; }
		if (this.supertypesSearch) { searchObject['supertypes'] = this.supertypesSearch; }
		if (this.textSearch) { searchObject['text'] = this.textSearch; }
		if (rarityCheck) { searchObject['rarity'] = this.stringBuilder('rarity'); }
		if (colorCheck) { searchObject['colors'] = this.stringBuilder('color'); }

		this.api.getCardsFromObject(searchObject).subscribe(value => {
			this.results = value.cards.sort((x, y) => {
				if (x.name < y.name) { return -1; }
				if (x.name > y.name) { return 1; }
			});

			this.clearInputs();
		});
	}

	private calculateTotal () {

		let total = 0;
		this.deck.forEach((deckCard) => {
			total += deckCard.amount;
		});

		return total;
	}

	public changeCheckbox (type: string, num: number) {
		switch (type) {
			case 'color':
				this.colorInputs[num].selected = !this.colorInputs[num].selected;
				break;
			case 'rarity':
				this.rarityInputs[num].selected = !this.rarityInputs[num].selected;
				break;
		}
	}

	public resultClick (result) {

		console.log(result);

		const match = this.deck.findIndex((deckCard) => {
			console.log(deckCard);
			return deckCard.card.name === result.name;
		});

		if (match === -1) {
			this.deck.push(new DeckCard(result));
		} else { this.deck[match].amount++; }

		this.deckTotal = this.calculateTotal();
	}

	public subtractCard (deckCard: DeckCard) {
		const loc = this.deck.findIndex((value) => {
			return value.card.id === deckCard.card.id;
		});

		if (deckCard.amount > 0) { deckCard.amount--; }
		if (deckCard.amount <= 0) { this.deck.splice(loc, 1); }

		this.deckTotal = this.calculateTotal();
	}

	public removeCard (deckCard: DeckCard) {
		const loc = this.deck.findIndex((value) => {
			return value.card.id === deckCard.card.id;
		});

		this.deck.splice(loc, 1);

		this.deckTotal = this.calculateTotal();
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

	private stringBuilder (type: string): string {
		let string = '';

		switch (type) {
			case 'color':
				this.colorInputs.forEach(value => {
					if (value.selected) { string += value.value + ','; }
				});
			break;

			case 'rarity':
				this.rarityInputs.forEach(value => {
					if (value.selected) { string += value.value + ','; }
				});
			break;
		}

		string = string.substring(0, string.length - 1);
		return string;
	}

	public clearInputs (): void {
		// this.nameSearch = '';
		// this.typeSearch = '';
		// this.subtypesSearch = '';
		// this.supertypesSearch = '';
		// this.textSearch = '';
		// this.rarityInputs.forEach(value => {
		// 	value.selected = false;
		// });
		// this.colorInputs.forEach(value => {
		// 	value.selected = false;
		// });
	}

}
