import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

// custom components
import { AppComponent } from './app.component';

export const firebaseConfig = {
	apiKey: "AIzaSyBFJvuE_iTUVOsOnNeD12wEcTS7yphWlag",
	authDomain: "mtghelper-81c74.firebaseapp.com",
	databaseURL: "https://mtghelper-81c74.firebaseio.com",
	projectId: "mtghelper-81c74",
	storageBucket: "mtghelper-81c74.appspot.com",
	messagingSenderId: "1035011540407"
};

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AngularFireModule.initializeApp(firebaseConfig)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
