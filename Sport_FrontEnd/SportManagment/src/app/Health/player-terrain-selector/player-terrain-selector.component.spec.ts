import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTerrainSelectorComponent } from './player-terrain-selector.component';

describe('PlayerTerrainSelectorComponent', () => {
  let component: PlayerTerrainSelectorComponent;
  let fixture: ComponentFixture<PlayerTerrainSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerTerrainSelectorComponent]
    });
    fixture = TestBed.createComponent(PlayerTerrainSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
