import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCompanyComponent } from './cell-company.component';

describe('CellCompanyComponent', () => {
  let component: CellCompanyComponent;
  let fixture: ComponentFixture<CellCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellCompanyComponent]
    });
    fixture = TestBed.createComponent(CellCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
