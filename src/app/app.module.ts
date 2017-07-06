import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

// third party
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NouisliderModule } from 'ng2-nouislider';

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
import { DeckCreateComponent } from './components/deck-manager/deck-create/deck-create.component';
import { DeckMaintainComponent } from './components/deck-manager/deck-maintain/deck-maintain.component';
import { DeckUseComponent } from './components/deck-manager/deck-use/deck-use.component';
import { SearchComponent } from './components/deck-manager/deck-create/search/search.component';
import { ResultsComponent } from './components/deck-manager/deck-create/results/results.component';
import { SchemesComponent } from './components/schemes/schemes.component';
import { EditDeckComponent } from './components/deck-manager/deck-maintain/edit-deck/edit-deck.component';
import { CardComponent } from './components/card/card.component';
import { TestComponent } from './components/testing/test/test.component';
import { BuildListComponent } from './components/deck-manager/deck-create/build-list/build-list.component';

// services
import { RandomizerService } from 'app/services/randomizer.service';
import { DatabaseService } from 'app/services/database.service';
import { AuthService } from 'app/services/auth.service';
import { SlidersService } from 'app/services/sliders.service';
import { ModalService } from 'app/services/modal.service';
import { PlayerService } from 'app/services/player.service';
import { MtgApiService } from './services/mtgApi.service';
import { SchemesService } from './services/schemes.service';
import { HelperService } from './services/helper.service';
import { SearchService } from 'app/services/search.service';

// directives
import { FocusHighlightDirective } from 'app/directives/focus-highlight.directive';
import { GiveFocusDirective } from 'app/directives/give-focus.directive';
import { InputHasFocusDirective } from './directives/input-has-focus.directive';

// import pipes
import { IdToNamePipe } from 'app/pipes/id-to-name.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TextToSymbolPipe } from './pipes/text-to-symbol.pipe';
import { PluralizePipe } from 'app/pipes/pluralize.pipe';
import { GetObjectKeyPipe } from 'app/pipes/get-object-key.pipe';

// import environment
import { environment } from '../environments/environment';

// modules
import { AppRoutingModule } from 'app/routing/appRouting.module';

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
    TextToSymbolPipe,
    InputHasFocusDirective,
    CapitalizePipe,
    GetObjectKeyPipe,
    PluralizePipe,
    DeckCreateComponent,
    DeckMaintainComponent,
    DeckUseComponent,
    SearchComponent,
    ResultsComponent,
    SchemesComponent,
    EditDeckComponent,
    CardComponent,
    TestComponent,
    BuildListComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NouisliderModule
  ],
  providers: [
    DatabaseService,
    AuthService,
    ModalService,
    RandomizerService,
    SlidersService,
    PlayerService,
    MtgApiService,
    SchemesService,
    HelperService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
