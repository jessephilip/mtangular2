import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'pop-bar',
	styleUrls:['./css/popBar.component.css'],
	template:
	`
	<main>
		<aside class="flex-start"></aside>
		<section>
			{{text || 'this is text'}}
		</section>
		<aside class="flex-end">
			<a (click)="remove()"><i class="fa fa-times-circle-o fa-2x"></i></a>
		</aside>
	</main>
	`
})

export class PopBarComponent {
	constructor() {
		const subscribe = this.timer.subscribe(val => this.removePop.emit(false));
	}

	@Output() removePop = new EventEmitter<boolean>();

	timer = Observable.timer(5000);

	// emit
	remove():void {
		this.removePop.emit(false);
	}
}
