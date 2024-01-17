import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPlayerBalanseComponent } from './info-player-balanse.component';

describe('InfoPlayerBalanseComponent', () => {
  let component: InfoPlayerBalanseComponent;
  let fixture: ComponentFixture<InfoPlayerBalanseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPlayerBalanseComponent]
    });
    fixture = TestBed.createComponent(InfoPlayerBalanseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
