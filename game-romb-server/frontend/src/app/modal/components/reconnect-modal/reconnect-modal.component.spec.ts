import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconnectModalComponent } from './reconnect-modal.component';

describe('ReconnectModalComponent', () => {
  let component: ReconnectModalComponent;
  let fixture: ComponentFixture<ReconnectModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReconnectModalComponent]
    });
    fixture = TestBed.createComponent(ReconnectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
