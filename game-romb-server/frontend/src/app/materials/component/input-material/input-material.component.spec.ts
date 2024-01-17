import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMaterialComponent } from './input-material.component';

describe('InputMaterialComponent', () => {
  let component: InputMaterialComponent;
  let fixture: ComponentFixture<InputMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputMaterialComponent]
    });
    fixture = TestBed.createComponent(InputMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
