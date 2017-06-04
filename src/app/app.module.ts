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
import { AppComponent } from './app.component';
import { LifeButtonComponent } from './components/lifeButton/lifeButton.component';
import { MtgHeaderComponent } from './components/mtgHeader/mtgHeader.component';
import { MtgMainComponent } from './components/mtgMain/mtgMain.component';
import { MtgFooterComponent } from './components/mtgFooter/mtgFooter.component';
import { LeftSliderComponent } from './components/mtgMain/leftSlider/leftSlider.component';
import { RightSliderComponent } from './components/mtgMain/rightSlider/rightSlider.component';
import { PlayerCardComponent } from './components/playerCard/playerCard.component';
import { ModalComponent } from './components/modal/modal.component';
import { VeilComponent } from './components/veil/veil.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TableComponent } from './components/table/table.component';
import { HostGameComponent } from 'app/components/host-game/host-game.component';
import { JoinGameComponent } from 'app/components/join-game/join-game.component';
import { DeckManagerComponent } from 'app/components/deck-manager/deck-manager.component';
import { PointManagerComponent } from 'app/components/point-manager/point-manager.component';
import { SettingsComponent } from 'app/components/settings/settings.component';
import { StoryComponent } from 'app/components/story/story.component';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';

// services
import { RandomizerService } from './services/randomizer.service';
import { DatabaseService } from './services/database.service';
import { AuthService } from './services/auth.service';
import { SlidersService } from './services/sliders.service';
import { ModalService } from './services/modal.service';
import { PlayerService } from './services/player.service';

// directives
import { FocusHighlightDirective } from './directives/focus-highlight.directive';
import { GiveFocusDirective } from 'app/directives/give-focus.directive';

// import environment
import { environment } from '../environments/environment';
import { IdToNamePipe } from './pipes/id-to-name.pipe';

// modules
import { AppRoutingModule } from 'app/appRouting.module';

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
		NotFoundComponent
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
		PlayerService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
