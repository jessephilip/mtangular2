import { PlayerService } from '../../../services/player.service';
import { Component, Input, OnInit } from '@angular/core';
import { MtgApiService } from '../../../services/mtgApi.service';
import { ModalService } from '../../../services/modal.service';
import { DatabaseService } from '../../../services/database.service';

import { DeckCard } from 'app/types/deckCard.model';
import { Deck } from 'app/types/deck.model';
import { HelperService } from 'app/services/helper.service';

@Component({
	selector: 'mtg-deck-create',
	templateUrl: './deck-create.component.html',
	styleUrls: ['./deck-create.component.scss'],
	providers: [HelperService]
})
export class DeckCreateComponent implements OnInit {

	@Input() nameSearch: string;
	@Input() typeSearch: string;
	@Input() subtypesSearch: string;
	@Input() textSearch: string;
	@Input() supertypesSearch: string;
	@Input() raritySearch: any;
	@Input() deckName: string;

	/**
	 * Results is the variable containing the results of the mtgApi search.
	 *
	 * @private
	 *
	 * @memberof DeckCreateComponent
	 */
	private _results;
	public get results () { return this._results; }
	public set results (value) { this._results = value; }

	/**
	 * Results is the variable containing the deck currently being built
	 *
	 * @private
	 *
	 * @memberof DeckCreateComponent
	 */
	private _deck: Deck;
	public get deck () { return this._deck; }
	public set deck (value) { this._deck = value; }

	/**
	 * RarityInputs is the set of objects tied to the DOM and checkboxes
	 * for card rarity.
	 *
	 * @private
	 *
	 * @memberof DeckCreateComponent
	 */
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

	public excludeColors = { selected: false };

	private _searchCounter: number;
	public get searchCounter(): number { return this._searchCounter; }
	public set searchCounter(value: number) { this._searchCounter = value; }

	private _searchObject: any;
	public get searchObject(): any { return this._searchObject; }
	public set searchObject(value: any) { this._searchObject = value; }

	/**
	 * Commander Rules
	 *	Must have a commander
	 *	Cards in deck cannot have color symbols of outside commander's color identity.
	 *	Other than basic lands, only one copy of a card in the deck.
	 *	Some cards are banned in commander format.
	 *	100 cards in deck
	 * Singular Rules
	 *	Other than basic lands, only one copy of a card in the deck.
	 * Pauper
	 *	Only common and uncommon cards allowed in deck.
	 *
	 * @memberof DeckCreateComponent
	 */
	public deckStyleInputs = [
		{ value: 'Commander', selected: false },
		{ value: 'Singleton', selected: false },
		{ value: 'Pauper', selected: false },
	];

	constructor (
		private api: MtgApiService,
		private modalService: ModalService,
		private dbService: DatabaseService,
		private playerService: PlayerService,
		private helperService: HelperService) {}

	ngOnInit () {
		this.deck = new Deck ([], []);
		this.results = [];
		this.dbService.getPlayerDecks('mvtYmiQpf0ai0Bes5jJRuIuEyaD2').then(decks => {
			console.log(decks);
		});
		this.searchCounter = 0;
		this.searchObject = {};
	}

	// these functions return string[]
	private selectedColors = () => this.colorInputs.filter(color => color.selected).map(colorValue => colorValue.value.toLowerCase());
	private selectedRarities = () => this.rarityInputs.filter(rarity => rarity.selected).map(rarityValue => rarityValue.value.toLowerCase());
	private selectedDeckStyles = () => this.deckStyleInputs.filter(style => style.selected).map(styleValue => styleValue.value.toLowerCase());

	public search (): void {

		this.searchCounter = 1;
		this.searchObject = {};

		if (this.nameSearch) { this.searchObject['name'] = this.nameSearch; }
		if (this.typeSearch) { this.searchObject['type'] = this.typeSearch; }
		if (this.subtypesSearch) { this.searchObject['subtypes'] = this.subtypesSearch; }
		if (this.supertypesSearch) { this.searchObject['supertypes'] = this.supertypesSearch; }
		if (this.textSearch) { this.searchObject['text'] = this.textSearch; }
		if (this.selectedRarities().length >= 0) {
			this.searchObject['rarity'] = this.helperService.stringBuilder(this.selectedRarities());
		}
		if (this.selectedColors().length >= 0) {
			this.searchObject['colors'] = this.helperService.stringBuilder(this.selectedColors());
		}

		this.api.getCardsFromObject(this.searchObject, this.searchCounter).subscribe(value => {

			if (this.excludeColors.selected) {
				this.results = this.helperService.excludeColors(value.cards, this.selectedColors());
			} else {
				this.results = value.cards;
			}

			this.results = this.results.sort((x, y) => x.name < y.name ? -1 : 1);
		});
	}

