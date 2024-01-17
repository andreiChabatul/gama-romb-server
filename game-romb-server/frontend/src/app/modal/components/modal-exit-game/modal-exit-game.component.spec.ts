import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExitGameComponent } from './modal-exit-game.component';

describe('ModalExitGameComponent', () => {
  let component: ModalExitGameComponent;
  let fixture: ComponentFixture<ModalExitGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExitGameComponent]
    });
    fixture = TestBed.createComponent(ModalExitGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
