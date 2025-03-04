import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFormComponent } from './session-form.component';

describe('SessionFormComponent', () => {
  let component: SessionFormComponent;
  let fixture: ComponentFixture<SessionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionFormComponent]
    });
    fixture = TestBed.createComponent(SessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
