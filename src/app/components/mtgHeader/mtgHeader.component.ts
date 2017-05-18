import { Component } from '@angular/core';

// services
import { SlidersService } from '../../services/sliders.service';

@Component({
	selector: 'mtg-header',
	styleUrls: ['./mtgHeader.component.scss'],
	templateUrl: 'mtgHeader.component.html'
})

export class MtgHeaderComponent {

	constructor (private slidersService: SlidersService) {}

	private toggleLeftSlider (): void {
		this.slidersService.leftSliderStatus = !this.slidersService.leftSliderStatus;
	}

	private toggleRightSlider (): void {
		this.slidersService.rightSliderStatus = !this.slidersService.rightSliderStatus;
	}
}
