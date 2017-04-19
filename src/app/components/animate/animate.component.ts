import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
	selector: 'app-animate',
	styleUrls: ['./animate.component.scss'],
	templateUrl: './animate.component.html',
	animations: [
		trigger('triggerBool', [
			state('inactive', style({
				color: 'black',
				transform: 'scale(1)'
			})),
			state('active', style({
				color: 'red',
				transform: 'scale(1.1)'
			})),
			transition('inactive => active', animate('100ms ease-in')),
			transition('active => inactive', animate('100ms ease-out')),
		])
	]
})
export class AnimateComponent implements OnInit {

	constructor() { }

	private yesOrNo:string = 'inactive';

	private changeState():void {
		if (this.yesOrNo == "active") this.yesOrNo = "inactive";
		else this.yesOrNo = "active";
	}

	ngOnInit() {
	}

}
