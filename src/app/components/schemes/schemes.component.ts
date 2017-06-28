import { Component, OnInit } from '@angular/core';
import { SchemesService } from 'app/services/schemes.service';
import { MtgApiService } from '../../services/mtgApi.service';
import { RandomizerService } from '../../services/randomizer.service';

@Component({
	selector: 'mtg-schemes',
	templateUrl: './schemes.component.html',
	styleUrls: ['./schemes.component.scss']
})
export class SchemesComponent implements OnInit {
	private schemesWorking;
	private currentSchemes;
	public ongoing;
	public temporary;

	constructor (private schemesService: SchemesService) { }

	ngOnInit () {
		this.schemesService.schemesEmitter.subscribe(schemes => {
			this.schemesWorking = schemes;
		});

		this.schemesService.currentEmitter.subscribe(current => {
			this.currentSchemes = current;
		});

		this.schemesService.ongoingEmitter.subscribe(ongoing => {
			this.ongoing = ongoing;
		});

		this.schemesService.temporaryEmitter.subscribe(temporary => {
			this.temporary = temporary;
		});
	}

	// public next () {
	// 	this.currentSchemes = this.schemesService.getNextScheme();
	// 	this.ongoing = this.filterOngoing();
	// 	this.temporary = this.filterTemporary();
	// }

	public removeScheme (id) {
		const loc = this.currentSchemes.findIndex(scheme => {
			return scheme.id === id;
		});

		this.currentSchemes.splice(loc, 1);
		this.ongoing.splice(id, 1);
	}
}
