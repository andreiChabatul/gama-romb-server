import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDealComponent } from './offer-deal.component';

describe('OfferDealComponent', () => {
  let component: OfferDealComponent;
  let fixture: ComponentFixture<OfferDealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferDealComponent]
    });
    fixture = TestBed.createComponent(OfferDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
