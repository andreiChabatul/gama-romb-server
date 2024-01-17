import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStandartComponent } from './button-standart.component';

describe('ButtonStandartComponent', () => {
  let component: ButtonStandartComponent;
  let fixture: ComponentFixture<ButtonStandartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonStandartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonStandartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
