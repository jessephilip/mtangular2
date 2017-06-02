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

import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

// injectable required for setup. Assume it has something to do with the way AngularFireDatabase is designed.
@Injectable()
export class DatabaseService {

	constructor (private db: AngularFireDatabase) {}
}
