import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciceDashboardComponent } from './exercice-dashboard.component';

describe('ExerciceDashboardComponent', () => {
  let component: ExerciceDashboardComponent;
  let fixture: ComponentFixture<ExerciceDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciceDashboardComponent]
    });
    fixture = TestBed.createComponent(ExerciceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
