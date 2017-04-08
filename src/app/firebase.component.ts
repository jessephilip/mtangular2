import { Component } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';

// custom components
import { LifeButtonComponent } from './lifeButton.component';

@Component({
	selector: 'firebase',
	styleUrls: ['./css/firebase.component.css'],
	template:
	`
		<button [ngClass]="chooseClass()" (click)="(isActive ? logout() : login())">{{(isActive ? 'Logout' : 'Login')}}</button>
		<div>The user id is {{ (af.auth | async)?.uid }}</div>
		<div>{{(isActive ? 'Welcome' : 'Please sign in.')}}</div>
		<life-button value=-5></life-button><life-button value=-1></life-button>
		<life-button value=1></life-button><life-button value=5></life-button>

	`
})

export class FirebaseComponent {
	constructor(private af:AngularFire) {

		// setup connection to root of firebase database
		this.db = af.database.object('/');
		this.db.subscribe(dbshot => console.log(dbshot));

		// get status of user login and console.log that status
		af.auth.subscribe((user:FirebaseAuthState) => {
			this.onUserStateChange(user);

			// set the value of isActive based on whether user has a value
			user ? this.isActive = true : this.isActive = false;

		});
	}

	// variable to hold the firebase database
	private db: FirebaseObjectObservable<any>;

	private isActive = false;

	login(): void {
		console.log('login');
		this.af.auth.login();
	}

	logout(): void {
		console.log('logout');
		this.af.auth.logout();
	}

	onUserStateChange(user: FirebaseAuthState) {
		console.log(user);
	}

	chooseClass():string {
		return this.isActive ? 'logout' : 'login';
	}

}
