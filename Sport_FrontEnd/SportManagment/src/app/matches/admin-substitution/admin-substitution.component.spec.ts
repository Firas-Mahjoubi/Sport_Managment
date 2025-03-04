import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubstitutionComponent } from './admin-substitution.component';

describe('AdminSubstitutionComponent', () => {
  let component: AdminSubstitutionComponent;
  let fixture: ComponentFixture<AdminSubstitutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSubstitutionComponent]
    });
    fixture = TestBed.createComponent(AdminSubstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
