/**
 * Service for accessing the Firebase database.
 *	/* Database Design
 *	root
 *		games
 *			active
 *			closed
 *		players
 *			player
 *				decks
 *				joinedGames
 *					active (link to games)
 *					closed (link to games)
 *			settings
 *			stats
 *			points_achieved
 *		points
 * @export
 * @class DatabaseService
 */

import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { PlayerService } from './player.service';
import { DeckCard } from '../types/deckCard.model';
import { Deck } from '../types/deck.model';
import { Player } from '../types/player.model';
import { Game } from 'app/types/game.model';

// injectable required for setup. Assume it has something to do with the way AngularFireDatabase is designed.
@Injectable()
export class DatabaseService {

  private _playerDecks: any[];
  public get playerDecks(): any[] { return this._playerDecks; }
  public set playerDecks(value: any[]) { this._playerDecks = value; }

  constructor (private af: AngularFireDatabase, private playerService: PlayerService) {}

  // CRUD for games
  public saveGame (game: Game): void {
    this.af.object(`/games/${game.id}`).update(game);
  }

  public readGame (game: Game): Promise<Game> {
    return new Promise ((resolve, reject) => {
      this.af.object(`/games/${game.id}`).subscribe(value => {
        resolve(value);
      });
    });
  }

  public removeGame (game: Game): void {
    this.af.object(`/games/${game.id}`).remove();
  }

  public saveDeck (player: Player, deck: Deck): void {
    if (deck.cards.length > 0) {
      this.af.object(`/players/${player.id}/decks/${deck.id}`).update(deck);
    } else {
      throw new Error(`Cannot save deck because no ${deck.name} has no cards.`);
    }
  }

  // TODO: Make this so it can find a deck by deck name or deck id ... or just deck
  public readDeck (player: Player, deck: Deck ): Promise<Game> {
    return new Promise ((resolve, reject) => {
      this.af.object(`/players/${player.id}/decks/${deck.id}`).subscribe(value => {
        resolve(value);
      });
    });
  }

  public removeDeck (player: Player, deck: any): void {
    this.af.object(`/players/${player.id}/decks/${deck.id}`).remove();
  }

  // CRUD for players
  public savePlayer (player: Player): void {
    this.af.object(`/games/${player.id}`).update(player);
  }

  public readPlayer (player: Player): Promise<Player> {
    return new Promise ((resolve, reject) => {
      this.af.object(`/players/${player.id}`).subscribe(value => {
        resolve(value);
      });
    });
  }

  public removePlayer (player: Player): void {
    this.af.object(`/players/${player.id}`).remove();
  }

  // game methods
  public addPlayerToGame (player: Player, game: Game): void {
    this.af.object(`/games/${game.id}/players/`).update(player);
  }

  public removePlayerFromGame (player: Player, game: Game): void {
    this.af.object(`/games/${game.id}/players/${player.id}`).remove();
  }

  public getPlayerFromGame (player: Player, game: Game): Promise<Player[]> {
    return new Promise ((resolve, reject) => {
      this.af.object(`/games/${game.id}/players/${player.id}`).subscribe(value => {
        resolve(value);
      });
    });
  }

  public getPlayersFromGame (game: Game): Promise<Player[]> {
    return new Promise ((resolve, reject) => {
      this.af.object(`/games/${game.id}/players`).subscribe(value => {
        resolve(value);
      });
    });
  }

  public getGames (): Promise<Game[]> {
    return new Promise ((resolve, reject) => {
      this.af.object(`/games`).subscribe(value => {
        resolve(value);
      });
    });
  }

  public getPlayers (): Promise<Player[]> {
    return new Promise ((resolve, reject) => {
      this.af.object(`/players`).subscribe(value => {
        resolve(value);
      });
    });
  }

  public getPlayerDecks (playerId: string): any {
    return new Promise ((resolve, reject) => {
      this.af.list(`/players/${playerId}/decks`).subscribe(decks => {
        resolve(decks);
      });
    });
  }
}
