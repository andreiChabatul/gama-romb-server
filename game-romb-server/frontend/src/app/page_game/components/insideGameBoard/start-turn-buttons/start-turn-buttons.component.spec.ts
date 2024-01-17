import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTurnButtonsComponent } from './start-turn-buttons.component';

describe('StartTurnButtonsComponent', () => {
  let component: StartTurnButtonsComponent;
  let fixture: ComponentFixture<StartTurnButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartTurnButtonsComponent]
    });
    fixture = TestBed.createComponent(StartTurnButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
