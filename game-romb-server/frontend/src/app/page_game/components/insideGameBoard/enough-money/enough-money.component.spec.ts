import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnoughMoneyComponent } from './enough-money.component';

describe('EnoughMoneyComponent', () => {
  let component: EnoughMoneyComponent;
  let fixture: ComponentFixture<EnoughMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnoughMoneyComponent]
    });
    fixture = TestBed.createComponent(EnoughMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
