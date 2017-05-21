import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mtg-life-button',
	styleUrls: ['./lifeButton.component.scss'],
	template:
	`
		<button
			[ngClass]="value > 0 ? 'life-gain' : 'life-loss'"
			(click)="clickButton(value)">
			{{ value > 0 ? '+' + value : value }}
		</button>
	`
})
export class LifeButtonComponent implements OnInit {

	@Input() value: number;
	@Output() clicked = new EventEmitter<number>();

	ngOnInit () {}

	private clickButton (): void {
		this.clicked.emit(this.value);
	}
}
