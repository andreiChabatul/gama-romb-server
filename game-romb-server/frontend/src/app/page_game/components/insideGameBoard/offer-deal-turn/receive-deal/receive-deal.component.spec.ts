import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveDealComponent } from './receive-deal.component';

describe('ReceiveDealComponent', () => {
  let component: ReceiveDealComponent;
  let fixture: ComponentFixture<ReceiveDealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiveDealComponent]
    });
    fixture = TestBed.createComponent(ReceiveDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
