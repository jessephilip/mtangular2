import { Component } from '@angular/core';

@Component({
	selector: 'mtg-header',
	styleUrls: ['./css/mtgHeader.component.css'],
	template:
	`
		<header>
			<aside class="flex-start">
				<a><i class="fa fa-bars fa-2x"></i></a>
			</aside>
			<main>
				<h1>{{'Game Name'}}</h1>
				<p>{{'Deck Name'}}</p>
			</main>
			<aside class="flex-end">
				<a><i class="fa fa-chevron-right"></i></a>
			</aside>
		</header>
	`
})

export class MtgHeaderComponent {}
