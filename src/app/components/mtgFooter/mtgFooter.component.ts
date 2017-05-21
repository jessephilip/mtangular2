import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

// services
import { RandomizerService } from '../../services/randomizer.service';
import { ModalService } from '../../services/modal.service';

// types
import { Modal } from '../../types/modal.model';


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

	// variable to control life-slider
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
			name: 'D8',
			tool: (event) => {
				const details = {
					name: 'd8',
					fail: 1,
					crit: 8,
					result: this.randomizer.randomNumber(8).toString()
				};
				this.toolClick(event, details);
			}
		},
		{
			name: 'D10',
			tool: (event) => {
				const details = {
					name: 'd10',
					fail: 1,
					crit: 10,
					result: this.randomizer.randomNumber(10).toString()
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
		// {
		// 	name: 'D?',
		// 	tool: () => {
		// 		const name = 'd?';
		// 		const result = this.randomizer.randomNumber(20).toString();
		//
		// 	}
		// },
		{
			name: 'Multi Flip',
			tool: () => {
				const name = 'coins';
				const result = this.randomizer.multi(4, this.randomizer.coinFlip).toString();
				alert(result);
			}
		},
		{
			name: 'Multi D20',
			tool: () => {
				const name = 'd20s';
				const result = this.randomizer.multi(4, () => { return this.randomizer.randomNumber(20); }).toString();
				alert(result);
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

	// create new class to hold player's life
	// TODO: set this life up to pull and push to the firebase
	private _userLife: number;
	private get userLife (): number { return this._userLife; }
	private set userLife (value: number) { this._userLife = value; }

	// boolean to control whether to show the tools
	private showTools = false;

	constructor (
		private randomizer: RandomizerService,
		private modalService: ModalService) {}

	ngOnInit () {
		// TODO: get life from the database
		this.userLife = 40;
	}

	clicked (value: number) {
		this.userLife += value;
		// TODO: update life in the database
	}

	private toolClick (event, details) {
		console.log('1: clickEvent', event);
		const verticalOffset = 10;

		// build modal parameters
		const type = 'balloon'
		,	classes = ['modal', 'balloon']
		,	domX = event.target.offsetLeft
		,	domY = event.target.offsetTop - event.target.clientHeight - verticalOffset
		,	width = event.target.clientWidth
		,	height = event.target.clientHeight
		,	showVeil = false
		,	modal = new Modal(
				type, // type
				classes, // classes
				[''], // animations
				domX, // domX
				domY, // domY
				width, // width
				height, // height
				['cancel'], // buttons,
				showVeil, // show veil
				details // modal contents
		);

		// add additional classes
		if (details.crit && details.crit.toString() === details.result) {
			modal.classes.push('crit');
		}

		if (details.fail && details.fail.toString() === details.result) {
			modal.classes.push('fail');
		}

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
}
