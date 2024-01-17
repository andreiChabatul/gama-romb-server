import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMaterialsComponent } from './button-materials.component';

describe('ButtonMaterialsComponent', () => {
  let component: ButtonMaterialsComponent;
  let fixture: ComponentFixture<ButtonMaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonMaterialsComponent]
    });
    fixture = TestBed.createComponent(ButtonMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
