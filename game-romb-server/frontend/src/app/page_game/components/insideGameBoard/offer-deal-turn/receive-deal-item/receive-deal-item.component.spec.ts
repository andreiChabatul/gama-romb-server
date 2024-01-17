import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveDealItemComponent } from './receive-deal-item.component';

describe('ReceiveDealItemComponent', () => {
  let component: ReceiveDealItemComponent;
  let fixture: ComponentFixture<ReceiveDealItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiveDealItemComponent]
    });
    fixture = TestBed.createComponent(ReceiveDealItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
