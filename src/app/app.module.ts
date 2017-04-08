import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// custom components
import { AppComponent } from './app.component';
import { FirebaseComponent } from './firebase.component';
import { LifeButtonComponent } from './lifeButton.component';

// const for permanent config to firebase
export const firebaseConfig = {
	apiKey: "AIzaSyBFJvuE_iTUVOsOnNeD12wEcTS7yphWlag",
	authDomain: "mtghelper-81c74.firebaseapp.com",
	databaseURL: "https://mtghelper-81c74.firebaseio.com",
	projectId: "mtghelper-81c74",
	storageBucket: "mtghelper-81c74.appspot.com",
	messagingSenderId: "1035011540407"
};

// const for using firebase's Authorization
const firebaseAuthConfig = {
	provider: AuthProviders.Google,
	method: AuthMethods.Redirect
};

@NgModule({
	declarations: [
		AppComponent,
		FirebaseComponent,
		LifeButtonComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }
