import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecoveryplanComponent } from './edit-recoveryplan.component';

describe('EditRecoveryplanComponent', () => {
  let component: EditRecoveryplanComponent;
  let fixture: ComponentFixture<EditRecoveryplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRecoveryplanComponent]
    });
    fixture = TestBed.createComponent(EditRecoveryplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
