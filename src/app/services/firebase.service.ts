/*	Service for accessing the Firebase database and using Firebase for authorization.
*	The database is set up as setout below:
*
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
*/
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseService {

	constructor (
		private db: AngularFireDatabase) { }

}
