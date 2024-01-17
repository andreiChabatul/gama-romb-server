import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonimAuthComponent } from './anonim-auth.component';

describe('AnonimAuthComponent', () => {
  let component: AnonimAuthComponent;
  let fixture: ComponentFixture<AnonimAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnonimAuthComponent]
    });
    fixture = TestBed.createComponent(AnonimAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
