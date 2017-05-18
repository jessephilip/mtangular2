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

import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';

export class FirebaseService {

	constructor (private af: AngularFire) {}

	// functions for authorization through firebase

	// login with firebase
	public login (): void {
		this.af.auth.login();
	}

	// logout with firebase
	public logout (): void {
		this.af.auth.logout();
	}

	// returns the current user
	public getUser (): any {
		return new Promise((resolve, reject) => {
			this.af.auth.subscribe((user: FirebaseAuthState) => {
				resolve(user);
			});
		});
	}	// functions for database through firebase

	public save (data: any, location: string) {
		const db = this.af.database.object(location);
		db.set(data).then();
	}

	public update (data: any, location: string) {
		const db = this.af.database.object(location);
		db.update(data);
	}

	public read (location: string) {
		return new Promise((resolve, reject) => {
			const db = this.af.database.object(location);
			db.subscribe(snapshot => resolve(snapshot));
		});
	}

	public delete (location: string) {
		const db = this.af.database.object(location);
		db.remove();
	}
}
