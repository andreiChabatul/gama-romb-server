import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoPlayerComponent } from './foto-player.component';

describe('FotoPlayerComponent', () => {
  let component: FotoPlayerComponent;
  let fixture: ComponentFixture<FotoPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FotoPlayerComponent]
    });
    fixture = TestBed.createComponent(FotoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
