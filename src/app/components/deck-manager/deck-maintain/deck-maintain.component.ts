import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { HelperService } from '../../../services/helper.service';
import { PlayerService } from '../../../services/player.service';
import { Player } from '../../../types/player.model';

@Component({
  selector: 'mtg-deck-maintain',
  templateUrl: './deck-maintain.component.html',
  styleUrls: ['./deck-maintain.component.scss']
})
export class DeckMaintainComponent implements OnInit {

  public playerDecks = [];
  public blankCard = this.helperService.blankCard;
  private me: Player;

  constructor (
    private dbService: DatabaseService,
    private helperService: HelperService,
    private playerService: PlayerService) {}

  ngOnInit () {
    this.playerService.getMe()
      .then(me => this.me = me)
      .then(() => this.dbService.getPlayerDecks(this.me.id))
      .then(decks => {
        console.log('decks: ', decks);
        this.playerDecks = decks;
      });
  }
}
