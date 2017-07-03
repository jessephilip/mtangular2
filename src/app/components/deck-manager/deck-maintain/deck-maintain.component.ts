import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'mtg-deck-maintain',
  templateUrl: './deck-maintain.component.html',
  styleUrls: ['./deck-maintain.component.scss']
})
export class DeckMaintainComponent implements OnInit {

  public playerDecks = [];

  constructor (private dbService: DatabaseService) {}

  ngOnInit () {
    this.dbService.getPlayerDecks('mvtYmiQpf0ai0Bes5jJRuIuEyaD2').then(decks => {
      this.dbService.playerDecks = decks;
      this.playerDecks = decks;
    });
  }
}
