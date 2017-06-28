import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RandomizerService } from './randomizer.service';
import 'rxjs/add/operator/map';

@Injectable()
export class SchemesService {

	private _schemesWorking;
	public get schemesWorking () { return this._schemesWorking; }
	public set schemesWorking (value) {
		this._schemesWorking = value;
		this.schemesEmitter.emit(value);
	}
	public schemesEmitter = new EventEmitter<any>();


	private _currentSchemes;
	public get currentSchemes () { return this._currentSchemes; }
	public set currentSchemes (value) {
		this._currentSchemes = value;
		this.currentEmitter.emit(value);
	}
	public currentEmitter = new EventEmitter<any>();

	private _ongoing;
	public get ongoing () { return this._ongoing; }
	public set ongoing (value) {
		this._ongoing = value;
		this.ongoingEmitter.emit(value);
	}
	public ongoingEmitter = new EventEmitter<any>();

	private _temporary;
	public get temporary () { return this._temporary; }
	public set temporary (value) {
		this._temporary = value;
		this.temporaryEmitter.emit(value);
	}
	public temporaryEmitter = new EventEmitter<any>();

	constructor (private http: Http, private randomizer: RandomizerService) {
		this.getSchemes().subscribe(schemes => { this.schemesWorking = schemes.cards; });
		this.currentSchemes = [];
	}

	/**
	 * Randomly selects a card out of the scheme deck and adds it to the currentSchemes property.
	 * If every card in the deck is used, the deck refills itself.
	 *
	 * @returns this.currentSchemes. The currently active schemes.
	 *
	 * @memberof SchemesService
	 */
	public getNextScheme () {
		let nextScheme;

		this.currentSchemes = this.currentSchemes.filter(scheme => {
			return scheme['ongoing'] === true;
		});

		if (this.schemesWorking.length > 0) {
			const random = this.randomizer.randomNumber(this.schemesWorking.length);
			nextScheme = this.schemesWorking[random - 1];

			if (nextScheme.type.indexOf('Ongoing') >= 0) {
				nextScheme['ongoing'] = true;
			} else {
				nextScheme['ongoing'] = false;
			}

			this.currentSchemes.push(nextScheme);
			this.schemesWorking.splice(random - 1, 1);
			this.ongoing = this.filterOngoing();
			this.temporary = this.filterTemporary();

		} else {
			this.schemesWorking = this.getSchemes().subscribe(schemes => {
				this.schemesWorking = schemes.cards;
			});
		}

		return this.currentSchemes;
	}

	public filterOngoing () {
		return this.currentSchemes.filter(scheme => {
			return scheme['ongoing'] === true;
		});
	}

	public filterTemporary () {
		return this.currentSchemes.filter(scheme => {
			return scheme['ongoing'] === false;
		});
	}


	/**
	 * The following functions get specific cards and card sets.
	 */

	public getSchemes () {
		const string = 'https://api.magicthegathering.io/v1/cards?type=scheme';
		return this.http.get(string).map((res: Response) => res.json());
	}
}
