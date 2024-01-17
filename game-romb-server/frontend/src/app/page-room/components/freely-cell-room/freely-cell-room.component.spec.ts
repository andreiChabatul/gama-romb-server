import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelyCellRoomComponent } from './freely-cell-room.component';

describe('FreelyCellRoomComponent', () => {
  let component: FreelyCellRoomComponent;
  let fixture: ComponentFixture<FreelyCellRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreelyCellRoomComponent]
    });
    fixture = TestBed.createComponent(FreelyCellRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
