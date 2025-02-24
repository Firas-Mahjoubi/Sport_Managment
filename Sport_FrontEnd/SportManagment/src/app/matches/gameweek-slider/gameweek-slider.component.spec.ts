import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameweekSliderComponent } from './gameweek-slider.component';

describe('GameweekSliderComponent', () => {
  let component: GameweekSliderComponent;
  let fixture: ComponentFixture<GameweekSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameweekSliderComponent]
    });
    fixture = TestBed.createComponent(GameweekSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
