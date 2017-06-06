// import { FormsModule } from '@angular/forms';

// import { TestBed, async } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';

// import { AppComponent } from './app.component';
// import { MtgMainComponent } from './components/mtgMain/mtgMain.component';
// import { MtgFooterComponent } from './components/mtgFooter/mtgFooter.component';
// import { MtgHeaderComponent } from './components/mtgHeader/mtgHeader.component';
// import { ModalComponent } from './components/modal/modal.component';
// import { VeilComponent } from './components/veil/veil.component';
// import { RightSliderComponent } from './components/mtgMain/rightSlider/rightSlider.component';
// import { LeftSliderComponent } from './components/mtgMain/leftSlider/leftSlider.component';

// import { IdToNamePipe } from 'app/pipes/id-to-name.pipe';

// import { ModalService } from './services/modal.service';
// import { SlidersService } from './services/sliders.service';
// import { DatabaseService } from './services/database.service';
// import { PlayerService } from './services/player.service';

// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';


// describe('AppComponent', () => {
// 	beforeEach(async(() => {
// 		TestBed.configureTestingModule({
// 			declarations: [
// 				AppComponent,
// 				MtgHeaderComponent,
// 				MtgMainComponent,
// 				MtgFooterComponent,
// 				VeilComponent,
// 				ModalComponent,
// 				LeftSliderComponent,
// 				RightSliderComponent,
// 				IdToNamePipe
// 			],
// 			imports: [
// 				AngularFireModule,
// 				AngularFireDatabaseModule,
// 				AngularFireAuthModule,
// 				FormsModule,
// 				RouterTestingModule
// 			],
// 			providers: [
// 				ModalService,
// 				SlidersService,
// 				PlayerService,
// 				DatabaseService
// 			]
// 		}).compileComponents();
// 	}));

// 	it('should create the app', async(() => {
// 		const fixture = TestBed.createComponent(AppComponent);
// 		const app = fixture.debugElement.componentInstance;
// 		expect(app).toBeTruthy();
// 	}));

// 	it(`showMtgVeil should equal 'out'`, async(() => {
// 		const fixture = TestBed.createComponent(AppComponent);
// 		const app = fixture.debugElement.componentInstance;
// 		expect(app.showMtgVeil).toEqual('out');
// 	}));
// });
