import { Component, OnInit } from '@angular/core';

// classes
import { Life } from '../../types/life';
import { Tools } from '../../types/tools';

@Component({
	selector: 'mtg-footer',
	styleUrls: ['./mtgFooter.component.scss'],
	templateUrl: './mtgFooter.component.html'
})

export class MtgFooterComponent implements OnInit {

	// substantiate tools class
	public tools:Tools = new Tools;

	// values for life buttons
	private values: Array<number> = [-10, -5, -1, 1, 5, 10];

	// filter buttons for placement on the DOM
	private pos: Array<number> = this.values.filter(i => {return i > 0});
	private neg: Array<number> = this.values.filter(i => {return i < 0});

	// values for tool buttons
	private toolButtons = [
		{
			name: 'Coin Flip',
			tool: ()=> {console.log(this.tools.coinFlip());}
		},
		{
			name: 'Multi Flip',
			tool: ()=> {console.log(this.tools.coinFlips(4));}
		},
		{
			name: 'D6',
			tool: ()=> {console.log(this.tools.randomizer(6));}
		},
		{
			name: 'D20',
			tool: ()=> {console.log(this.tools.randomizer(20));}
		},
		{
			name: 'Multi D20',
			tool: ()=> {console.log(this.tools.multiple(4, 20));}
		},
		{
			name: 'x',
			tool: ()=> this.toggleTools()
		}
	];

	// create new class to hold player's life
	private playerLife: Life = new Life;

	// boolean to control whether to show the tools
	private showTools:boolean = false;

	ngOnInit() {
		// TODO: get life from the database
		// set player's life = 40
		this.playerLife.life = 40;
		console.log('mtgFooter: ngOnInit');
	}

	clicked(value: number) {
		this.playerLife.life += value;
		// TODO: update life in the database
	}

	public toggleTools():void {
		this.showTools ? this.showTools = false : this.showTools = true;
	}

	// random tools functions

	private coinFlip() {
		console.log(this.tools.coinFlip());
	}

	// TODO: set up this for user input
	private multiFlip() {
		console.log(this.tools.coinFlips(8));
	}

	private d6() {
		console.log(this.tools.randomizer(6));
	}

	private d20() {
		console.log(this.tools.randomizer(20));
	}

	// TODO: set up this for user input
	private multi20() {
		console.log(this.tools.multiple(6, 20));
	}
}
