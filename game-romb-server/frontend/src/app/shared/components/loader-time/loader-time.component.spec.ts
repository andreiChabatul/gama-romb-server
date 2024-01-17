import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderTimeComponent } from './loader-time.component';

describe('LoaderTimeComponent', () => {
  let component: LoaderTimeComponent;
  let fixture: ComponentFixture<LoaderTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderTimeComponent]
    });
    fixture = TestBed.createComponent(LoaderTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
