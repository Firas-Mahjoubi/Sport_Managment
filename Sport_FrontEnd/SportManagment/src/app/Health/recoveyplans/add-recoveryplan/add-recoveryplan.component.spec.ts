import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecoveryplanComponent } from './add-recoveryplan.component';

describe('AddRecoveryplanComponent', () => {
  let component: AddRecoveryplanComponent;
  let fixture: ComponentFixture<AddRecoveryplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecoveryplanComponent]
    });
    fixture = TestBed.createComponent(AddRecoveryplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
