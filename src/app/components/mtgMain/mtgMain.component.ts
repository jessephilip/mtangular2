import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

// services
import { SlidersService } from '../../services/sliders.service';
import { ModalService } from '../../services/modal.service';

@Component({
	animations: [
		trigger('leftSlideIn', [
			state('in', style({transform: 'translateX(0)'})),
			transition('void => *', [
				style({transform: 'translateX(-100%)'}),
				animate(100)
			]),
			transition('* => void', [
				animate(100, style({transform: 'translateX(-100%)'}))
			])
		]),
		trigger('rightSlideIn', [
			state('in', style({transform: 'translateX(0)'})),
			transition('void => *', [
				style({transform: 'translateX(100%)'}),
				animate(100)
			]),
			transition('* => void', [
				animate(100, style({transform: 'translateX(100%)'}))
			])
		])
	],
	selector: 'mtg-main',
	styleUrls: ['./mtgMain.component.scss'],
	templateUrl: './mtgMain.component.html'
})

export class MtgMainComponent implements OnInit {

	// the cards array holds the array of results generated by mtgService
	private cards = [];

	// showPop is tied to the ngIf that controls whether the popbar is displayed
	private showPop = false;

	// TODO: see if showmodal is necessary. should be able to tie the ngIf to the truthy of modalInfo
	// showModal is tied to the ngIf in mtgMain.component.html and determines whether the modal will be displayed
	@Input() showModal = false;

	// this variable is received from app.component and sent to full-modal. it contains the information in the modal
	@Input() modalInfo: any;

	// closeModalToApp is the middleman variable connecting full-modal to app.component
	// this is necessary to change the value of app.component's showModal property
	@Output() closeModalToApp = new EventEmitter<boolean>();

	// use the SlidersService to communicate with the header component and open the left or right slider component
	private leftOpen = this.slidersService.leftSliderStatus;
	private rightOpen = this.slidersService.rightSliderStatus;

	constructor (private slidersService: SlidersService, private modalService: ModalService) {
		slidersService.leftSliderStatus = false;
		slidersService.rightSliderStatus = false;
	}

	closeModal (bool: boolean) {
		this.showModal = bool;
		this.closeModalToApp.emit(false);
	}

	ngOnInit () {
		this.slidersService.leftSliderUpdated.subscribe((value) => { this.leftOpen = value; });
		this.slidersService.rightSliderUpdated.subscribe((value) => { this.rightOpen = value; });
	}

	// test case for the mtgService. returns cards with the name Feldon
	// public getFeldon () {
	// 	this.mtgService.getCardByName('feldon').subscribe(result => {
	// 		console.log(result.cards);
	// 		this.cards = result.cards;
	// 	});
	// }

	// TODO: phase this creation method out for an ngIf method.
	// NOTE: May be superior to the ngIf method due to the fact that multiple popbars could exist at once
	// creates a notification popbar
	createPopBar (): void {
		const mtgMainDom = document.getElementsByTagName('mtg-main')[0];
		const popBarDom = document.createElement('pop-bar');
		mtgMainDom.appendChild(popBarDom);
	}

	// used to remove the popbar notification from the screen
	removePop (show: boolean) {
		this.showPop = show;
	}
}