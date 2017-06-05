import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components for routing
import { WelcomeComponent } from 'app/components/welcome/welcome.component';
import { TableComponent } from 'app/components/table/table.component';
import { HostGameComponent } from 'app/components/host-game/host-game.component';
import { JoinGameComponent } from 'app/components/join-game/join-game.component';
import { DeckManagerComponent } from 'app/components/deck-manager/deck-manager.component';
import { PointManagerComponent } from 'app/components/point-manager/point-manager.component';
import { StoryComponent } from 'app/components/story/story.component';
import { SettingsComponent } from 'app/components/settings/settings.component';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';
import { DecksComponent } from 'app/components/deck-manager/decks/decks.component';
import { DeckComponent } from 'app/components/deck-manager/decks/deck/deck.component';

const appRoutes: Routes = [
	{ path: '', component: WelcomeComponent },
	{ path: 'table', component: TableComponent },
	{ path: 'host', component: HostGameComponent },
	{ path: 'join', component: JoinGameComponent },
	{ path: 'deckmanager', component: DeckManagerComponent, children: [
		{ path: ':uid', component: DecksComponent, children: [
			{ path: ':deckid', component: DeckComponent }
		]}
	]},
	{ path: 'points', component: PointManagerComponent },
	{ path: 'story', component: StoryComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: '**', component: NotFoundComponent },
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
