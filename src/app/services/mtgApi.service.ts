import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MtgApiService {

	// /sets, /types, /cards, /formats
	private mtgUrls = {
		booster: 'booster?',
		cards: 'cards?',
		formats: 'formats?',
		sets: 'sets?',
		subtypes: 'subtypes?',
		supertypes: 'supertypes?',
		types: 'types?',
		url: 'https://api.magicthegathering.io/v1/',
	};

	/*
	The accepted delimiters when querying fields are the pipe character (’|’) or a comma (’,’) character.
	The pipe represents a logical “or”, and a comma represents a logical “and”.
	The comma can only be used with fields that accept multiple values (like colors).
	*/

	private cardsFields = {
		artist: 'artist=',
		cmc: 'cmc=',
		colorIdentity: 'colorIdentity=',
		colors: 'colors=',
		contains: 'contains=',
		flavor: 'flavor=',
		foreignName: 'foreignName=',
		gameFormat: 'gameFormat=',
		language: 'language=',
		layout: 'layout=',
		legality: 'legality=',
		loyalty: 'loyalty=',
		name: 'name=',
		number: 'number=',
		orderBy: 'orderBy=',
		page: 'page=',
		pageSize: 'pageSize=',
		power: 'power=',
		random: 'random=',
		rarity: 'rarity=',
		set: 'set=',
		setName: 'setName=',
		subtypes: 'subtypes=',
		supertypes: 'supertypes=',
		text: 'text=',
		toughness: 'toughness=',
		type: 'type=',
		types: 'types='
	};

	private setsFields = {
		block: 'block=',
		name: 'name='
	};


	private cards = 'https://api.magicthegathering.io/v1/cards&pageSize=25';

	constructor (private http: Http) { }

	getCards () {
		return this.http.get(this.cards).map((res: Response) => res.json());
	}

	getCardByName (cardName: string) {
		// url: https://api.magicthegathering.io/v1/cards?name='
		const string = this.mtgUrls.url + this.mtgUrls.cards + this.cardsFields.name;
		console.log(string);

		return this.http.get(string + cardName).map((res: Response) => res.json());
	}

	getCardsFromObject (searchObject, pageNumber: number) {
		console.log(pageNumber);
		let string =
			this.mtgUrls.url + this.mtgUrls.cards + this.cardsFields.page + pageNumber + '&';

		for (const key in searchObject) {
			if (searchObject[key]) {
				console.log('key', key);
				console.log('text', searchObject[key]);
				string += this.cardsFields[key] + searchObject[key];
				string += '&';
			}
		}

		if (string.charAt(string.length) === '&') {
			string = string.substring(0, string.length - 1);
		}
		console.log(string);

		return this.http.get(string).map((res: Response) => res.json());
	}

	/**
	 * The following functions get specific cards and card sets.
	 */

	public getSchemes () {
		const string = this.mtgUrls.url + this.mtgUrls.cards + this.cardsFields.type + 'scheme';

		console.log(string);

		return this.http.get(string).map((res: Response) => res.json());
	}


}
