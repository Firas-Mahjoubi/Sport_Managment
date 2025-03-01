import { TestBed } from '@angular/core/testing';

import { InjuryService } from './injury.service';

describe('InjuryService', () => {
  let service: InjuryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjuryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
