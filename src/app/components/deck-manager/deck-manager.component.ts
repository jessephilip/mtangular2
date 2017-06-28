import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

import { DeckCard } from 'app/types/deckCard.model';
import { Deck } from 'app/types/deck.model';

@Component({
	selector: 'mtg-deck-manager',
	templateUrl: './deck-manager.component.html',
	styleUrls: ['./deck-manager.component.scss']
})
export class DeckManagerComponent implements OnInit {

	public playerDecks = [];

	constructor (private dbService: DatabaseService) {}

	ngOnInit () {
		this.dbService.getPlayerDecks('mvtYmiQpf0ai0Bes5jJRuIuEyaD2').then(decks => {
			console.log(decks);
			this.playerDecks = decks;
		});
	}
}
