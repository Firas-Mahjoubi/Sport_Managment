import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeAddExerciceComponent } from './backoffice-add-exercice.component';

describe('BackofficeAddExerciceComponent', () => {
  let component: BackofficeAddExerciceComponent;
  let fixture: ComponentFixture<BackofficeAddExerciceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackofficeAddExerciceComponent]
    });
    fixture = TestBed.createComponent(BackofficeAddExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
