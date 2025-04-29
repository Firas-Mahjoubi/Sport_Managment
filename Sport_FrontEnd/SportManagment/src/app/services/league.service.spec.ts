import { TestBed } from '@angular/core/testing';

import { LeagueService } from './league.service';

describe('LeagueService', () => {
  let service: LeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
