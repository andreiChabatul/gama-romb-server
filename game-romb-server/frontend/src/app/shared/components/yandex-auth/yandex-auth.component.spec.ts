import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexAuthComponent } from './yandex-auth.component';

describe('YandexAuthComponent', () => {
  let component: YandexAuthComponent;
  let fixture: ComponentFixture<YandexAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YandexAuthComponent]
    });
    fixture = TestBed.createComponent(YandexAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