	public moreResults () {
		this.searchCounter++;
		this.api.getCardsFromObject(this.searchObject, this.searchCounter).subscribe(value => {
			value = value.cards.sort((x, y) => x.name < y.name ? -1 : 1);
			value.forEach(card => {
					if (this.results.indexOf(card) === -1) { this.results.push(card); }
			});
		});
	}

	private calculateTotal (): number {
		let total = 0;
		this.deck.cards.forEach((deckCard) => total += deckCard.amount);
		return total;
	}

	private calculateTypeTotals (card, addOrSubtract, amount = 1) {
		if (!card.type) { return false; };
		const keywords = [
			'Artifact',
			'Creature',
			'Enchantment',
			'Instant',
			'Land',
			'Planeswalker',
			'Sorcery'
		];

		keywords.forEach(value => {
			if (card.type.indexOf(value) !== -1) {
				if (addOrSubtract === 'add') {
					this.deck.totals[value.toLowerCase()] = this.deck.totals[value.toLowerCase()] + amount;
				} else {
					this.deck.totals[value.toLowerCase()] = this.deck.totals[value.toLowerCase()] - amount;
				}
			}
		});
	}

	public changeCheckbox (type: string, num?: number): void {
		switch (type) {
			case 'color':
				this.colorInputs[num].selected = !this.colorInputs[num].selected;
			break;
			case 'rarity':
				this.rarityInputs[num].selected = !this.rarityInputs[num].selected;
			break;
			case 'deckStyle':
				this.deckStyleInputs[num].selected = !this.deckStyleInputs[num].selected;
			break;
			case 'exclude':
				this.excludeColors.selected = !this.excludeColors.selected;
			break;
		}
	}

	public promoteCommander (result) {
		// check if commander style is chosen
		if (this.deckStyleInputs[0].selected === false) { return false; }

		// check if card is already in deck
		const inDeckMatch = this.deck.cards.find(match => match.card.name === result.name);
		if (inDeckMatch) { return false; }

		// check if card is already commander
		const commanderMatch = this.deck.commander.indexOf(result);
		if (commanderMatch !== -1) { return false; }

		// check if more than two commanders exist
		if (this.deck.commander.length >= 2) { return false; }

		// is card a legendary creature or allowed to be your commander
		if (result.type.indexOf('Legendary Creature') === -1
			&& result.text.indexOf('can be your commander') === -1) { return false; }

		// allow partners?
		if (this.deck.commander.length === 1
			&& this.deck.commander[0].card.text.indexOf('Partner (You can have two commanders if both have partner.)') >= 0
			&& result.text.indexOf('Partner (You can have two commanders if both have partner.)') >= 0) {
				this.deck.commander.push(new DeckCard(result, true));
				this.deck.cards.push(new DeckCard(result, true));
				this.deck.totals.deck = this.calculateTotal();
				return true;
		}

		if (this.deck.commander.length === 0) {
			this.deck.commander.push(new DeckCard(result, true));
			this.deck.cards.push(new DeckCard(result, true));
			this.deck.totals.deck = this.calculateTotal();
			return true;
		}

		return false;
	}

	public resultClick (result) {
		console.log('result', result);
		const prevDeck = this.deck.totals.deck;

		const helperObject = {};
		helperObject['commander'] = result;

		this.ruleCheck('commander', helperObject);

		const match = this.deck.cards.findIndex((deckCard) => deckCard.card.name === result.name);

		if (match === -1) {
			this.deck.cards.push(new DeckCard(result, false));
		} else if (!this.deckStyleInputs[0].selected || result.type.indexOf('Basic Land') >= 0) { this.deck.cards[match].amount++; }

		this.deck.totals.deck = this.calculateTotal();
		if (prevDeck !== this.deck.totals.deck) {
			this.calculateTypeTotals(result, 'add');
		}
	}

