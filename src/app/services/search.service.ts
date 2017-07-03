import { EventEmitter, Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { HelperService } from './helper.service';
import { Deck } from '../types/deck.model';
import { DeckCard } from '../types/deckCard.model';

@Injectable()

export class SearchService {

  /**
   * Results is the variable containing the results of the mtgApi search.
   *
   * @private
   *
   * @memberof DeckCreateComponent
   */
  private _results;
  public get results () { return this._results; }
  public set results (value) {
    this._results = value;
    this.resultsEmitter.emit(value);
  }
  public resultsEmitter = new EventEmitter<any[]>();

    /**
   * Deck is an array of cards the user has selected
   * while building his/her deck.
   * @private
   *
   * @memberof DeckCreateComponent
   */
  private _deck: Deck;
  public get deck (): Deck { return this._deck; }
  public set deck (value: Deck) {
    this._deck = value;
    this.deckEmitter.emit(value);
  }
  public deckEmitter = new EventEmitter<Deck>();

  constructor (private modalService: ModalService, private helpers: HelperService) {
    this.results = [];
    this.deck = new Deck();
  }

  public addCardToDeck (card: DeckCard) {
    const legalCheck = this.deck.types
      .map(type => this.legalityCheck(type, card))
      .filter(value => value === false);

    if (legalCheck.indexOf(false) !== -1) {
      throw new Error(`${card.card.name} is not legal in this deck.`);
    }

    // check if card is already in the deck
    const cardLoc = this.deck.cards
      .findIndex(deckCard => deckCard.card.name === card.card.name);

    // is card already in deck?
    if (cardLoc === -1) { // card is not in deck
      this.deck.cards.push(card);
      this.addTypesToTotals(card);
      this.deckEmitter.emit(this.deck);
    } else if (this.deck.types.indexOf('commander') !== -1 // deck is type of commander OR
        || this.deck.types.indexOf('singleton') !== -1) { // deck is type of singleton
          return false;
        } else {
          // if deck is not commander or singleton and card is already in deck, increment card's amount in the deck
          this.deck.cards[cardLoc].amount++;
          // increment calculated totals in totals
          this.addTypesToTotals(card);
        }
    }

  /**
   * Decreases the number of cards in a deck.
   * If the value is subtracted from 1 to 0, the card is removed from the deck.
   *
   * @param {DeckCard} deckCard
   * @memberof SearchService
   */
  public subtractCardFromDeck (deckCard: DeckCard) {
    const loc = this.deck.cards.findIndex(value => value.card.id === deckCard.card.id);

    if (loc === -1) {
      throw new Error(`${deckCard.card.name} cannot be subtracted because it is not in this deck.`);
    }

    const card = this.deck.cards[loc];

    if (card.amount > 0) {
      card.amount--;
      this.subtractTypesFromTotals(card);
    }
    if (card.amount <= 0) { this.deck.cards.splice(loc, 1); }
  }

  /**
   * Remove card from the deck
   *
   * @param {DeckCard} deckCard
   *
   * @memberof DeckCreateComponent
   */
  public removeCardFromDeck (deckCard: DeckCard) {
    const loc = this.deck.cards.findIndex(value => value.card.id === deckCard.card.id);

    if (loc === -1) {
      throw new Error(`${deckCard.card.name} cannot be removed because it is not in this deck.`);
    }

    this.deck.cards.splice(loc, 1);

    // recalculate totals in deck
    this.allTypesInDeck();
  }

  /**
   * Evaluates the decks format to the card's legality and returns
   * whether the card would be valid in the deck.
   *
   * @public
   * @param {string} type
   * @param {DeckCard} card
   * @returns {boolean}
   * @memberof SearchService
   */
  public legalityCheck (type: string, card: DeckCard): boolean | string {
    if (this.deck.types.length === 0) { return true; }

    switch (type.toLowerCase()) {
      case 'commander':
        return card.isLegalInCommander();
      case 'legacy':
        return card.isLegalInLegacy();
      case 'vintage':
        return card.isLegalInVintage();
      default:
        throw new Error(`Legality Check for ${type} did not match a case in the switch statement.`);
    }
  }

      /**
   * Displays a modal of the selected card on the DOM
   *
   * @param {string} imgUrl
   *
   * @memberof DeckCreateComponent
   */
  public showCardImage (imgUrl: string) {
    const imageUrl = imgUrl ? imgUrl : 'src/assets/images/mtg_card_back.png';
    this.modalService.destroyModal();

    const modalFrame = {
      event: event,
      details: { type: 'image', imgUrl: imageUrl },
      type: 'image'
    };

    this.modalService.receiveModal(modalFrame);
  }

  // return an array of objects { type: string, amount: number }
  public allTypesInDeck () {
    // start from scratch
    this.deck.typeTotals = [];
    const cards = this.deck.cards;
    cards.forEach(deckCard => this.addTypesToTotals(deckCard));
  }

  public addTypesToTotals (deckCard: DeckCard) {
    const temp = this.helpers.getCardTypes(deckCard.card.type);
    // for this card, see if it is already in the totalsArray
    temp.forEach(type => {
      // see if this card type is already in this.totals
      const loc = this.deck.typeTotals.findIndex(total => total.type === type.toLowerCase());
      if (loc === -1) {
        // if this type is not in this.totals, push it to array with amount of 1
        this.deck.typeTotals.push({ type: type.toLowerCase(), amount: 1 });
      } else {
        // if this type is in this.totals, increment amount by 1
        this.deck.typeTotals[loc].amount++;
      }
    });
  }

  public subtractTypesFromTotals (deckCard: DeckCard) {
    const temp = this.helpers.getCardTypes(deckCard.card.type);
    // for this card, see if it is already in the totalsArray
    temp.forEach(type => {
      // see if this card type is already in this.totals
      const loc = this.deck.typeTotals.findIndex(total => total.type === type.toLowerCase());
      if (loc === -1) {
        // throw error if type isn't in totals list
        throw new Error(`${type} is not in the totals array. You are using this function improperly`);
      } else {
        // if this type is in this.totals, increment amount by 1
        this.deck.typeTotals[loc].amount--;
      }

      if (this.deck.typeTotals[loc].amount === 0) {
        this.deck.typeTotals.splice(loc, 1);
      }
    });
  }
}
