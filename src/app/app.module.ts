import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

// third party
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// custom components
import { AppComponent } from './app.component';
import { LifeButtonComponent } from './components/lifeButton/lifeButton.component';
import { MtgHeaderComponent } from './components/mtgHeader/mtgHeader.component';
import { MtgMainComponent } from './components/mtgMain/mtgMain.component';
import { MtgFooterComponent } from './components/mtgFooter/mtgFooter.component';
import { LeftSliderComponent } from './components/leftSlider/leftSlider.component';
import { RightSliderComponent } from './components/rightSlider/rightSlider.component';
import { MtgCardComponent } from './components/mtgCard/mtgCard.component';
import { CardResultsComponent } from './components/cardResults/cardResults.component';
import { PlayerCardComponent } from './components/playerCard/playerCard.component';
import { PopBarComponent } from './components/popBar/popBar.component';
import { AnimateComponent } from './components/animate/animate.component';

// const for permanent config to firebase
export const firebaseConfig = {
	apiKey: "AIzaSyBFJvuE_iTUVOsOnNeD12wEcTS7yphWlag",
	authDomain: "mtghelper-81c74.firebaseapp.com",
	databaseURL: "https://mtghelper-81c74.firebaseio.com",
	projectId: "mtghelper-81c74",
	storageBucket: "mtghelper-81c74.appspot.com",
	messagingSenderId: "1035011540407"
};

// TODO: Fix this. It's erroring with update to Angular 4.0
// const for using firebase's Authorization
// const firebaseAuthConfig = {
// 	provider: AuthProviders.Google,
// 	method: AuthMethods.Redirect
// };

// for Routes
const routes: Routes = [
	{ path: 'cardResults', component: CardResultsComponent },
	{ path: '', redirectTo: '', pathMatch: 'full'},
	{ path: '', component: AppComponent }
	// { path: '**', component: FourOFourComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		// FirebaseComponent,
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
		AnimateComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		//AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
		RouterModule.forRoot(routes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
