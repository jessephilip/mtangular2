import {PlayerService} from '../../../../services/player.service';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../../services/database.service';
import { SearchService } from 'app/services/search.service';
import { HelperService } from '../../../../services/helper.service';
import { DeckCard } from '../../../../types/deckCard.model';
import { Deck } from '../../../../types/deck.model';
import { Player } from '../../../../types/player.model';

@Component({
  selector: 'mtg-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss']
})
export class BuildListComponent implements OnInit {

  public deck: Deck;
  public card: DeckCard;
  public deckName: string;
  public results: boolean;
  public tcgUrl = this.helpers.tcgUrl;
  private me: Player;

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

  constructor (
    private searchService: SearchService,
    private helpers: HelperService,
    private db: DatabaseService,
    private playerService: PlayerService) { }

  ngOnInit () {
    this.deck = new Deck();
    this.results = false;
    this.searchService.resultsEmitter
      .subscribe(value => this.results = !!value);
    this.searchService.cardEmitter
      .subscribe((value: DeckCard) => this.deck.addCardToDeck(value));
    this.playerService.getMe().then(me => this.me = me);
  }

  public showImage (imgUrl: string) {
    this.searchService.showCardImage(imgUrl);
  }

  public subtractCard (deckCard: DeckCard) {
    this.deck.subtractCardFromDeck(deckCard);
  }

  public removeCard (deckCard: DeckCard) {
    this.deck.removeCardFromDeck(deckCard);
  }

  public changeDeckStyleInputs (num: number): void {
    const deckStyle = this.deckStyleInputs[num];

    deckStyle.selected = !deckStyle.selected;

    if (deckStyle.selected) {
      this.deck.addDeckType(deckStyle.value.toLowerCase());
    } else {
      this.deck.subtractDeckType(deckStyle.value.toLowerCase());
    }
  }

  public saveDeck () {
    this.deck.name = this.deckName ? this.deckName : 'Nameless';
    this.db.saveDeck(this.me, this.deck);
  }

  public setAsFeatureCard (deckCard: DeckCard): void {
    if (deckCard.featureCard) {
      deckCard.featureCard = !deckCard.featureCard;
      return;
    }
    const prevFeatureCard = this.deck.cards.findIndex(card => card.featureCard);
    if (prevFeatureCard !== -1) { this.deck.cards[prevFeatureCard].featureCard = false; }

    const loc = this.deck.cards.findIndex(card => card.card.name === deckCard.card.name);
    this.deck.featureCard = deckCard.card.imageUrl;
    this.deck.cards[loc].featureCard = true;
  }

  /**
   * Invoked by the clear button on the deck list.
   * Sets the deck to an empty array and resets all commander information.
   *
   * @memberof DeckCreateComponent
   */
  public clearDeck () {
    this.deck = new Deck();
  }

}
