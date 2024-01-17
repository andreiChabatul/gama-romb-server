import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardTurnComponent } from './game-board-turn.component';

describe('GameBoardTurnComponent', () => {
  let component: GameBoardTurnComponent;
  let fixture: ComponentFixture<GameBoardTurnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameBoardTurnComponent]
    });
    fixture = TestBed.createComponent(GameBoardTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
