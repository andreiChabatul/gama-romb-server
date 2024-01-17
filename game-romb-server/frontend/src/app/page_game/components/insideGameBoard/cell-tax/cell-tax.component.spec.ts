import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellTaxComponent } from './cell-tax.component';

describe('CellTaxComponent', () => {
  let component: CellTaxComponent;
  let fixture: ComponentFixture<CellTaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellTaxComponent]
    });
    fixture = TestBed.createComponent(CellTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
