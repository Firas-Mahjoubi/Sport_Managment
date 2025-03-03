import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCardComponent } from './admin-card.component';

describe('AdminCardComponent', () => {
  let component: AdminCardComponent;
  let fixture: ComponentFixture<AdminCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCardComponent]
    });
    fixture = TestBed.createComponent(AdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
