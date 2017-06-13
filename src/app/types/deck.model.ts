import { DeckCard } from './deckCard.model';

export class Deck {

	private _totals: any;
	public get totals (): any { return this._totals; }
	public set totals (value: any) { this._totals = value; }

	private _cards: DeckCard[];
	public get cards(): DeckCard[] { return this._cards; }
	public set cards(value: DeckCard[]) { this._cards = value; }

	private _commander: DeckCard[];
	public get commander(): DeckCard[] { return this._commander; }
	public set commander(value: DeckCard[]) { this._commander = value; }

	constructor (cards: DeckCard[], commander: DeckCard[]) {
		this.totals = {
			artifact: 0,
			creature: 0,
			deck: 0,
			enchantment: 0,
			instant: 0,
			land: 0,
			planeswalker: 0,
			sorcery: 0
		};

		this.cards = cards;
		this.commander = commander;
	}
}
