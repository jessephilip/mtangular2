import { Component, OnInit } from '@angular/core';
import { SearchService } from 'app/services/search.service';
import { HelperService } from '../../../../services/helper.service';
import { DeckCard } from '../../../../types/deckCard.model';
import { Deck } from '../../../../types/deck.model';

@Component({
  selector: 'mtg-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss']
})
export class BuildListComponent implements OnInit {

  public deck: Deck;
  public deckName: string;
  public results: boolean;
  public tcgUrl = this.helpers.tcgUrl;

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
  // TODO: Set up legality checks and functionality for Legacy and Vintage Play
  // TODO: Set up rules and legality checks for modern, standard, pauper, singleton, 5 color, etc.
  public deckStyleInputs = [
    { value: 'Commander', selected: false },
    // { value: 'Legacy', selected: false },
    // { value: 'Vintage', selected: false },
  ];

  private selectedDeckStyles = () => this.deckStyleInputs
    .filter(style => style.selected)
    .map(styleValue => styleValue.value.toLowerCase());

  constructor (private searchService: SearchService, private helpers: HelperService) { }

  ngOnInit () {
    this.results = false;
    this.deck = this.searchService.deck;
    this.searchService.resultsEmitter
      .subscribe(value => this.results = !!value);
    this.searchService.deckEmitter
      .subscribe((value: Deck) => this.deck = value);
  }

  public showImage (imgUrl: string) {
    this.searchService.showCardImage(imgUrl);
    console.log(this.deck);
  }

  public subtractCard (deckCard: DeckCard) {
    this.searchService.subtractCardFromDeck(deckCard);
  }

  public removeCard (deckCard: DeckCard) {
    this.searchService.removeCardFromDeck(deckCard);
  }

  public changeDeckStyleInputs (num: number): void {
    const deckStyle = this.deckStyleInputs[num];

    deckStyle.selected = !deckStyle.selected;

    if (deckStyle.selected) {
      this.searchService.deck.addDeckType(deckStyle.value.toLowerCase());
    } else {
      this.searchService.deck.removeDeckType(deckStyle.value.toLowerCase());
    }

    this.searchService.deck = this.deck;
    console.log(this.deck);
  }

  public test () {
    console.log(this.searchService.allTypesInDeck());
  }

  // private calculateTotal (): number {
  //   let total = 0;
  //   this.deck.cards.forEach((deckCard) => total += deckCard.amount);
  //   return total;
  // }

  // private calculateTypeTotals (card, addOrSubtract, amount = 1) {
  //   if (!card.type) { return false; };
  //   const keywords = [
  //     'Artifact',
  //     'Creature',
  //     'Enchantment',
  //     'Instant',
  //     'Land',
  //     'Planeswalker',
  //     'Sorcery'
  //   ];

  //   keywords.forEach(value => {
  //     if (card.type.indexOf(value) !== -1) {
  //       if (addOrSubtract === 'add') {
  //         this.deck.totals[value.toLowerCase()] = this.deck.totals[value.toLowerCase()] + amount;
  //       } else {
  //         this.deck.totals[value.toLowerCase()] = this.deck.totals[value.toLowerCase()] - amount;
  //       }
  //     }
  //   });
  // }

  // public promoteCommander (result) {
  //   // check if commander style is chosen
  //   if (this.deckStyleInputs[0].selected === false) { return false; }

  //   // check if card is already in deck
  //   const inDeckMatch = this.deck.cards.find(match => match.card.name === result.name);
  //   if (inDeckMatch) { return false; }

  //   // check if card is already commander
  //   const commanderMatch = this.deck.commander.indexOf(result);
  //   if (commanderMatch !== -1) { return false; }

  //   // check if more than two commanders exist
  //   if (this.deck.commander.length >= 2) { return false; }

  //   // is card a legendary creature or allowed to be your commander
  //   if (result.type.indexOf('Legendary Creature') === -1
  //     && result.text.indexOf('can be your commander') === -1) { return false; }

