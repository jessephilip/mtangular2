import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullModalComponent } from './full-modal.component';

describe('FullModalComponent', () => {
	let component: FullModalComponent;
	let fixture: ComponentFixture<FullModalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FullModalComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FullModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
