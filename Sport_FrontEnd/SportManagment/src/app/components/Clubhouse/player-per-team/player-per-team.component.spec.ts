import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersPerTeamComponent } from './player-per-team.component';

describe('PlayersPerTeamComponent', () => {
  let component: PlayersPerTeamComponent;
  let fixture: ComponentFixture<PlayersPerTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersPerTeamComponent]
    });
    fixture = TestBed.createComponent(PlayersPerTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
