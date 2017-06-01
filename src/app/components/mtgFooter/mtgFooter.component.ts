import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

// services
import { RandomizerService } from '../../services/randomizer.service';
import { ModalService } from '../../services/modal.service';

// types
import { Modal } from '../../types/modal.model';
import { PlayerService } from 'app/services/player.service';
import { Player } from 'app/types/player.model';


@Component({
	animations: [
		trigger('tool-slide', [
			state('in', style({transform: 'translateX(0)'})),
			transition('void => *', [
				style({transform: 'translateX(-100%)'}),
				animate(100)
			]),
			transition('* => void', [
				animate(100, style({transform: 'translateX(-100%)'}))
			])
		]),
		trigger('life-slide', [
			state('inactive', style({
				opacity: '1',
				transform: 'translateX(0)'
			})),
			state('active', style({
				opacity: '0',
				transform: 'translateX(100%)'
			})),
			transition('inactive => active', animate('100ms ease-in')),
			transition('active => inactive', animate('100ms ease-out')),
		]),
	],
	selector: 'mtg-footer',
	styleUrls: ['./mtgFooter.component.scss'],
	templateUrl: './mtgFooter.component.html'
})

export class MtgFooterComponent implements OnInit {

	// variable representing the current player
	private me: Player;

	// variable controlling whether the input or the data shows for me.lifeTotal
	private inputLifeTotal = false;

	// variable to control life-slider
	// FIXME: animations on life-slider aren't working
	private lifeSlider = 'inactive';

	// values for life buttons
	private values: number[] = [-10, -5, -1, 1, 5, 10];

	// filter buttons for placement on the DOM
	private pos: number[] = this.values.filter(i => {return i > 0; });
	private neg: number[] = this.values.filter(i => {return i < 0; });

	// values for tool buttons
	// TODO: for each of these buttons make the click of the button pop up a better visual to screen
	private toolButtons = [
		{
			name: 'Coin Flip',
			tool: (event) => {
				const result = this.calculateChance(2);
				const converted = this.convertToCoin(result);
				const details = {
					name:	'Coin Flip',
					type: 'balloon',
					fail: 'Tails',
					crit: 'Heads',
					result:	converted
				};
				this.toolClick(event, details);
			}
		},
		{
			name: 'Planar',
			tool: (event) => {
				const result = this.calculateChance(6);
				const converted = this.convertToPlanar(result);
				const details = {
					name: 'Planar',
					type: 'balloon',
					fail: 'Chaos',
					crit: 'Planeswalker',
					result: converted
				};
				this.toolClick(event, details);
			}
		},
		{
			name: 'D6',
			tool: (event) => {
				const result = this.calculateChance(6);
				const details = {
					name: 'd6',
					type: 'balloon',
					fail: 1,
					crit: 6,
					result: result
				};
				this.toolClick(event, details);
			}
		},
		{
			name: 'D20',
			tool: (event) => {
				const result = this.calculateChance(20);
				const details = {
					name: 'd20',
					type: 'balloon',
					fail: 1,
					crit: 20,
					result: result
				};
				this.toolClick(event, details);
			}
		},
		{
			name: 'D?',
			tool: (event) => {
				const details = {
					name: 'd?',
					type: 'balloon-input',
					result: (num: number) => {
						return this.calculateChance(num);
					}
				};

				this.toolClick(event, details);
			}
		},
		{
			name: 'Multi',
			tool: (event) => {
				this.modalService.isMulti = !this.modalService.isMulti;
				this._isMulti = !this.isMulti;
			}
		},
		{
			name: 'x',
			tool: () => {
				this.modalService.destroyModal();
				this.toggleTools();
			}
		}
	];

	// boolean to control whether to show the tools
	public showTools = false;

	// boolean to control the css of the multi tool button
	private _isMulti = false;
	public get isMulti(): boolean { return this._isMulti; }
	public set isMulti(value: boolean) { this._isMulti = value; }

	constructor (
		private randomizer: RandomizerService,
		private modalService: ModalService,
		private playerService: PlayerService) {}

	ngOnInit () {
		// TODO: get life from the database
		this.me = this.playerService.opponents[0];
	}

	private toggleInputLifeTotal () {
		this.inputLifeTotal = !this.inputLifeTotal;
		this.me.lifeTotal = Number(this.me.lifeTotal);

		const loc = this.playerService.opponents.indexOf(this.me);
		this.playerService.opponents[loc].lifeTotal = this.me.lifeTotal;
	}

	private toolClick (event, details) {
		// console.log('1: clickEvent', event);
		this.modalService.destroyModal();

		const modalFrame = {
			event: event,
			details: details,
			type: details.type
		};

		// send modal object to the modal service
		this.modalService.receiveModal(modalFrame);
	}

	public toggleTools (): void {
		if (this.showTools) {
			this.showTools = false;
			this.lifeSlider = 'inactive';
		} else {
			this.showTools = true;
			this.lifeSlider = 'active';
		}
	}

	public calculateChance (num: number): number[] {
		const result = [];
		const x = this.playerService.opponents.length;

		if (this.modalService.isMulti) {
			for (let i = 0; i < x; i++) {
				result.push(this.randomizer.randomNumber(num));
			}
		} else {
			result.push(this.randomizer.randomNumber(num));
		}
		return result;
	}

	public convertToCoin (array: number[]) {
		return array.map(element => {
			return element === 1 ? 'Tails' : 'Heads';
		});
	}

	public convertToPlanar (array: number[]) {
		return array.map(element => {
			switch (element) {
				case 1:
					return 'Planeswalker';
				case 2:
					return 'Chaos';
				default:
					return 'Blank';
			}
		});
	}

	public addPlayer (): void {
		// FIXME: Find a better way to increment Opponent Num. If players are removed
		// and then added, duplicates can arise.
		const num = this.playerService.opponents.length;
		this.playerService.addPlayer(new Player('Opponent ' + num, 40));
	}


}
