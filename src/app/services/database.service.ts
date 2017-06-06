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
import { Player } from '../types/player.model';
import { Game } from 'app/types/game.model';

// injectable required for setup. Assume it has something to do with the way AngularFireDatabase is designed.
@Injectable()
export class DatabaseService {

	constructor (private af: AngularFireDatabase) {}

	// CRUD for general
	public save (baseLoc: string, object): void {
		this.af.object(`/${baseLoc}/${object.id}`).update(object);
	}

	public read (baseLoc: string, object): Promise<any> {
		return new Promise ((resolve, reject) => {
			this.af.object(`/${baseLoc}/${object.id}`).subscribe(value => {
				resolve(value);
			});
		});
	}

	public remove (baseLoc: string, object): void {
		this.af.object(`/${baseLoc}/${object.id}`).remove();
	}

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
}
