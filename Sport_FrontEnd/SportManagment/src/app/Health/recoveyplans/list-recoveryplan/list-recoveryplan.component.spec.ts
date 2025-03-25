import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecoveryPlanComponent } from './list-recoveryplan.component';

describe('ListRecoveryPlanComponent', () => {
  let component: ListRecoveryPlanComponent;
  let fixture: ComponentFixture<ListRecoveryPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRecoveryPlanComponent]
    });
    fixture = TestBed.createComponent(ListRecoveryPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
