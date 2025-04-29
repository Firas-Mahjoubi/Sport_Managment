import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicClubPlayersComponent } from './public-club-players.component';

describe('PublicClubPlayersComponent', () => {
  let component: PublicClubPlayersComponent;
  let fixture: ComponentFixture<PublicClubPlayersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicClubPlayersComponent]
    });
    fixture = TestBed.createComponent(PublicClubPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
