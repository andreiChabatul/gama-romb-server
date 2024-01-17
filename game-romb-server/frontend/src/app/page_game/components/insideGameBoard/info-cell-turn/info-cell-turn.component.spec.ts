import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCellTurnComponent } from './info-cell-turn.component';

describe('InfoCellTurnComponent', () => {
  let component: InfoCellTurnComponent;
  let fixture: ComponentFixture<InfoCellTurnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoCellTurnComponent]
    });
    fixture = TestBed.createComponent(InfoCellTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
