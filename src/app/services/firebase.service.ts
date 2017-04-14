import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {
	constructor(public af: AngularFire) {}

	// functions for authorization through firebase

	// login with firebase
	public login(): void {
		this.af.auth.login();
	}

	// logout with firebase
	public logout(): void {
		this.af.auth.logout();
	}

	// returns the current user
	public getUser(): any {
		return new Promise((resolve, reject) => {
			this.af.auth.subscribe((user: FirebaseAuthState) => {
				resolve(user);
			});
		});
	}

	// database locations

	/* Database Design
	root
		games
			active
			closed
		players
			decks
			joinedGames
				active (link to games)
				closed (link to games)
			settings
			stats
		points
	*/

	private players: string = '/players';
	private settings: string = '/settings';
	private decks: string = '/decks';
	private games: string = '/games';
	private joinedGames: string = '/joinedGames';
	private active: string = '/active';
	private closed: string = '/closed';
	private points: string = '/points';

	// functions for database through firebase

	public save(data: any, location: string) {
		let db = this.af.database.object(location);
		db.set(data).then();
	}

	public update(data: any, location: string) {
		let db = this.af.database.object(location);
		db.update(data);
	}

	public read(location:string) {
		return new Promise((resolve, reject) => {
			let db = this.af.database.object(location);
			db.subscribe(snapshot => resolve(snapshot));
		});
	}

	public delete(location:string) {
		let db = this.af.database.object(location);
		db.remove();
	}
}
