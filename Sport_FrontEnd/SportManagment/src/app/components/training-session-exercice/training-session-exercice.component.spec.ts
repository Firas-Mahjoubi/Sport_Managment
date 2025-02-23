import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSessionExerciceComponent } from './training-session-exercice.component';

describe('TrainingSessionExerciceComponent', () => {
  let component: TrainingSessionExerciceComponent;
  let fixture: ComponentFixture<TrainingSessionExerciceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingSessionExerciceComponent]
    });
    fixture = TestBed.createComponent(TrainingSessionExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
