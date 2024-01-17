import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisonPlayerComponent } from './prison-player.component';

describe('PrisonPlayerComponent', () => {
  let component: PrisonPlayerComponent;
  let fixture: ComponentFixture<PrisonPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrisonPlayerComponent]
    });
    fixture = TestBed.createComponent(PrisonPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
