import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoCellComponent } from './modal-info-cell.component';

describe('ModalInfoCellComponent', () => {
  let component: ModalInfoCellComponent;
  let fixture: ComponentFixture<ModalInfoCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInfoCellComponent]
    });
    fixture = TestBed.createComponent(ModalInfoCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
