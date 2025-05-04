import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailComponent } from './player-detail.component';

describe('PlayerDetailComponent', () => {
  let component: PlayerDetailComponent;
  let fixture: ComponentFixture<PlayerDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerDetailComponent]
    });
    fixture = TestBed.createComponent(PlayerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
