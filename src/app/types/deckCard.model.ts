import { Deck } from './deck.model';
export class DeckCard {

  public amount: number;
  public card: any;
  public commander: boolean;

  constructor (card: any, commander: boolean) {
    this.amount = 1;
    this.card = card;
    this.commander = commander;
  }

  public isLegalInCommander (): boolean {
    if (!this.card.legalities) {
      throw new Error(`There is no legality information for ${this.card.name}.`);
    }

    const loc = this.card.legalities
      .findIndex(status => status.format.toLowerCase() === 'commander');

    if (loc === -1) {
      throw new Error(`There is no commander legality information for ${this.card.name}.`);
    }

    return this.card.legalities[loc].legality.toLowerCase() === 'legal';
  }

  public isLegalInLegacy (): boolean {
    if (!this.card.legalities) {
      throw new Error(`There is no legality information for ${this.card.name}.`);
    }

    const loc = this.card.legalities
      .findIndex(status => status.format.toLowerCase() === 'legacy');

    if (loc === -1) {
      throw new Error(`There is no legacy legality information for ${this.card.name}.`);
    }

    return this.card.legalities[loc].legality.toLowerCase() === 'legal';
  }

  public isLegalInVintage (): boolean | string {
    if (!this.card.legalities) {
      throw new Error(`There is no legality information for ${this.card.name}.`);
    }

    const loc = this.card.legalities
      .findIndex(status => status.format.toLowerCase() === 'vintage');

    if (loc === -1) {
      throw new Error(`There is no vintage legality information for ${this.card.name}.`);
    }

    switch (this.card.legalities[loc].legality.toLowerCase()) {
      case 'banned':
        return false;
      case 'legal':
        return true;
      case 'restricted':
        return 'restricted';
    }
  }

  public isLegalInDeck (deck: Deck): boolean {
    if (deck.types.length === 0) { return true; }
    // get deck types
    const types = deck.types;
    const legalityArray = deck.types.map(type => {
      switch (type.toLowerCase()) {
        case 'commander':
          return this.isLegalInCommander();
        case 'legacy':
          return this.isLegalInLegacy();
        case 'vintage':
          return this.isLegalInVintage();
        default:
          throw new Error(`Legality Check for ${type} did not match a case in the switch statement.`);
      }
    });

    // at this point, legality array is an array of booleans and maybe a string
    // one false, makes the card not legal in deck, so filter out false

    console.log(legalityArray);

    legalityArray.filter(legality => !legality);

    // is false in the legality array
    return legalityArray.indexOf(false) === -1;
  }
}
