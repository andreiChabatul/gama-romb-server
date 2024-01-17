import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCompanyComponent } from './auction-company.component';

describe('AuctionCompanyComponent', () => {
  let component: AuctionCompanyComponent;
  let fixture: ComponentFixture<AuctionCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuctionCompanyComponent]
    });
    fixture = TestBed.createComponent(AuctionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
