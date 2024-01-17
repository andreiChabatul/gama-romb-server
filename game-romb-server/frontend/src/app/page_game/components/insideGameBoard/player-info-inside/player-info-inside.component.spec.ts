import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInfoInsideComponent } from './player-info-inside.component';

describe('PlayerInfoInsideComponent', () => {
  let component: PlayerInfoInsideComponent;
  let fixture: ComponentFixture<PlayerInfoInsideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerInfoInsideComponent]
    });
    fixture = TestBed.createComponent(PlayerInfoInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