  //   // allow partners?
  //   if (this.deck.commander.length === 1
  //     && this.deck.commander[0].card.text.indexOf('Partner (You can have two commanders if both have partner.)') >= 0
  //     && result.text.indexOf('Partner (You can have two commanders if both have partner.)') >= 0) {
  //       this.deck.commander.push(new DeckCard(result, true));
  //       this.deck.cards.push(new DeckCard(result, true));
  //       this.deck.totals.deck = this.calculateTotal();
  //       return true;
  //   }

  //   if (this.deck.commander.length === 0) {
  //     this.deck.commander.push(new DeckCard(result, true));
  //     this.deck.cards.push(new DeckCard(result, true));
  //     this.deck.totals.deck = this.calculateTotal();
  //     return true;
  //   }

  //   return false;
  // }





  // public ruleCheck (ruleSet: string, helperObject?: any) {
  //   switch (ruleSet.toLowerCase()) {

  //     case 'commander':
  //       // check that commander card is included
  //       if (!helperObject) { throw new Error ('must send a card object to ruleCheck function.'); }
  //       // console.log(helperObject);
  //       const commander = helperObject.commander;

  //       // card must match color identity of commander
  //         // search result.colors, result.text and compare to commander results
  //       const other = helperObject.other;
  //       const commanderColors = this.helperService.getColorIdentity(commander);

  //       // card must be legal in commander
  //         // search result.legalities
  //       // for cards other than basic lands, one copy of card in deck
  //         // is type basic land
  //         // is result.name already in deck
  //     break;
  //     case 'singleton':
  //       // do stuff
  //     break;
  //     case 'pauper':
  //       // do stuff
  //     break;
  //   }
  // }

  // /**
  //  * Select a commander from the list of choices
  //  * Rules:
  //  * 	1. Only one commander, unless both commanders have 'partner' keyword in text
  //  * 	2. Commander can be any Legendary Creature or Planeswalker with 'can be your commander' phrase in text.
  //  * @param {any} card
  //  *
  //  * @memberof DeckCreateComponent
  //  */
  // public commanderCheck (card): boolean {
  //   if (card.text) {
  //     if (card.text.toLowerCase().indexOf('can be your commander') > 0) { return true; };
  //   }
  //   if ((card.type.indexOf('Legendary') >= 0) && (card.type.indexOf('Creature') >= 0)) { return true; }

  //   return false;
  // }

  // /**
  //  * Remove the commander status of a card from the deck.
  //  *
  //  * @param {DeckCard} deckCard
  //  *
  //  * @memberof DeckCreateComponent
  //  */
  // public demote (deckCard: DeckCard) {
  //   let loc = this.deck.commander.findIndex(value => deckCard.card.name === value.card.name);

  //   // remove from deck.commander
  //   this.deck.commander.splice(loc, 1);

  //   loc = this.deck.cards.findIndex(value => deckCard.card.name === value.card.name);

  //   this.deck.cards[loc].commander = false;
  // }

  /**
   * Invoked by the clear button on the deck list.
   * Sets the deck to an empty array and resets all commander information.
   *
   * @memberof DeckCreateComponent
   */
  public clearDeck () {
    this.searchService.deck = new Deck();
  }

  // /**
  //  * @name SaveDeck
  //  * @memberof DeckCreateComponent
  //  * Saves the deck to the database. Generates a random id number to identify the deck.
  //  *
  //  */

  // // TODO: Establish the properties that will be common to all decks.
  //   // name, id, type, valid-to-type, number of cards, colorIdentity
  // public saveDeck () {
  //   // things to save: Deck, Deck Name
  //   const deckId = this.helperService.createId();

  //   const savedDeck = {
  //     deck: this.deck,
  //     id: deckId,
  //     // name: this.deckName,
  //   };

  //   if (this.playerService.me) {
  //     this.dbService.saveDeck(this.playerService.me.id, savedDeck);
  //   } else {
  //     alert('You must be logged in to save decks.');
  //   }

  // }

}
