import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckMaintainComponent } from './deck-maintain.component';

describe('DeckMaintainComponent', () => {
  let component: DeckMaintainComponent;
  let fixture: ComponentFixture<DeckMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
