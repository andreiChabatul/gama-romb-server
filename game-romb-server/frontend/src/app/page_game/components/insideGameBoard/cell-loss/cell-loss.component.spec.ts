import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellLossComponent } from './cell-loss.component';

describe('CellLossComponent', () => {
  let component: CellLossComponent;
  let fixture: ComponentFixture<CellLossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellLossComponent]
    });
    fixture = TestBed.createComponent(CellLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
