import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersByClubComponent } from './players-by-club.component';

describe('PlayersByClubComponent', () => {
  let component: PlayersByClubComponent;
  let fixture: ComponentFixture<PlayersByClubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersByClubComponent]
    });
    fixture = TestBed.createComponent(PlayersByClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
