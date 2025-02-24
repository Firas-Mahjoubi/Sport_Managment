import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingGroundNavbarComponent } from './training-ground-navbar.component';

describe('TrainingGroundNavbarComponent', () => {
  let component: TrainingGroundNavbarComponent;
  let fixture: ComponentFixture<TrainingGroundNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingGroundNavbarComponent]
    });
    fixture = TestBed.createComponent(TrainingGroundNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
