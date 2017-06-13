import {PlayerService} from '../../services/player.service';
import { Component, Input, OnInit } from '@angular/core';
import { MtgApiService } from '../../services/mtgApi.service';
import { ModalService } from '../../services/modal.service';
import { DatabaseService } from '../../services/database.service';

import { DeckCard } from 'app/types/deckCard.model';
import { Deck } from 'app/types/deck.model';

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
	@Input() deckName: string;

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

	private _deck: Deck;
	public get deck () { return this._deck; }
	public set deck (value) { this._deck = value; }

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
	 * @memberof DeckManagerComponent
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
		private playerService: PlayerService) {}

	ngOnInit () {
		this.deck = new Deck ([], []);
		this.dbService.getPlayerDecks('mvtYmiQpf0ai0Bes5jJRuIuEyaD2').then(decks => {
			console.log(decks);
		});
	}


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
		});
	}

	private calculateTotal (): number {
		let total = 0;
		this.deck.cards.forEach((deckCard) => {
			total += deckCard.amount;
		});
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

	public changeCheckbox (type: string, num: number): void {
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
		}
	}

	public promoteCommander (result) {
		// check if commander style is chosen
		if (this.deckStyleInputs[0].selected === false) { return false; }

		// check if card is already in deck
		const inDeckMatch = this.deck.cards.find(card => {
			return card.card.name === result.name;
		});

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

		let helperObject = {};
		helperObject['commander'] = result;

		this.ruleCheck('commander', helperObject);

		const match = this.deck.cards.findIndex((deckCard) => {
			// console.log(deckCard);
			return deckCard.card.name === result.name;
		});

		if (match === -1) {
			this.deck.cards.push(new DeckCard(result, false));
		} else if (!this.deckStyleInputs[0].selected || result.type.indexOf('Basic Land') >= 0) { this.deck.cards[match].amount++; }

		this.deck.totals.deck = this.calculateTotal();
		this.calculateTypeTotals(result, 'add');
	}

	public subtractCard (deckCard: DeckCard) {
		console.log('deckCard', deckCard);
		const loc = this.deck.cards.findIndex((value) => {
			return value.card.id === deckCard.card.id;
		});

		if (deckCard.amount > 0) { deckCard.amount--; }
		if (deckCard.amount <= 0) { this.deck.cards.splice(loc, 1); }

		this.deck.totals.deck = this.calculateTotal();
		this.calculateTypeTotals(deckCard.card, 'subtract');
	}

	/**
	 * Remove card from the deck
	 *
	 * @param {DeckCard} deckCard
	 *
	 * @memberof DeckManagerComponent
	 */
	public removeCard (deckCard: DeckCard) {
		console.log('removeCard: ', deckCard);
		const loc = this.deck.cards.findIndex((value) => {
			return value.card.id === deckCard.card.id;
		});

		this.deck.cards.splice(loc, 1);
		this.deck.totals.deck = this.calculateTotal();
		this.calculateTypeTotals(deckCard.card, 'subtract', deckCard.amount);

	}

	/**
	 * Displays a modal of the selected card on the DOM
	 *
	 * @param {string} imgUrl
	 *
	 * @memberof DeckManagerComponent
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


	/**
	 * Removes the text from the search inputs on the DOM
	 *
	 *
	 * @memberof DeckManagerComponent
	 */
	public reset (): void {
		this.nameSearch = '';
		this.typeSearch = '';
		this.subtypesSearch = '';
		this.supertypesSearch = '';
		this.textSearch = '';
		this.rarityInputs.forEach(value => {
			value.selected = false;
		});
		this.colorInputs.forEach(value => {
			value.selected = false;
		});
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
				let colorTest = true;
				const commanderColors = this.getColorIdentity(commander);
				// const otherColors = this.getColorIdentity(other);

				// commanderColors.forEach(value => {
				// 	if (otherColors.indexOf(value) > 0) { colorTest = false; }
				// });

				// console.log('This card passes the colorTest: ', colorTest);

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
	 * Returns an array of colors pulled from the colorIdentity, text, and/or the casting colors of an MtgApi.io card
	 *
	 * @param {any} card = Accepts an MTG card as delivered from MtgApi.io
	 * @returns {string[]}
	 */
	private getColorIdentity (card): string[] {
		const basicColorTags = [
			'{W', 'W}',
			'{U', 'U}',
			'{B', 'B}',
			'{R', 'R}',
			'{G', 'G}'
		],	cardIdentity = card.colors ? card.colors : []
		;

		let colorIdentity = card.colorIdentity ? card.colorIdentity : [];

		if (colorIdentity.length === 0) {

			basicColorTags.forEach(value => {
				switch (value) {
					case '{W':
					case 'W}':
						if (card.text.indexOf(value) > 0) {
							if (colorIdentity.indexOf('W') === -1) { colorIdentity.push('W'); }
						}
					break;
					case '{U':
					case 'U}':
						if (card.text.indexOf(value) > 0) {
							if (colorIdentity.indexOf('U') === -1) { colorIdentity.push('U'); }
						}
					break;
					case '{B':
					case 'B}':
						if (card.text.indexOf(value) > 0) {
							if (colorIdentity.indexOf('L') === -1) { colorIdentity.push('L'); }
						}
					break;
					case '{R':
					case 'R}':
						if (card.text.indexOf(value) > 0) {
							if (colorIdentity.indexOf('R') === -1) { colorIdentity.push('R'); }
						}
					break;
					case '{G':
					case 'G}':
						if (card.text.indexOf(value) > 0) {
							if (colorIdentity.indexOf('G') === -1) { colorIdentity.push('G'); }
						}
					break;
				}
			});

			if (cardIdentity) {
				cardIdentity.forEach(value => {
					switch (value) {
						case 'White':
							if (colorIdentity.indexOf('W') === -1) { colorIdentity.push('W'); }
						break;
						case 'Blue':
							if (colorIdentity.indexOf('U') === -1) { colorIdentity.push('U'); }
						break;
						case 'Black':
							if (colorIdentity.indexOf('L') === -1) { colorIdentity.push('L'); }
						break;
						case 'Red':
							if (colorIdentity.indexOf('R') === -1) { colorIdentity.push('R'); }
						break;
						case 'Green':
							if (colorIdentity.indexOf('G') === -1) { colorIdentity.push('G'); }
						break;
					}
				});
			}
		}

		colorIdentity = this.convertColorTags(colorIdentity);

		return colorIdentity;
	}

	/**
	 * Used in the colorIdentity function. Converts the tag symbols to english colors.
	 * {W} = White, {U} = Blue, {B/L} = Black, {Red}, {Green}
	 *
	 * @private
	 * @param {string[]} array
	 * @returns {string[]}
	 *
	 * @memberof DeckManagerComponent
	 */
	private convertColorTags (array: string[]): string[] {
		const temp = [];
		const replaceBlack = array.indexOf('B');
		if (replaceBlack !== -1) { array[replaceBlack] = 'L'; }

		array.forEach(value => {
			if (value === 'W' && temp.indexOf('White') === -1) { temp.push('White'); }
			if (value === 'U' && temp.indexOf('Blue') === -1) { temp.push('Blue'); }
			if (value === 'L' && temp.indexOf('Black') === -1) { temp.push('Black'); }
			if (value === 'R' && temp.indexOf('Red') === -1) { temp.push('Red'); }
			if (value === 'G' && temp.indexOf('Green') === -1) { temp.push('Green'); }
		});

		return temp;
	}

	/**
	 * Select a commander from the list of choices
	 * Rules:
	 * 	1. Only one commander, unless both commanders have 'partner' keyword in text
	 * 	2. Commander can be any Legendary Creature or Planeswalker with 'can be your commander' phrase in text.
	 * @param {any} card
	 *
	 * @memberof DeckManagerComponent
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
	 * @memberof DeckManagerComponent
	 */
	public demote (deckCard: DeckCard) {
		let loc = this.deck.commander.findIndex(value => {
			return deckCard.card.name === value.card.name;
		});

		// remove from deck.commander
		this.deck.commander.splice(loc, 1);

		loc = this.deck.cards.findIndex(value => {
			return deckCard.card.name === value.card.name;
		});

		this.deck.cards[loc].commander = false;
	}


	/**
	 * Invoked by the clear button on the deck list.
	 * Sets the deck to an empty array and resets all commander information.
	 *
	 * @memberof DeckManagerComponent
	 */
	public clearDeck () {
		this.deck = new Deck ([], []);
	}

	/**
	 * Saves the deck to the database. Generates a random id number to identify the deck.
	 *
	 *
	 * @memberof DeckManagerComponent
	 */

	// TODO: Establish the properties that will be common to all decks.
		// name, id, type, valid-to-type, number of cards, colorIdentity
	public saveDeck () {
		// things to save: Deck, Deck Name
		const deckId = Date.now() + Math.floor(Math.random() * 1000000) + 1;

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
