import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectMaterialComponent } from './select-material.component';


describe('SelectCreateGameComponent', () => {
  let component: SelectMaterialComponent;
  let fixture: ComponentFixture<SelectMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectMaterialComponent]
    });
    fixture = TestBed.createComponent(SelectMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
