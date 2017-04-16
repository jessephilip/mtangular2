import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// classes
import { Value } from './types/value';

@Component({
	selector: 'life-button',
	styleUrls: ['./css/lifeButton.component.css'],
	template:
	`
		<button class={{className}} (click)="clickButton(value)">{{text}}</button>
	`
})

export class LifeButtonComponent implements OnInit {

	@Input() value: number;
	@Output() clicked = new EventEmitter<number>();

	private buttonValue = new Value;
	private className:string;
	private text:string;

	ngOnInit() {

		// set the buttonValue equal to the value passed by the parent
		this.buttonValue.value = this.value;

		// style the buttons based on its value
		if (this.value < 0) {
			this.className = 'life-loss';
			this.text = `${this.value}`;
		}
		else {
			this.className = 'life-gain';
			this.text = `+${this.value}`;
		}
	}

	clickButton(value:number):void {
		// emit this buttons value to be captured by its parent
		this.clicked.emit(value);
	}
}
