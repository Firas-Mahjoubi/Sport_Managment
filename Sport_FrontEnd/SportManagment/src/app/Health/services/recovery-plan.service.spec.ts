import { TestBed } from '@angular/core/testing';

import { RecoveryPlanService } from './recovery-plan.service';

describe('RecoveryPlanService', () => {
  let service: RecoveryPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveryPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
