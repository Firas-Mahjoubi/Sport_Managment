import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchComponent } from './admin-match.component';

describe('AdminMatchComponent', () => {
  let component: AdminMatchComponent;
  let fixture: ComponentFixture<AdminMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMatchComponent]
    });
    fixture = TestBed.createComponent(AdminMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
