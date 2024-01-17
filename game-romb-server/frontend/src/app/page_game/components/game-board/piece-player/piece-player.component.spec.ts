import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecePlayerComponent } from './piece-player.component';

describe('PiecePlayerComponent', () => {
  let component: PiecePlayerComponent;
  let fixture: ComponentFixture<PiecePlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiecePlayerComponent]
    });
    fixture = TestBed.createComponent(PiecePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
