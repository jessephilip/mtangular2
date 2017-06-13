export class DeckCard {

	public amount: number;
	public card: any;
	public commander: boolean;

	constructor (card: any, commander: boolean) {
		this.amount = 1;
		this.card = card;
		this.commander = commander;
	}
}
