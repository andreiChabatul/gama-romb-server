import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCellSquareComponent } from './game-cell-square.component';

describe('GameCellSquareComponent', () => {
  let component: GameCellSquareComponent;
  let fixture: ComponentFixture<GameCellSquareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameCellSquareComponent]
    });
    fixture = TestBed.createComponent(GameCellSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
