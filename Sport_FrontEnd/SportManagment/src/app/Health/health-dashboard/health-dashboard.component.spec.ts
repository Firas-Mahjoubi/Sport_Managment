import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthDashboardComponent } from './health-dashboard.component';

describe('HealthDashboardComponent', () => {
  let component: HealthDashboardComponent;
  let fixture: ComponentFixture<HealthDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthDashboardComponent]
    });
    fixture = TestBed.createComponent(HealthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
