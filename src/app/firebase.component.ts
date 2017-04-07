import { Component } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';

@Component({
	selector: 'firebase',
	styles: [],
	template:
	`
		<button (click)="login()">Login</button>
	`
})

export class FirebaseComponent {
	constructor(private af:AngularFire) {

		// setup connection to root of firebase database
		this.db = af.database.object('/');
		this.db.subscribe(snapshot => console.log(snapshot));

		// console.log(af.auth.subscribe());
		af.auth.subscribe((user:FirebaseAuthState) => this.onUserStateChange(user));
	}

	// variable to hold the firebase database
	private db:FirebaseObjectObservable<any>;

	login():void {
		this.af.auth.login();
	}

	onUserStateChange(user:FirebaseAuthState) {
		console.log(user.google);
	}

}
