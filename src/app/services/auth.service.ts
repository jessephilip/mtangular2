/**
 * Service for accessing and using Firebase for authorization.
 * @export
 * @class AuthService
 */

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

// injectable required for setup.Assume it has something to do with the way AngularFireAuth is designed.
@Injectable()
export class AuthService {

	// _user variable to hold the information about the user of this application
	/**
	 * Usable properties in _user:
	 *	displayName: string
	 *	email: string
	 *	emailVerified: boolean
	 *	identifierNumber: unknown
	 *	isAnonymous: boolean
	 *	photoURL: string
	 *	refreshToken: string
	 *	uid: string (userId)
	 *	v: string (firebase name of app)
	 *
	 * @private
	 * @type {Observable<firebase.User>}
	 * @memberof AuthService
	 */
	private _user: Observable<firebase.User>;
	public get user(): Observable<firebase.User> { return this._user; }
	public set user(value: Observable<firebase.User>) { this._user = value; }

	constructor (private af: AngularFireAuth) {
		this.user = af.authState;
	}

	public loginGoogle () {
		this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
	}

	public logout () {
		this.af.auth.signOut();
	}
}
