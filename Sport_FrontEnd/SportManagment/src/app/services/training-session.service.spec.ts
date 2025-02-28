import { TestBed } from '@angular/core/testing';

import { TrainingSessionService } from './training-session.service';

describe('TrainingSessionService', () => {
  let service: TrainingSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
