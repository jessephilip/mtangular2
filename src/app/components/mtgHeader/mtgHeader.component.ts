import { Component } from '@angular/core';

// services
import { SlidersService } from '../../services/sliders.service';
import { ModalService } from '../../services/modal.service';

@Component({
	selector: 'mtg-header',
	styleUrls: ['./mtgHeader.component.scss'],
	templateUrl: 'mtgHeader.component.html'
})

export class MtgHeaderComponent {

	constructor (private slidersService: SlidersService, private modalService: ModalService) {}

	private toggleLeftSlider (): void {
		this.slidersService.leftSliderStatus = !this.slidersService.leftSliderStatus;
		this.modalService.showVeil =
			this.modalService.showVeil === 'in' ? 'out' : 'in';
	}

	private toggleRightSlider (): void {
		this.slidersService.rightSliderStatus = !this.slidersService.rightSliderStatus;
		// TODO: Determine if the veil should pop up with a right slider
		this.modalService.showVeil =
			this.modalService.showVeil === 'in' ? 'out' : 'in';
	}
}
