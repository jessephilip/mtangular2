import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { DatabaseService } from 'app/services/database.service';
import { PlayerService } from 'app/services/player.service';
import { HelperService } from 'app/services/helper.service';
import { SearchService } from 'app/services/search.service';

import { DeckCard } from 'app/types/deckCard.model';

@Component({
  animations: [
    trigger('appear', [
      state('void', style({
        opacity: '0',
      })),
      state('*', style({
        opacity: '1',
      })),
      transition('void <=> *', animate('100ms'))
    ])
  ],
  selector: 'mtg-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public results = [];

  constructor (
    private dbService: DatabaseService,
    private playerService: PlayerService,
    private helperService: HelperService,
    private searchService: SearchService) {}

  ngOnInit () {
    this.searchService.resultsEmitter
      .subscribe(value => this.results = value);
  }

  public addToDeck (card) {
    console.log('card: ', card);
    this.searchService.cardEmitter.emit(new DeckCard(card));
  }
}
