import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDealItemComponent } from './offer-deal-item.component';

describe('OfferDealItemComponent', () => {
  let component: OfferDealItemComponent;
  let fixture: ComponentFixture<OfferDealItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferDealItemComponent]
    });
    fixture = TestBed.createComponent(OfferDealItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
