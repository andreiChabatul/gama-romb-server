import { TestBed } from '@angular/core/testing';

import { ProcessingActionsService } from './controller-actions.service';

describe('ProcessingActionsService', () => {
  let service: ProcessingActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
