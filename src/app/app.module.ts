import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
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
import { MtgCardComponent } from './components/mtgCard/mtgCard.component';
import { CardResultsComponent } from './components/cardResults/cardResults.component';
import { PlayerCardComponent } from './components/playerCard/playerCard.component';
import { PopBarComponent } from './components/popBar/popBar.component';
import { ModalComponent } from './components/modal/modal.component';

// services
import { RandomizerService } from './services/randomizer.service';
import { FirebaseService } from './services/firebase.service';
import { SlidersService } from './services/sliders.service';
import { ModalService } from './services/modal.service';

// import environment
import { environment } from '../environments/environment';
import { VeilComponent } from './components/veil/veil.component';

@NgModule({
	declarations: [
		AppComponent,
		LifeButtonComponent,
		MtgHeaderComponent,
		MtgMainComponent,
		MtgFooterComponent,
		LeftSliderComponent,
		RightSliderComponent,
		MtgCardComponent,
		CardResultsComponent,
		PlayerCardComponent,
		PopBarComponent,
		ModalComponent,
		VeilComponent
	],
	imports: [
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule
	],
	providers: [
		FirebaseService,
		ModalService,
		RandomizerService,
		SlidersService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
