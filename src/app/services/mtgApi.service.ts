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


	private cards = 'https://api.magicthegathering.io/v1/cards';

	constructor (private http: Http) { }

	getCards () {
		return this.http.get(this.cards).map((res: Response) => res.json());
	}

	getCardByName (cardName: string) {
		const string: string = this.mtgUrls.url + this.mtgUrls.cards + this.cardsFields.name;
		console.log(string);

		return this.http.get(string + cardName).map((res: Response) => res.json());
	}
}
