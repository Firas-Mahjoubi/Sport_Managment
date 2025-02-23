import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFormComponent } from './exercise-form.component';

describe('ExerciseFormComponent', () => {
  let component: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseFormComponent]
    });
    fixture = TestBed.createComponent(ExerciseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
