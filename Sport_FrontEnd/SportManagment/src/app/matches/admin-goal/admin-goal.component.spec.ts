import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoalComponent } from './admin-goal.component';

describe('AdminGoalComponent', () => {
  let component: AdminGoalComponent;
  let fixture: ComponentFixture<AdminGoalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGoalComponent]
    });
    fixture = TestBed.createComponent(AdminGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
