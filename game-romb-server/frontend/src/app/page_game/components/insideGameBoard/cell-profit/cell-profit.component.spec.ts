import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellProfitComponent } from './cell-profit.component';

describe('CellProfitComponent', () => {
  let component: CellProfitComponent;
  let fixture: ComponentFixture<CellProfitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellProfitComponent]
    });
    fixture = TestBed.createComponent(CellProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
