import { TestBed } from '@angular/core/testing';

import { TacticService } from './tactic.service';

describe('TacticService', () => {
  let service: TacticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TacticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
