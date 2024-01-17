import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRoomSearchComponent } from './page-room-search.component';

describe('PageRoomSearchComponent', () => {
  let component: PageRoomSearchComponent;
  let fixture: ComponentFixture<PageRoomSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageRoomSearchComponent]
    });
    fixture = TestBed.createComponent(PageRoomSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
