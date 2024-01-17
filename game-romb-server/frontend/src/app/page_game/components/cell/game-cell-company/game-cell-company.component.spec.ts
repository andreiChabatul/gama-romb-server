import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCellCompanyComponent } from './game-cell-company.component';

describe('GameCellCompanyComponent', () => {
  let component: GameCellCompanyComponent;
  let fixture: ComponentFixture<GameCellCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameCellCompanyComponent]
    });
    fixture = TestBed.createComponent(GameCellCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
