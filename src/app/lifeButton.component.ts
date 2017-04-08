import { Component, Input, OnInit } from '@angular/core';

@Component({
	// inputs: ['value'],
	selector: 'life-button',
	styleUrls: ['./css/lifeButton.component.css'],
	template:
	`
		<button class={{className}} (click)="clickButton()">{{text}}</button>
	`
})

export class LifeButtonComponent implements OnInit {

	@Input() value:number;

	private className:string;
	private text:string;

	ngOnInit() {

		if (this.value < 0) {
			this.setClassName('life-loss');
			this.setText(`${this.value}`);
		}
		else {
			this.setClassName('life-gain');
			this.setText(`+${this.value}`);
		}
	}

	public getClassName():string {
		return this.className;
	}

	public setClassName(className:string):string {
		this.className = className;
		return this.className;
	}

	public getText():string {
		return this.text;
	}

	public setText(text:string):string {
		this.text = text;
		return this.text;
	}

	public getValue():number {
		return this.value;
	}

	public setValue(value:number):number {
		this.value = value;
		return this.value;
	}

	private clickButton():void {
		console.log('clicked: ', this.value);
	}
}
