import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseLibraryComponent } from './exercise-library.component';

describe('ExerciseLibraryComponent', () => {
  let component: ExerciseLibraryComponent;
  let fixture: ComponentFixture<ExerciseLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseLibraryComponent]
    });
    fixture = TestBed.createComponent(ExerciseLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
