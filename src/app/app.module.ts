import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

// third party
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// custom components
import { AppComponent } from 'app/app.component';
import { LifeButtonComponent } from 'app/components/lifeButton/lifeButton.component';
import { MtgHeaderComponent } from 'app/components/mtgHeader/mtgHeader.component';
import { MtgMainComponent } from 'app/components/mtgMain/mtgMain.component';
import { MtgFooterComponent } from 'app/components/mtgFooter/mtgFooter.component';
import { LeftSliderComponent } from 'app/components/mtgMain/leftSlider/leftSlider.component';
import { RightSliderComponent } from 'app/components/mtgMain/rightSlider/rightSlider.component';
import { PlayerCardComponent } from 'app/components/playerCard/playerCard.component';
import { ModalComponent } from 'app/components/modal/modal.component';
import { VeilComponent } from 'app/components/veil/veil.component';
import { WelcomeComponent } from 'app/components/welcome/welcome.component';
import { TableComponent } from 'app/components/table/table.component';
import { HostGameComponent } from 'app/components/host-game/host-game.component';
import { JoinGameComponent } from 'app/components/join-game/join-game.component';
import { DeckManagerComponent } from 'app/components/deck-manager/deck-manager.component';
import { PointManagerComponent } from 'app/components/point-manager/point-manager.component';
import { SettingsComponent } from 'app/components/settings/settings.component';
import { StoryComponent } from 'app/components/story/story.component';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';

// services
import { RandomizerService } from 'app/services/randomizer.service';
import { DatabaseService } from 'app/services/database.service';
import { AuthService } from 'app/services/auth.service';
import { SlidersService } from 'app/services/sliders.service';
import { ModalService } from 'app/services/modal.service';
import { PlayerService } from 'app/services/player.service';
import { MtgApiService } from './services/mtgApi.service';

// directives
import { FocusHighlightDirective } from 'app/directives/focus-highlight.directive';
import { GiveFocusDirective } from 'app/directives/give-focus.directive';

// import environment
import { environment } from '../environments/environment';
import { IdToNamePipe } from 'app/pipes/id-to-name.pipe';

// modules
import { AppRoutingModule } from 'app/routing/appRouting.module';
import { DecksComponent } from './components/deck-manager/decks/decks.component';
import { DeckComponent } from './components/deck-manager/decks/deck/deck.component';
import { TextToSymbolPipe } from './pipes/text-to-symbol.pipe';
import { InputHasFocusDirective } from './directives/input-has-focus.directive';

@NgModule({
	declarations: [
		AppComponent,
		LifeButtonComponent,
		MtgHeaderComponent,
		MtgMainComponent,
		MtgFooterComponent,
		LeftSliderComponent,
		RightSliderComponent,
		PlayerCardComponent,
		ModalComponent,
		VeilComponent,
		WelcomeComponent,
		TableComponent,
		FocusHighlightDirective,
		GiveFocusDirective,
		IdToNamePipe,
		HostGameComponent,
		JoinGameComponent,
		DeckManagerComponent,
		PointManagerComponent,
		StoryComponent,
		SettingsComponent,
		NotFoundComponent,
		DecksComponent,
		DeckComponent,
		TextToSymbolPipe,
		InputHasFocusDirective,
	],
	imports: [
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		AppRoutingModule
	],
	providers: [
		DatabaseService,
		AuthService,
		ModalService,
		RandomizerService,
		SlidersService,
		PlayerService,
		MtgApiService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
