import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerGameComponent } from './winner-game.component';

describe('WinnerGameComponent', () => {
  let component: WinnerGameComponent;
  let fixture: ComponentFixture<WinnerGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinnerGameComponent]
    });
    fixture = TestBed.createComponent(WinnerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
