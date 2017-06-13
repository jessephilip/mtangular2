import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckUseComponent } from './deck-use.component';

describe('DeckUseComponent', () => {
  let component: DeckUseComponent;
  let fixture: ComponentFixture<DeckUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
