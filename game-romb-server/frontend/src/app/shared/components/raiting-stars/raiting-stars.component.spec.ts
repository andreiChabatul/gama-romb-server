import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaitingStarsComponent } from './raiting-stars.component';

describe('RaitingStarsComponent', () => {
  let component: RaitingStarsComponent;
  let fixture: ComponentFixture<RaitingStarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaitingStarsComponent]
    });
    fixture = TestBed.createComponent(RaitingStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
