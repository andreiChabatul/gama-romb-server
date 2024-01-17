import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCompanyComponent } from './control-company.component';

describe('ControlCompanyComponent', () => {
  let component: ControlCompanyComponent;
  let fixture: ComponentFixture<ControlCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlCompanyComponent]
    });
    fixture = TestBed.createComponent(ControlCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
