import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// third party
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';

// custom components
import { FirebaseComponent } from './firebase.component';
import { LifeButtonComponent } from './lifeButton.component';
import { MtgHeaderComponent } from './mtgHeader.component';
import { MtgMainComponent } from './mtgMain.component';
import { MtgFooterComponent } from './mtgFooter.component';
import { LeftSliderComponent } from './leftSlider.component';
import { RightSliderComponent } from './rightSlider.component';
import { MtgCardComponent } from './mtgCard.component';
import { CardResultsComponent } from './cardResults.component';
import { PlayerCardComponent } from './playerCard.component';
import { PopBarComponent } from './popBar.component';

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
		PopBarComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		//AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
		RouterModule.forRoot(routes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
