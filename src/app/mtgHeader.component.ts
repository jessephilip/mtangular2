import { Component } from '@angular/core';

@Component({
	selector: 'mtg-header',
	styleUrls: ['./css/mtgHeader.component.css'],
	template:
	`
		<header>
			<div>
				<a><i class="fa fa-bars fa-2x"></i></a>
			</div>
			<div>
				<h1>{{'Game Name'}}</h1>
				<p>{{'Deck Name'}}</p>
			</div>
			<div>
				<a><i class="fa fa-chevron-right"></i></a>
			</div>
		</header>
	`
})

export class MtgHeaderComponent {}
