import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesStatsComponent } from './matches-stats.component';

describe('MatchesStatsComponent', () => {
  let component: MatchesStatsComponent;
  let fixture: ComponentFixture<MatchesStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchesStatsComponent]
    });
    fixture = TestBed.createComponent(MatchesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
