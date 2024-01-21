import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRulesComponent } from './page-rules.component';

describe('PageRulesComponent', () => {
  let component: PageRulesComponent;
  let fixture: ComponentFixture<PageRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
