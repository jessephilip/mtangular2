import { Component, Input, OnInit } from '@angular/core';

// services
import { LifeButtonService } from './services/lifeButton.service';

// classes
import { Life } from './types/life';
import { Value } from './types/value';

@Component({
	providers: [LifeButtonService],
	selector: 'life-button',
	styleUrls: ['./css/lifeButton.component.css'],
	template:
	`
		<button class={{className}} (click)="clickButton()">{{text}}</button>
	`
})

export class LifeButtonComponent implements OnInit {
	constructor(public lbs: LifeButtonService){}

	@Input() value: number;
	@Input() life: number;

	private buttonValue = new Value;
	private className:string;
	private text:string;

	ngOnInit() {

		// set the buttonValue equal to the value passed by the parent
		this.buttonValue.value = this.value;
		console.log(this.life);

		if (this.value < 0) {
			this.className = 'life-loss';
			this.text = `${this.value}`;
		}
		else {
			this.className = 'life-gain';
			this.text = `+${this.value}`;
		}
	}

	private clickButton():void {
		console.log('clicked');
	}
}
