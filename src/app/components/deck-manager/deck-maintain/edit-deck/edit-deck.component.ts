import {DatabaseService} from '../../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mtg-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.scss']
})
export class EditDeckComponent implements OnInit {

  public types = [
    { type: 'Creatures', text: 'creature', cards: []},
    { type: 'Enchantments', text: 'enchantment', cards: []},
    { type: 'Sorceries', text: 'sorcery', cards: []},
    { type: 'Instants', text: 'instant', cards: []},
    { type: 'Artifacts', text: 'artifact', cards: []},
    { type: 'Lands', text: 'land', cards: []},
  ];
  public currentDeck;
  private deckLoc: number;

  constructor (private route: ActivatedRoute, private dbService: DatabaseService) {}

  ngOnInit () {
    this.route.params.subscribe(value => {
      this.deckLoc = value.id;
      this.getDeck(this.deckLoc);
    });
  }

  private getDeck (id: number) {
    if (!this.dbService.playerDecks) {
        this.dbService.getPlayerDecks('mvtYmiQpf0ai0Bes5jJRuIuEyaD2')
        .then(decks => {
          this.currentDeck = decks[id];
        });
    } else {
      this.currentDeck = this.dbService.playerDecks[id];
    }
    this.filterDeck(this.currentDeck);
  }

  /**
   * Filters the currentDeck based on the types array.
   *
   * @private
   * @param {any} deck
   * @memberof EditDeckComponent
   */
  private filterDeck (deck) {
    const cards = deck.deck._cards;
    this.types.forEach(element => {
      const cardType = element.type.toLowerCase();
      element.cards = cards.filter(card => {
        const type = card.card.type.toLowerCase();
        return type.indexOf(element.text) !== -1;
      });
    });
  }

}
