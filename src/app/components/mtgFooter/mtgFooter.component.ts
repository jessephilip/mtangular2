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
				const details = {
					name:	'Coin Flip',
					fail: 'Tails',
					crit: 'Heads',
					result:	this.randomizer.coinFlip()
				};
				this.toolClick(event, details);
			}
		},
		{
			name: 'Planar',
			tool: (event) => {
				const details = {
					name: 'Planar',
					fail: 'Chaos',
					crit: 'Planeswalker',
					result: this.randomizer.planar().toString()
				};
				this.toolClick(event, details);
			}
		},
		{
			name: 'D6',
			tool: (event) => {
				const details = {
					name: 'd6',
					fail: 1,
					crit: 6,
					result: this.randomizer.randomNumber(6).toString()
				};
				this.toolClick(event, details);
			}
		},
		{
			name: 'D20',
			tool: (event) => {
				const details = {
					name: 'd20',
					fail: 1,
					crit: 20,
					result: this.randomizer.randomNumber(20).toString()
				};
				this.toolClick(event, details);
			}
		},
		{
			// modal has three inputs. 1 for amount. 1 radio for type. 1 if type is ?
			name: 'D?',
			tool: () => {
				const name = 'd?';
				const result = this.randomizer.randomNumber(20).toString();
			}
		},
		{
			// 1st: pop modal. 2nd get inputs. 3rd run operations. 4th display result
			// modal has 1 input
			name: 'Multi',
			tool: (event) => {
				const details = {
					name: 'd?',
					result: this.randomizer.randomNumber(20).toString()
				};
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
		const verticalOffset = 10;

		// build modal parameters
		const type = 'balloon'
		,	classes = ['modal', 'balloon']
		,	domX = event.target.offsetLeft
		,	domY = event.target.offsetTop - event.target.clientHeight - verticalOffset
		,	width = event.target.clientWidth + 'px'
		,	height = event.target.clientHeight + 'px'
		,	showVeil = false;

		// add additional classes
		if (details.crit && details.crit.toString() === details.result) {
			classes.push('crit');
		}

		if (details.fail && details.fail.toString() === details.result) {
			classes.push('fail');
		}

		// finalize building the modal
		const modal = new Modal(
			type, // type
			classes, // classes
			[''], // animations
			domX + 'px', // domX
			domY + 'px', // domY
			width + 'px', // width
			height + 'px', // height
			showVeil, // show veil
			details // modal contents
		);

		// send modal object to the modal service
		this.modalService.receiveModal(modal);
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

	public addPlayer (): void {
		// FIXME: Find a better way to increment Opponent Num. If players are removed
		// and then added, duplicates can arise.
		const num = this.playerService.opponents.length;
		this.playerService.addPlayer(new Player('Opponent ' + num, 40));
	}


}
