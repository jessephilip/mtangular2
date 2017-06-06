import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeilComponent } from './veil.component';

describe('VeilComponent', () => {
	let component: VeilComponent;
	let fixture: ComponentFixture<VeilComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ VeilComponent ]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VeilComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create VeilComponent', () => {
		expect(component).toBeTruthy();
	});
});
