import { Component, OnInit } from '@angular/core';

// services
import { LifeButtonService } from './services/lifeButton.service';

// classes
import { Life } from './types/life';

@Component({
	providers: [LifeButtonService],
	selector: 'mtg-footer',
	styleUrls: ['./css/mtgFooter.component.css'],
	templateUrl: './views/mtgFooter.component.html'
})

export class MtgFooterComponent implements OnInit {
	constructor(lbs: LifeButtonService) {
	}

	private playerLife: Life = new Life;

	ngOnInit() {
		// set player's life = 40
		this.playerLife.life = 40;
	}


}
