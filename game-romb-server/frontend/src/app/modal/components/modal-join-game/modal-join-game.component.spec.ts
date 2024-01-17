import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJoinGameComponent } from './modal-join-game.component';

describe('ModalJoinGameComponent', () => {
  let component: ModalJoinGameComponent;
  let fixture: ComponentFixture<ModalJoinGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalJoinGameComponent]
    });
    fixture = TestBed.createComponent(ModalJoinGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
