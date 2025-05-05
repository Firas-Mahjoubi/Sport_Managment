import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDetailComponent } from './exercise-detail.component';

describe('ExerciseDetailComponent', () => {
  let component: ExerciseDetailComponent;
  let fixture: ComponentFixture<ExerciseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseDetailComponent]
    });
    fixture = TestBed.createComponent(ExerciseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
