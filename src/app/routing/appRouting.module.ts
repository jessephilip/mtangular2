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
import { DeckCreateComponent } from 'app/components/deck-manager/deck-create/deck-create.component';
import { DeckMaintainComponent } from 'app/components/deck-manager/deck-maintain/deck-maintain.component';
import { DeckUseComponent } from 'app/components/deck-manager/deck-use/deck-use.component';
import { SchemesComponent } from 'app/components/schemes/schemes.component';
import { EditDeckComponent } from 'app/components/deck-manager/deck-maintain/edit-deck/edit-deck.component';
import { TestComponent } from 'app/components/testing/test/test.component';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'table', component: TableComponent },
  { path: 'host', component: HostGameComponent },
  { path: 'join', component: JoinGameComponent },
  { path: 'deckmanager', component: DeckManagerComponent },
  { path: 'create', component: DeckCreateComponent },
  { path: 'maintain', component: DeckMaintainComponent, children: [
    { path: 'edit/:id', component: EditDeckComponent }
  ] },
  { path: 'use', component: DeckUseComponent },
  { path: 'points', component: PointManagerComponent },
  { path: 'story', component: StoryComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'schemes', component: SchemesComponent },
  { path: 'test', component: TestComponent },
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