	public subtractCard (deckCard: DeckCard) {
		console.log('deckCard', deckCard);
		const prevDeck = this.deck.totals.deck;
		const loc = this.deck.cards.findIndex((value) => value.card.id === deckCard.card.id);

		if (deckCard.amount > 0) { deckCard.amount--; }
		if (deckCard.amount <= 0) { this.deck.cards.splice(loc, 1); }

		this.deck.totals.deck = this.calculateTotal();
		if (prevDeck !== this.deck.totals.deck) {
			this.calculateTypeTotals(deckCard.card, 'subtract');
		}
	}

	/**
	 * Remove card from the deck
	 *
	 * @param {DeckCard} deckCard
	 *
	 * @memberof DeckCreateComponent
	 */
	public removeCard (deckCard: DeckCard) {
		console.log('removeCard: ', deckCard);
		const loc = this.deck.cards.findIndex((value) => value.card.id === deckCard.card.id);

		this.deck.cards.splice(loc, 1);
		this.deck.totals.deck = this.calculateTotal();
		this.calculateTypeTotals(deckCard.card, 'subtract', deckCard.amount);
	}

	/**
	 * Displays a modal of the selected card on the DOM
	 *
	 * @param {string} imgUrl
	 *
	 * @memberof DeckCreateComponent
	 */
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

	/**
	 * Removes the text from the search inputs on the DOM
	 *
	 *
	 * @memberof DeckCreateComponent
	 */
	public reset (): void {
		this.nameSearch = '';
		this.typeSearch = '';
		this.subtypesSearch = '';
		this.supertypesSearch = '';
		this.textSearch = '';
		this.rarityInputs.forEach(value => value.selected = false);
		this.colorInputs.forEach(value => value.selected = false);
		this.excludeColors.selected = false;
	}

	public ruleCheck (ruleSet: string, helperObject?: any) {
		switch (ruleSet.toLowerCase()) {

			case 'commander':
				// check that commander card is included
				if (!helperObject) { throw new Error ('must send a card object to ruleCheck function.'); }
				// console.log(helperObject);
				const commander = helperObject.commander;

				// card must match color identity of commander
					// search result.colors, result.text and compare to commander results
				const other = helperObject.other;
				const commanderColors = this.helperService.getColorIdentity(commander);

				// card must be legal in commander
					// search result.legalities
				// for cards other than basic lands, one copy of card in deck
					// is type basic land
					// is result.name already in deck
			break;
			case 'singleton':
				// do stuff
			break;
			case 'pauper':
				// do stuff
			break;
		}
	}

	/**
	 * Select a commander from the list of choices
	 * Rules:
	 * 	1. Only one commander, unless both commanders have 'partner' keyword in text
	 * 	2. Commander can be any Legendary Creature or Planeswalker with 'can be your commander' phrase in text.
	 * @param {any} card
	 *
	 * @memberof DeckCreateComponent
	 */
	public commanderCheck (card): boolean {
		if (card.text) {
			if (card.text.toLowerCase().indexOf('can be your commander') > 0) { return true; };
		}
		if ((card.type.indexOf('Legendary') >= 0) && (card.type.indexOf('Creature') >= 0)) { return true; }

		return false;
	}

	/**
	 * Remove the commander status of a card from the deck.
	 *
	 * @param {DeckCard} deckCard
	 *
	 * @memberof DeckCreateComponent
	 */
	public demote (deckCard: DeckCard) {
		let loc = this.deck.commander.findIndex(value => deckCard.card.name === value.card.name);

		// remove from deck.commander
		this.deck.commander.splice(loc, 1);

		loc = this.deck.cards.findIndex(value => deckCard.card.name === value.card.name);

		this.deck.cards[loc].commander = false;
	}

	/**
	 * Invoked by the clear button on the deck list.
	 * Sets the deck to an empty array and resets all commander information.
	 *
	 * @memberof DeckCreateComponent
	 */
	public clearDeck () {
		this.deck = new Deck ([], []);
	}

	/**
	 * @name SaveDeck
	 * @memberof DeckCreateComponent
	 * Saves the deck to the database. Generates a random id number to identify the deck.
	 *
	 */

	// TODO: Establish the properties that will be common to all decks.
		// name, id, type, valid-to-type, number of cards, colorIdentity
	public saveDeck () {
		// things to save: Deck, Deck Name
		const deckId = this.helperService.createId();

		const savedDeck = {
			deck: this.deck,
			id: deckId,
			name: this.deckName,
		};

		if (this.playerService.me) {
			this.dbService.saveDeck(this.playerService.me.id, savedDeck);
		} else {
			alert('You must be logged in to save decks.');
		}

	}


}
