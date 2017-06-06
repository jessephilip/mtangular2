import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointManagerComponent } from './point-manager.component';

describe('PointManagerComponent', () => {
	let component: PointManagerComponent;
	let fixture: ComponentFixture<PointManagerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PointManagerComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PointManagerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create PointManagerComponent', () => {
		expect(component).toBeTruthy();
	});
});
