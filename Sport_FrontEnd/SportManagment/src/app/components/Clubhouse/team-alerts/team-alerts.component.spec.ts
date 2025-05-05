import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAlertsComponent } from './team-alerts.component';

describe('TeamAlertsComponent', () => {
  let component: TeamAlertsComponent;
  let fixture: ComponentFixture<TeamAlertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamAlertsComponent]
    });
    fixture = TestBed.createComponent(TeamAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
