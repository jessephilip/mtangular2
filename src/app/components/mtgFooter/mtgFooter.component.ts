import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

// import services
import { RandomizerService } from '../../services/randomizer.service';

// classes
import { Life } from '../../types/life';
import { Chance } from '../../types/chance';

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

	@Output() emitChance = new EventEmitter<Chance>();

	// variable to control life-slider
	private lifeSlider = 'inactive';

	// values for life buttons
	private values: number[] = [-10, -5, -1, 1, 5, 10];

	// filter buttons for placement on the DOM
	private pos: number[] = this.values.filter(i => {return i > 0; });
	private neg: number[] = this.values.filter(i => {return i < 0; });

	private chanceResult: Chance = new Chance;

	// values for tool buttons
	private toolButtons = [
		{
			name: 'Coin Flip',
			tool: () => {
				this.chanceResult.name = 'coin';
				this.chanceResult.result = this.randomizer.coinFlip();
				this.emitChance.emit(this.chanceResult);
			}
		},
		{
			name: 'D6',
			tool: () => {
				this.chanceResult.name = 'd6';
				this.chanceResult.result = this.randomizer.randomNumber(6).toString();
				this.emitChance.emit(this.chanceResult);
			}
		},
		{
			name: 'Planar',
			tool: () => {
				this.chanceResult.name = 'Planar';
				this.chanceResult.result = this.randomizer.planar().toString();
				this.emitChance.emit(this.chanceResult);
			}
		},
		{
			name: 'D8',
			tool: () => {
				this.chanceResult.name = 'd8';
				this.chanceResult.result = this.randomizer.randomNumber(8).toString();
				this.emitChance.emit(this.chanceResult);
			}
		},
		{
			name: 'D10',
			tool: () => {
				this.chanceResult.name = 'd10';
				this.chanceResult.result = this.randomizer.randomNumber(10).toString();
				this.emitChance.emit(this.chanceResult);
			}
		},
		{
			name: 'D20',
			tool: () => {
				this.chanceResult.name = 'd20';
				this.chanceResult.result = this.randomizer.randomNumber(20).toString();
				this.emitChance.emit(this.chanceResult);
			}
		},
		// {
		// 	name: 'D?',
		// 	tool: () => {
		// 		this.chanceResult.name = 'd?';
		// 		this.chanceResult.result = this.randomizer.randomNumber(20).toString();
		// 		this.emitChance.emit(this.chanceResult);
		// 	}
		// },
		{
			name: 'Multi Flip',
			tool: () => {
				this.chanceResult.name = 'coins';
				this.chanceResult.result = this.randomizer.multi(4, this.randomizer.coinFlip).toString();
				this.emitChance.emit(this.chanceResult);
			}
		},
		{
			name: 'Multi D20',
			tool: () => {
				this.chanceResult.name = 'd20s';
				this.chanceResult.result = this.randomizer.multi(4, () => { return this.randomizer.randomNumber(20); }).toString();
				this.emitChance.emit(this.chanceResult);
			}
		},
		{
			name: 'x',
			tool: () => this.toggleTools()
		}
	];

	// create new class to hold player's life
	private playerLife: Life = new Life;

	// boolean to control whether to show the tools
	private showTools = false;

	constructor (private randomizer: RandomizerService) {}

	ngOnInit () {
		// TODO: get life from the database
		// set player's life = 40
		this.playerLife.life = 40;
		console.log('mtgFooter: ngOnInit');
	}

	clicked (value: number) {
		this.playerLife.life += value;
		// TODO: update life in the database
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

	// random tools functions

	// private coinFlip() {
	// 	console.log(this.tools.coinFlip());
	// }

	// // TODO: set up this for user input
	// private multiFlip() {
	// 	console.log(this.tools.coinFlips(8));
	// }

	// private d6() {
	// 	console.log(this.tools.randomizer(6));
	// }

	// private d20() {
	// 	console.log(this.tools.randomizer(20));
	// }

	// // TODO: set up this for user input
	// private multi20() {
	// 	console.log(this.tools.multiple(6, 20));
	// }
}
